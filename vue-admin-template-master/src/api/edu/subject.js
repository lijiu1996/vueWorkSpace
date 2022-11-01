import request from '@/utils/request'

const api_name = '/service_edu/subject'

export default {

    // 1.查询全部信息
    getSubjectsList() {
        return request({
            url : `${api_name}/list`,
            method : "get",
        })
    }
    // 2.分页条件查询

    // 3.增加

    // 4.修改

    // 5.删除

    // 6.根据id值进行查询
}