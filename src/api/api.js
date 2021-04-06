import request from '@/utils/request'

export function getData(url, params, showLoading) {
  return request({
    url,
    method: 'get',
    params,
    showLoading
  })
}

export function upData(url, data, showLoading) {
  return request({
    url,
    method: 'post',
    data,
    showLoading
  })
}

export function deleteData(url, params, showLoading) {
  return request({
    url,
    method: 'delete',
    params,
    showLoading
  })
}

export function upLogo(url, data) {
  return request({
    url,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}