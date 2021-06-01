<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="营收统计" is-arrow isBackUp />
    <div class="echarts">
      <div id="main" class="echarts_item" style="width: 100%;height:15rem;"></div>
    </div>
    <div class="search_warp">
      <div class="top_select">
        <van-field
          class="input"
          v-model="form.startTime"
          right-icon="arrow-down"
          readonly
          placeholder="开始日期"
          @click="startTimeIsShow = true"
        />
        <van-field
          class="input"
          v-model="form.endTime"
          right-icon="arrow-down"
          readonly
          placeholder="结束日期"
          @click="endTimeIsShow = true"
        />
        <!-- <van-popover
          class="popup"
          v-model="showTypePopover"
          trigger="click"
          :actions="typeActions"
          @select="typeSelect"
        >
          <template #reference>
            <van-field
              class="input"
              v-model="form.type"
              right-icon="arrow-down"
              readonly
              placeholder="类型"
            />
          </template>
        </van-popover>-->
        <van-button class="btn" round @click="orderSearchConfirm">搜索</van-button>
      </div>
    </div>
    <div class="content_warp">
      <div class="content">
        <div class="top">
          <div class="left">
            普通订单：
            <span>{{ orderNumObj.orderNumber }}</span>
          </div>
          <div class="center">
            撤销：
            <span>{{ orderNumObj.revokeOrderNumber }}</span>
          </div>
          <div class="right">
            共收入：
            <span>￥{{ totalMoney }}</span>
          </div>
        </div>
        <van-list
          v-model="orderLoading"
          :finished="orderFinished"
          finished-text="哼，我也是有底线的~"
          :immediate-check="false"
          :offset="0"
          @load="orderOnLoad"
        >
          <statistic-order-list v-if="orderList.length > 0" :orderList="orderList" />
          <van-empty v-else description="暂无该数据" />
        </van-list>
      </div>
    </div>
    <!-- 开始时间选择 -->
    <van-overlay :show="startTimeIsShow" @click="startTimeIsShow = false">
      <div class="wrapper" @click.stop>
        <van-datetime-picker
          v-show="startTimeIsShow"
          class="datetime_picker"
          v-model="pickerStartTime"
          type="date"
          title="选择年月日"
          :min-date="startMinDate"
          :max-date="startMaxDate"
          @confirm="startTimeConfirm"
          @cancel="startTimeIsShow = false"
        />/>
      </div>
    </van-overlay>
    <!-- 结束时间选择 -->
    <van-overlay :show="endTimeIsShow" @click="endTimeIsShow = false">
      <div class="wrapper" @click.stop>
        <van-datetime-picker
          v-show="pickerEndTimeIsShow"
          class="datetime_picker"
          v-model="pickerEndTimeIsShow"
          type="date"
          title="选择年月日"
          :min-date="endMinDate"
          :max-date="endMaxDate"
          @confirm="endTimeConfirm"
          @cancel="endTimeIsShow = false"
        />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import timeForamt from '@/assets/js/time.js'

import NavBar from '@/components/common/NavBar.vue'

import StatisticOrderList from '@/components/manage/StatisticOrderList.vue'

import statisticAnalysis from '@/components/mixins/statisticAnalysis.js'

