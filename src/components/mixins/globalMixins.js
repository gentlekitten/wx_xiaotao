export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    // 图片共用地址
                    imgBaseUrl: 'https://www.xtaoshop.com/'
                }
            },
        })
    }
}
