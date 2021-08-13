// 处理接口返回不是0的函数
import Vue from 'vue'
import { Toast } from 'vant'
import { getData } from '@/api/api.js'

const LOGIN_ERROR = '0x10002' // 登录异常
const ACCESS_RESTRICTED = '0x10003' // 权限不足
const UNKNOWN_ERROR = '0x10001' // 未知错误
const INVALID_PARAMETER = '2x10001' // 非法参数
const FILETYPE_ERROR = '3x10001' // 资源类型错误
const REPEAT_VALUE = '4x10001' // 数据已存在
const DATA_FAIL = '4x10002' // 数据操作失败
const DATA_EMPTY = '4x10003' // 没有数据记录
const UNKNOWN_SITE = '5x10001' // 未知站点

function handleCode(res) {
    // 没有数据记录
    if (res.code === DATA_EMPTY) {
        return false
    } else if (res.code === LOGIN_ERROR) {
        window.sessionStorage.getItem('wxCode') && window.sessionStorage.setItem('wxCode', '')
        window.location.href = 'https://www.xtaoshop.com/index.html#/login'
    } else if (res.code === UNKNOWN_SITE) {
        JSON.parse(window.sessionStorage.getItem('siteInfo')) && window.sessionStorage.setItem('siteInfo', JSON.stringify({}))
        Toast.fail('你的站点不存在')
        return false
    }
    else {
        Toast.fail(res.msg)
    }
}

export default function (Vue) {
    //添加全局API
    Vue.prototype.$handleCode = {
        handleCode
    }
}
