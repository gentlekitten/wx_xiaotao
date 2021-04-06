import request from '@/utils/request'

export function addShopping(data) {
  return request({
    url: '/shop/add',
    method: 'post',
    data
  })
}