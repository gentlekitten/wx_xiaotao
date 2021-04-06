import request from '@/utils/request'

export function login(params, showLoading) {
    return request({
      url: `/login`,
      method: 'get',
      params,
      showLoading
    })
  }
  