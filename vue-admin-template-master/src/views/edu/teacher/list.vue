<template>
    <div>
        <template>
            <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
                <el-form-item label="讲师名称">
                    <el-input v-model="teacherQuery.name" placeholder="teacher name" />
                </el-form-item>
                <el-form-item label="讲师头像">
                    <el-select v-model="teacherQuery.level" placeholder="Activity zone">
                        <el-option label="高级讲师" value="1" />
                        <el-option label="特技讲师" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-input v-model="teacherQuery.begin" placeholder="teacher name" />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-model="teacherQuery.end" placeholder="teacher name" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="onSubmit">Query</el-button>
                    <el-button type="primary" @click.prevent="resetQuery">清空</el-button>
                </el-form-item>
            </el-form>
        </template>
        {{"讲师列表"}}
        <template>
            <el-table :data="this.items" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="intro" label="简介" width="180" />
            <el-table-column prop="career" label="资历" width="120" />
            <el-table-column prop="level" label="头衔" width="120">
                <template slot-scope="scope">
                    {{scope.row.level == 1? "高级讲师" : "首席讲师"}}
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">      
                    <router-link :to="'/teacher/update/' + scope.row.id">
                        <el-button type="primary" icon="el-icon-edit">修改</el-button>
                    </router-link>
                        <el-button type="success" icon="el-icon-delete"
                        @click="deleteById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </template>
        <template>
            <div class="example-pagination-block">
                <el-pagination layout="total,prev, pager, next, jumper" :total="this.total" 
                    :page-size="this.limit" 
                    @current-change="getList"/>
            </div> 
        </template>
    </div>
</template>

<script>

import teacher from '@/api/edu/teacher'
import {ref,reactive} from 'vue'

export default {
    data() {
        return {
            current : 1,    //当前页码
            limit : 4,
            total : 20,     //总共的列表中教师个数
            items : null,   //渲染的集合
            teacherQuery : {},
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList(page = 1) {
            this.page = page
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
            .then(response => {
                console.log(response)
                this.items = response.data.teacherList
                this.total = response.data.totalCount
            })
            .catch(error => console.log(error))
        },
        onSubmit() {
            this.getList()
        },
        resetQuery() {
            this.teacherQuery = {}
            this.getList()
        },
        deleteById(id) {
            this.$confirm('此操作将删除讲师, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            teacher.deleteTeacherById(id)
            .then(response => {
                this.getList()
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
        updateById(id) {
        }
    },
}
</script>
  