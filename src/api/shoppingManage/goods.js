import request from '@/utils/request'

export function addGoods(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: `/product/post`,
    method: 'post',
    data
  })
}

export function deleteGoods(params) {
  return request({
    url: `/product/add`,
    method: 'delete',
    params
  })
}

export function upLogo(data) {
  return request({
    url: `/product/img`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteLogo(params) {
  return request({
    url: `/img/logo`,
    method: 'delete',
    params
  })
}