<template>
  <div class="app-container">
    <h2 style="text-align: center">课程列表信息</h2>

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 标题 -->
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="课程标题" />
      </el-form-item>
      <!-- 状态 -->
      <el-form-item>
        <el-select v-model="searchObj.state" placeholder="状态">
          <el-option label="已发布" value="Normal" />
          <el-option label="未发布" value="Draft" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- courseList -->
    <el-table
      v-loading="listLoading"
      :data="courseList"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.cover" alt="scope.row.title" width="150px" />
            </div>
            <div class="title">
              <a href="">{{ scope.row.title }}</a>
              <p>{{ scope.row.lessonNum }}课时</p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtModified.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100" align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.price) === 0 ? "免费" : "¥" + scope.row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="buyCount" label="付费学员" width="100" align="center">
        <template slot-scope="scope"> {{ scope.row.buyCount }}人 </template>
      </el-table-column> -->

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit"
              >编辑课程章节信息</el-button
            >
          </router-link>
          <el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-form label-width="120px">
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      searchObj: {},
      courseList: [],
      total: 0, //页面总数
      page: 1, //当前页数
      limit: 10, //每页显示个数最大值
    };
  },

  created() {
    this.fetchData();
    console.log("info created");
  },

  methods: {
    next() {
      console.log("next");
      this.$router.push({ path: "/edu/course/chapter/1" });
    },

    fetchData(page = 1) {
      this.page = page;
      console.log(page)
      course
        .conditionList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.courseList = response.data.courseList;
          this.total = response.data.totalCount;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 前往课程简介页面进行编辑
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },


    //
  },
};
</script>

<style scoped>
.myClassList .info {
  width: 450px;
  overflow: hidden;
}
.myClassList .info .pic {
  width: 150px;
  height: 90px;
  overflow: hidden;
  float: left;
}
.myClassList .info .pic a {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.myClassList .info .pic img {
  display: block;
  width: 100%;
}
.myClassList td .info .title {
  width: 280px;
  float: right;
  height: 90px;
}
.myClassList td .info .title a {
  display: block;
  height: 48px;
  line-height: 24px;
  overflow: hidden;
  color: #00baf2;
  margin-bottom: 12px;
}
.myClassList td .info .title p {
  line-height: 20px;
  margin-top: 5px;
  color: #818181;
}
</style>
