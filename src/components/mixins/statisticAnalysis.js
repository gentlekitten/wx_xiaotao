// 统计分析模块
import { upData, getData } from '@/api/api.js'

import timeForamt from '@/assets/js/time.js'

const statisticAnalysis = {
    data() {
        return {
            orderList: [],
            orderNumObj: {},
            pageIndex: 0,
            isSearch: false
        }
    },
    methods: {
        // 处理计算订单和钱
        // handleCompute(arr) {
        //     // 计算普通订单
        //     const commonOrderNumber = arr.orderMaster.filter(e => {
        //         return e.payState === 1
        //     })
        //     this.commonOrderNumber = commonOrderNumber.length
        //     let commonOrderPriceList = []
        //     commonOrderNumber.forEach(e => {
        //         commonOrderPriceList.push(e.paymentMoney)
        //     })
        //     // 计算普通订单入账
        //     this.commonOrderPrice = this.addNum(commonOrderPriceList)

        //     // 计算撤销订单
        //     const repealOrderNumber = arr.orderMaster.filter(e => {
        //         return e.payState === 0
        //     })
        //     this.repealOrderNumber = repealOrderNumber.length
        //     let repealOrderPriceList = []
        //     repealOrderNumber.forEach(e => {
        //         repealOrderPriceList.push(e.paymentMoney)
        //     })
        //     // 计算撤销订单
        //     this.repealOrderPrice = this.addNum(repealOrderPriceList)

        //     // 计算未入账订单
        //     const noOrderNumber = arr.orderMaster.filter(e => {
        //         return e.payState === 2
        //     })
        //     this.noOrderNumber = noOrderNumber.length
        //     let noOrderPriceList = []
        //     noOrderNumber.forEach(e => {
        //         noOrderPriceList.push(e.paymentMoney)
        //     })
        //     // 计算未入账订单
        //     this.noOrderPrice = this.addNum(noOrderPriceList)
        // },
        // 自定义计算相加函数（解决js小数相加问题）
        addNum(array) {
            if (array.length <= 0) {
                return 0
            }
            const arr = array
            const fieldArr = []
            for (var i = 0; i < arr.length; i++) {
                var m, field
                try {
                    field = arr[i].toString().split('.')[1].length
                } catch (e) {
                    field = 0
                }
                fieldArr.push(field)
            }
            m = Math.pow(10, Math.max(...fieldArr))
            let add = 0
            arr.forEach(function (item) {
                add = add + item * m
            })
            let sum = Math.round(add) / m
            return sum
        },
        // 获取订单数
        async getOrderNum() {
            const time = timeForamt.gettime.formatTime()
            const data = {
                shopId: this.shopId,
                startTime: time,
                endTime: time
            }
            const res = await upData('/shop/order/count', data, {
                showLoading: true
            })
            console.log(res)
            if (res.code === '0') {
                this.orderNumObj = res.data
                return false
            }
            this.$handleCode.handleCode(res)
        },
        // 获取订单列表
        async getOrderList() {
            const time = timeForamt.gettime.formatTime()
            const data = {
                shopId: this.shopId,
                startTime: time,
                endTime: time,
                pageIndex: this.pageIndex,
                pageLimit: 10
            }
            const res = await upData('/shop/order/detail/count', data, {
                showLoading: true
            })
            this.orderLoading = false
            console.log(res)
            if (res.code === '0') {
                this.orderList.push(...res.data.shopOrderDetailVo)
                this.pageIndex += 1
                if (this.pageIndex * 10 >= res.data.number) {
                    this.orderFinished = true
                }
                return false
            }
            this.$handleCode.handleCode(res)
        },
        async searchConfirm() {
            if (!this.form.startTime || !this.form.endTime) {
                return this.$toast.fail('请选择完时间！')
            }
            if (timeForamt.gettime.compareDate(this.form.startTime, this.form.endTime)) {
                return this.$toast.fail('开始时间不能大于结束时间！')
            }
            this.isSearch = true
            this.orderList = []
            this.orderNumObj.orderNumber = 0
            this.orderNumObj.revokeOrderNumber = 0
            this.totalMoney = 0
            this.orderFinished = false
            this.pageIndex = 0
            const data = {
                shopId: this.shopId,
                startTime: this.form.startTime,
                endTime: this.form.endTime
            }
            const res1 = await upData('/shop/order/count', data, {
                showLoading: false
            })
            console.log(res1)
            if (res1.code === '0') {
                this.getSearchOrderList(data)
                this.orderNumObj = res1.data
                return false
            }
            this.$handleCode.handleCode(res1)
        },
        async getSearchOrderList(data) {
            data.pageIndex = this.pageIndex
            data.pageLimit = 10
            const res2 = await upData('/shop/order/detail/count', data, {
                showLoading: true
            })
            this.orderLoading = false
            console.log(res2)
            if (res2.code === '0') {
                this.orderList.push(...res2.data.shopOrderDetailVo)
                this.pageIndex += 1
                if (this.pageIndex * 10 >= res2.data.number) {
                    this.orderFinished = true
                }
                return false
            }
            this.$handleCode.handleCode(res2)

        }
    },
}

export default statisticAnalysis
