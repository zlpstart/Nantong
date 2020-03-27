import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/systemservice/v1/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(sessionToken) {
  return request({
    url: '/systemservice/v1/sys/getUserFromSessionToken',
    method: 'get',
    params: { sessionToken }
  })
}

export function logout(sessionToken) {
  return request({
    url: '/systemservice/v1/sys/logout',
    method: 'post',
    data: { sessionToken: sessionToken }
  })
}
