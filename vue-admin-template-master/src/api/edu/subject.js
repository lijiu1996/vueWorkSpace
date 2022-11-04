import request from '@/utils/request'

const api_name = '/service_edu/subject'

export default {

    // 1.查询全部信息
    getSubjectsList() {
        return request({
            url : `${api_name}/list`,
            method : "get",
        })
    },
    // 2.根据id获取二级列表信息
    getSubjects(id) {
        return request({
            url: `${api_name}/listSubject/${id}`,
            method: 'get',
        })
    },
    
}