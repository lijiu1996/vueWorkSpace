import request from '@/utils/request'

const api_name = '/service_edu/courses'

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
  }
}