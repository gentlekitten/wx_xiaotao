import request from '@/utils/request'

export function additionDict(data) {
  return request({
    url: '/dict',
    method: 'post',
    data
  })
}

export function removeDict(id) {
  return request({
    url: `/dict/${id}`,
    method: 'delete'
  })
}

export function updateDict(data) {
  return request({
    url: '/dict',
    method: 'put',
    data
  })
}

export function searchDict(pageNum, pageSize) {
  return request({
    url: '/dict/all',
    method: 'get',
    params: Object.assign({}, { current: pageNum, size: pageSize })
  })
}
