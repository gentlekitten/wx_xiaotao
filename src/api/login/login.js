import axios from 'axios'

export function login(url, params, showLoading) {
  return axios.get({
    url,
    method: 'get',
    params,
    showLoading
  })
}
