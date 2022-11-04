import request from '@/utils/request'

const api_name = '/service_edu/video'

export default {

    //1. 添加小节
    addVideo(video) {
        return request({
            url : `${api_name}`,
            method: 'post',
            data: video
        })
    },

    // 2. 删除小节
    deleteVideo(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete',
        })
    }


}