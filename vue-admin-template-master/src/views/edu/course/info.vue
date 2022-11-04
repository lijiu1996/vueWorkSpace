<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select v-model="courseInfo.subjectParentId" placeholder="请选择" @change="fillSubjectList">
          <el-option v-for="subject in subjectNestedList" :key="subject.id" :label="subject.title"
            :value="subject.id" />
        </el-select>
        <!-- 级联显示二级分类列表 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option v-for="subject in subSubjectList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
      </el-form-item>

      <!-- 课程讲师列表 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->

      <!-- 课程封面 TODO -->
      <!-- <el-form-item label="课程封面">

        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/service_oss/upload?host=cover'" class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item> -->

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" />
        元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import teacher from "@/api/edu/teacher";

const defaultForm = {
  title: '',
  subjectId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: '',
  price: 0
}

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: defaultForm,
      subjectNestedList: [],  // 一级分类列表
      subSubjectList: [],   // 二级分类列表
      teacherList: [],
      courseId : '',

    };
  },

  watch: {
    $route(to,from) {
      console.log('watch $route')
      this.init()
    }
  },

  created() {
    console.log("info created")
    this.init()
  },

  methods: {
    init() {
      // 初始化课程分类信息
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        // 根据id获取课程基本信息
        this.getCourseInfoById()
      } else {
        this.courseInfo = { ...defaultForm }
      }
      this.initSubjectList();
      this.initTeacherList();
    },

    initSubjectList() {
      subject
        .getSubjectsList()
        .then((response) => {
          this.subjectNestedList = response.data;
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },

    initTeacherList() {
      teacher
        .getAllTeachers()
        .then((response) => {
          this.teacherList = response.data.teacherList;
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },

    // 根据一级分类选择结果,填充二级分类列表
    fillSubjectList(value) {
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.courseInfo.subjectId = ''
        }
      }

    },

    saveData() {
      course
        .saveCourseInfo(this.courseInfo)
        .then((response) => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .then((response) => {
          this.$router.push({ path: "/course/chapter/" + response.data });
        });
    },

    updateData() {
      this.saveBtnDisabled = true
      course.updateCourseInfo(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/course/chapter/' + this.courseInfo.id })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },

    saveOrUpdate() {
      if(this.courseInfo.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },

    // 根据id查询到课程信息
    getCourseInfoById() {
      course.getCourseInfoById(this.courseId).then(response => {
        this.courseInfo = response.data
        // 初始化二级列表的集合
        subject.getSubjects(this.courseInfo.subjectParentId).then(response => {
          this.subSubjectList = response.data
        })

      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
  },
};
</script>
