import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/service_edu/account/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/service_edu/account/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/service_edu/account/logout',
    method: 'post'
  })
}
