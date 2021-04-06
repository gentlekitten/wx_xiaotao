import request from '@/utils/request'

export function additionDictDetail(data) {
  return request({
    url: '/dict-detail',
    method: 'post',
    data
  })
}

export function removeDictDetail(id) {
  return request({
    url: `/dict-detail/${id}`,
    method: 'delete'
  })
}

export function updateDictDetail(data) {
  return request({
    url: '/dict-detail',
    method: 'put',
    data
  })
}

export function listDictDetailByDictId(dictId, pageNum, pageSize) {
  return request({
    url: `/dict-detail/${dictId}`,
    method: 'get',
    params: Object.assign({}, { current: pageNum, size: pageSize })
  })
}

export function listByDictId(dictId) {
  return request({
    url: `/dict-detail/${dictId}/all`,
    method: 'get'
  })
}
