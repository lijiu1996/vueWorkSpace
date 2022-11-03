import request from '@/utils/request'

const api_name = '/service_edu/chapter'

export default {
    
    // 1.获取嵌套的章节信息
    getNestedTreeList(courseId) {
        return request({
            url:  `${api_name}/${courseId}`,
            method: 'get'
        })
    },

    // 2.添加课程章节信息
}   