import request from '@/utils/request'

export default {

    // 1 讲师列表(条件查询分页)
    getTeacherListPage(current,limit,teacherQuery) {
        return request({
            url: `/service_edu/teachers/page/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
          })
    },

    // 2. list
    getAllTeachers() {
      return request({
        url:  `/service_edu/teachers/all`,
        method: 'get',
      })
    },

    // 3. id
    getTeacherById(id) {
      return request({
        url: `/service_edu/teachers/${id}`,
        method: 'get'
      })
    },

    // 4. add
    addTeacher(teacher) {
      return request({
        url: `/service_edu/teachers`,
        method: 'post',
        data: teacher
      })
    },
    // 5. update
    updateTeacher(teacher) {
      return request({
        url: `/service_edu/teachers`,
        method: 'put',
        data: teacher
      })
    },

    // 6.delete
    deleteTeacherById(id) {
      return request({
        url: `/service_edu/teachers/${id}`,
        method: 'delete'
      })
    }

}