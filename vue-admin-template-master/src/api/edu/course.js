import request from '@/utils/request'

const api_name = '/service_edu/course'

export default {

  // 1. 添加课程基本信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: courseInfo
    })
  },

  // 2. 根据id查询课程信息
  getCourseInfoById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get',
    })
  },

  // 3. 修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: courseInfo
    })
  },

  // 4. 查询课程预览信息
  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/preview/${id}`,
      method: 'get'
    })
  },
  
  // 5. 调用课程发布接口
  publishCourse(id) {
    return request({
      url: `${api_name}/publish/${id}`,
      method: 'put'
    })
  },

  // 6. 根据条件查询课程列表
  conditionList(current,total,query) {
    return  request({
      url: `${api_name}/page/${current}/${total}`,
      method: 'post',
      data: query
    })
  },

  //7. 删除课程信息
  removeCourse(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete',
    })
  }

}