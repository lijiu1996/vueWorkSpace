import request from '@/utils/request'

const api_name = '/service_edu/chapter'

export default {
    
    // 1.获取嵌套的章节信息
    getNestedTreeList(courseId) {
        return request({
            url:  `${api_name}/list/${courseId}`,
            method: 'get'
        })
    },

    // 2.添加课程章节信息
    saveChapterInfo(chapter) {
        return request({
            url: api_name,
            method: 'post',
            data: chapter
        })
    },

    // 3.查询课程章节信息
    getById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get',
        })
    },

    // 4.修改课程章节信息
    updateById(chapter) {
        return request({
            url: api_name,
            method: 'put',
            data: chapter
        })
    },

    // 5. 删除课程章节
    deleteById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },

}   