import request from '@/utils/request'

export function getDictByType(type) {
  return request({
    url: '/systemservice/v1/sys/dict/list',
    method: 'post',
    data: { data: { type }}
  })
}

export function page(data) {
  return request({
    url: '/systemservice/v1/sys/dict/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/systemservice/v1/sys/dict/list',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/systemservice/v1/sys/dict/get',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/systemservice/v1/sys/dict/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/systemservice/v1/sys/dict/delete',
    method: 'post',
    data
  })
}
