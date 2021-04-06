/**
 * 字典数据本地缓存
 *
 *
 */

import request from '@/utils/request'

const listByDictId = dictId => {
  return request({
    url: `/dict-detail/${dictId}/all`,
    method: 'get'
  })
}
const getStorageCaching = dictId => {
  return new Promise((resolve, reject) => {
    const KEY = 'MAPLE_KEY_DICT_ID_@' + dictId
    var result = JSON.parse(sessionStorage.getItem(KEY))
    if (result) {
      resolve(result)
      return
    }
    listByDictId(dictId)
      .then(result => {
        sessionStorage.setItem(KEY, JSON.stringify(result))
        resolve(result)
      })
      .catch(err => reject(err))
  })
}

const mark = {
  USER_STATUS: 1, // 用户状态
  ROLE_STATUS: 2, // 角色状态
  ROLE_TYPE: 3, // 角色类型
  DEPT_LEVEL: 4, // 部门级别
  DEPT_TYPE: 20, // 部门类型
  PERMIT_CLASSIFY: 6, // 权限分类
  PERMIT_METHOD: 7, // 权限请求方式
  USER_NATION: 8, // 用户民族
  USER_GENDER: 9, // 用户性别
  DEPT_STATUS: 5// 部门状态
}

export function listUserStatusDict() {
  return getStorageCaching(mark.USER_STATUS)
}

export function listRoleStatusDict() {
  return getStorageCaching(mark.ROLE_STATUS)
}

export function listRoleTypeDict() {
  return getStorageCaching(mark.ROLE_TYPE)
}

export function listDeptLevelDict() {
  return getStorageCaching(mark.DEPT_LEVEL)
}

export function listDeptTypeDict() {
  return getStorageCaching(mark.DEPT_TYPE)
}

export function listPermitClassifyDict() {
  return getStorageCaching(mark.PERMIT_CLASSIFY)
}

export function listPermitMethodDict() {
  return getStorageCaching(mark.PERMIT_METHOD)
}

export function listUserNationDict() {
  return getStorageCaching(mark.USER_NATION)
}

export function listUserGenderDict() {
  return getStorageCaching(mark.USER_GENDER)
}

export function listDeptStatusDict() {
  return getStorageCaching(mark.DEPT_STATUS)
}
