tem<template>

    <div class="app-container">
  
      <h2 style="text-align: center;">课程列表信息</h2>
  
      <el-form label-width="120px">
  
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

<script>
export default {
    data() {
      return {
        saveBtnDisabled: false // 保存按钮是否禁用
      }
    },
  
    created() {
      console.log('info created')
    },
  
    methods: {
  
      next() {
        console.log('next')
        this.$router.push({ path: '/edu/course/chapter/1' })
      }
    }
  }
  </script>