export default {
  components: {
    NavBar,
    StatisticOrderList
  },
  mixins: [statisticAnalysis],
  data() {
    return {
      totalMoney: 0,
      shopId: window.sessionStorage.getItem('shopId'),
      startTimeIsShow: false,
      endTimeIsShow: false,
      // showTypePopover: false,
      orderLoading: false,
      orderFinished: false,
      pickerStartTime: new Date(),
      pickerEndTimeIsShow: new Date(),
      startMinDate: new Date(2020, 0, 1),
      startMaxDate: new Date(2025, 10, 1),
      endMinDate: new Date(2020, 0, 1),
      endMaxDate: new Date(2025, 10, 1),
      // typeActions: [
      //   { text: '全部' },
      //   { text: '订单入账' },
      //   { text: '撤销订单' }
      // ],
      form: {
        startTime: '',
        endTime: '',
        type: '全部'
      },
      echartsOption: {
        title: {
          text: '近7日营收情况'
        },
        // 全局调色盘。
        color: ['#9dd3e8'],
        dataset: {
          // 提供一份数据。
          source: []
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['入账']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          height: '80%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              // 坐标轴线
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#666',
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              // 坐标轴线
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#666',
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '入账',
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            }
          }
        ]
      }
    }
  },
  created() {
    // statisticAnalysis混入里面的方法
    this.getOrderNum()
    // statisticAnalysis混入里面的方法
    this.getOrderList()
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    // 获取总入账
    async getMoney() {
      let time = timeForamt.gettime.formatTime()
      const data = {
        shopId: this.shopId,
        startTime: time,
        endTime: time
      }
      const res = await getData('/shop/bill/money/count', data, {
        showLoading: true
      })
      console.log(res)

      if (res.code === '0') {
        this.totalMoney = this.addNum(res.data.orderMoney)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    async orderSearchConfirm() {
      // statisticAnalysis混入里面的方法
      this.searchConfirm()
      const data = {
        shopId: this.shopId,
        startTime: this.form.startTime,
        endTime: this.form.endTime
      }
      const res = await getData('/shop/bill/money/count', data, {
        showLoading: false
      })
      console.log(res)
      if (res.code === '0') {
        this.totalMoney = this.addNum(res.data.orderMoney)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 更多开始时间确定
    startTimeConfirm(value) {
      this.form.startTime = timeForamt.gettime.formatOnlyTime(value)
      this.startTimeIsShow = false
    },
    // 更多结束时间确定
    endTimeConfirm(value) {
      this.form.endTime = timeForamt.gettime.formatOnlyTime(value)
      this.endTimeIsShow = false
    },
    // typeSelect(value) {
    //   this.form.type = value.text
    // },
    initEcharts() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      myChart.showLoading()
      this.getUserPrice(myChart)
    },
    // 获取近七天营收数据
    async getUserPrice(myChart) {
      const endTime = timeForamt.gettime.formatTime()
      const startTime = timeForamt.gettime.setTime(-6 * 24 * 60 * 60 * 1000)
      const data = {
        shopId: this.shopId,
        startTime,
        endTime
      }
      const res = await getData('/shop/bill/money/count', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        const orderMoneyList = res.data.orderMoney
        // 获取近七天的日期
        const timeArr = timeForamt.gettime.getCurrentIntervalDate(-6)
        console.log(orderMoneyList)

        const echartsArr = [[], [], [], [], [], [], []]
        for (let index = 0; index < timeArr.length; index++) {
          echartsArr[index][0] = timeArr[index]
        }
        for (let index = 0; index < orderMoneyList.length; index++) {
          echartsArr[index][1] = orderMoneyList[index]
        }
        console.log(echartsArr)

        myChart.hideLoading()
        this.echartsOption.dataset.source = echartsArr
        this.echartsOption && myChart.setOption(this.echartsOption)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 上拉加载数据
    orderOnLoad() {
      if (this.orderList.length > 0) {
        if (this.isSearch) {
          this.searchConfirm()
          return false
        }
        this.getOrderList()
      }
    },
    // 将时间相同的数组合并到一个数组
    handlerDatas(arr) {
      let obj = {}
      arr.forEach((item, index) => {
        let { createTime } = item
        if (!obj[createTime]) {
          obj[createTime] = {
            createTime,
            children: []
          }
        }
        obj[createTime].children.push(item)
      })
      let data = Object.values(obj)
      return data
    }
  }
}
</script>
<style lang="less" scoped>
.echarts {
  background-color: #fff;
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 1rem;
  .echarts_item {
    margin-bottom: 1rem;
  }
}
.search_warp {
  margin-top: 1rem;
  box-sizing: border-box;
  .top_select {
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 1rem;
    .input {
      flex: 3;
    }
    // .popup {
    //   flex: 3.6;
    // }
    .btn {
      flex: 1.5;
      width: 100%;
      color: #997a00;
      height: 2rem;
      background-color: #ffe788;
      border: 1px solid #ffe788;
      font-size: 0.8rem;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .datetime_picker {
    width: 18rem;
    border-radius: 0.5rem;
  }
}
.content_warp {
  margin: 0.5rem 0;
  box-sizing: border-box;
  .content {
    background-color: #fff;
    padding: 1rem;
    .tip {
      color: #999;
      font-size: 0.8rem;
      text-align: center;
      margin-top: 0.5rem;
    }
    .top {
      display: flex;
      justify-content: space-around;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      span {
        font-weight: 900;
      }
      .right {
        span {
          color: @priceColor;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
