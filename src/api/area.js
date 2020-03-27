import request from '@/utils/request'

export function tree(data) {
  return request({
    url: '/systemservice/v1/sys/area/tree',
    method: 'post',
    data
  })
}

export function page(data) {
  return request({
    url: '/systemservice/v1/sys/area/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/systemservice/v1/sys/area/list',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/systemservice/v1/sys/area/get',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/systemservice/v1/sys/area/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/systemservice/v1/sys/area/delete',
    method: 'post',
    data
  })
}
