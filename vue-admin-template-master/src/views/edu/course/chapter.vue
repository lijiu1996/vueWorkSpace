<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="text" @click="tankuang = true">添加章节</el-button>

    <!-- 添加和修改章节弹框式表单 -->
    <el-dialog :visible.sync="tankuang" title="添加章节">
      <el-form :model="chapterInfo" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapterInfo.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapterInfo.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tankuang = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节的弹框式表单 -->
    <el-dialog :visible.sync="videotanchuang" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text" @click="videotanchuang = true;chapterId = chapter.id">添加课时</el-button>
            <el-button type="primary" @click="openEdit(chapter.id)">编辑</el-button>
            <el-button type="text" @click="deleteBy(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter';
import { thisExpression } from '@babel/types';
import video from '@/api/edu/video';

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '',
      chapterNestedList: [],
      tankuang : false, // 是否显示章节表单
      chapterInfo : {
        title: '',
        sort : 0
      },
      // 小节管理
      chapterId : '',
      video :{
          title: '',
          sort: 0,
          free: 0,
          videoSourceId : ''
      },
      videotanchuang : false, //是否显示小节表单
      saveVideoBtnDisabled: false //小节保存是否禁用
    };
  },

  created() {
    // console.log("chapter created");
    this.init()
  },

  methods: {

    // 点击修改进行章节信息弹框与回显
    openEdit(chapterId) {
        this.tankuang = true
        chapter.getById(chapterId).then(response =>{
          this.chapterInfo = response.data
        })
    },
    
    init() {
      if (this.$route.params && this.$route.params.id) {
          console.log("111")
          this.courseId = this.$route.params.id
          // 根据id获取课程基本信息
          this.fetchChapterNestedListByCourseId()
  }
    },

    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },

    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },

    fetchChapterNestedListByCourseId() {
      chapter.getNestedTreeList(this.courseId).then(response => {
        this.chapterNestedList = response.data
      })
    },

    addChapter() {
      this.chapterInfo.courseId = this.courseId
      chapter.saveChapterInfo(this.chapterInfo).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.helpSave()
      })
    },

    updateChapter() {
      chapter.updateById(this.chapterInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.helpSave()
      })
    },

    saveOrUpdate() {
      if(!this.chapterInfo.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },

    helpSave() {
      this.dialogChapterFormVisible = false// 如果保存成功则关闭对话框
      this.fetchChapterNestedListByCourseId()// 刷新列表
      this.chapterInfo.title = ''// 重置章节标题
      this.chapterInfo.sort = 0// 重置章节标题
      this.saveBtnDisabled = false
    },

    deleteBy(chapterId) {
      this.$confirm('此操作将删除指定章节, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            chapter.deleteById(chapterId)
            .then(response => {
                this.fetchChapterNestedListByCourseId()
                this.$message({
                    type: 'success',
                    message: '成功删除'
                })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },

    // 小节相关操作
    saveOrUpdateVideo() {
        if(!this.video.id) {
          this.saveVideo()
        } else {
          this.updateVideo()
        }
    },

    saveVideo() {
      this.video.courseId = this.courseId
      this.video.chapterId = this.chapterId
      video.addVideo(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.helpSaveVideo()
      })
    },

    updateVideo() {

    },

    helpSaveVideo() {
      this.videotanchuang = false 
      this.fetchChapterNestedListByCourseId()
      this.video.title = ''
      this.video.sort = 0
      this.video.videoSourceId = ''
    },

    // 删除小节
    deleteVideo(id) {
      this.$confirm('此操作将删除指定小节, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            video.deleteVideo(id)
            .then(response => {
                this.fetchChapterNestedListByCourseId()
                this.$message({
                    type: 'success',
                    message: '成功删除'
                })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },

  },
};
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  /* float: left; */
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  /* float: left; */
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>