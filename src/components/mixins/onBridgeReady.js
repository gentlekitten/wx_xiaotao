// 微信支付

const onBridgeReady = {
    methods: {
        // 微信支付
        onBridgeReady(res) {
            const _that = this
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                    appId: res.appId, //公众号ID，由商户传入
                    timeStamp: res.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: res.nonceStr, //随机串
                    package: res.packageValue,
                    signType: res.signType, //微信签名方式：
                    paySign: res.paySign, //微信签名
                },
                function (res) {
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        window.sessionStorage.removeItem('shopCartList')
                        _that.$router.push('/payView?request=ok')
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                        _that.$router.push('/payView?request=cancel')
                    } else {
                        _that.$router.push('/payView?request=fail')
                    }
                }
            )
            // if (typeof WeixinJSBridge == 'undefined') {
            //   if (document.addEventListener) {
            //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            //   } else if (document.attachEvent) {
            //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            //   }
            // } else {
            //   onBridgeReady()
            // }
        },
    },
}

export default onBridgeReady