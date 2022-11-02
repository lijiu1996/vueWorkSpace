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
  }
}