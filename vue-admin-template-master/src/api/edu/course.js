import request from '@/utils/request'

const api_name = '/service_edu/courses'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: courseInfo
    })
  }
}