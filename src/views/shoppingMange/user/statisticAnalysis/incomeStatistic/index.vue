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
        <van-popover
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
        </van-popover>
        <van-button class="btn" round>搜索</van-button>
      </div>
    </div>
    <div class="content_warp">
      <div class="content">
        <div class="top">
          <div class="left">
            全部订单：
            <span>10</span>
          </div>
          <div class="center">
            撤销订单：
            <span>5</span>
          </div>
          <div class="right">
            共收入：
            <span>￥100</span>
          </div>
        </div>
        <van-list
          v-model="orderLoading"
          :finished="orderFinished"
          finished-text="没有更多了"
          @load="orderOnLoad"
        >
          <statistic-order-list :orderList="orderList" />
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
import NavBar from '@/components/common/NavBar.vue'

import StatisticOrderList from '@/components/manage/StatisticOrderList.vue'

export default {
  components: {
    NavBar,
    StatisticOrderList
  },
  data() {
    return {
      startTimeIsShow: false,
      endTimeIsShow: false,
      showTypePopover: false,
      orderLoading: false,
      orderFinished: false,
      pickerStartTime: new Date(),
      pickerEndTimeIsShow: new Date(),
      startMinDate: new Date(2020, 0, 1),
      startMaxDate: new Date(2025, 10, 1),
      endMinDate: new Date(2020, 0, 1),
      endMaxDate: new Date(2025, 10, 1),
      typeActions: [
        { text: '全部' },
        { text: '订单入账' },
        { text: '撤销订单' }
      ],
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
      },
      orderList: [
        {
          id: 0,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈',
          price: '10',
          status: 200
        },
        {
          id: 1,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈',
          price: '10',
          status: 500
        },
        {
          id: 2,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '哈哈',
          price: '10',
          status: 200
        }
      ]
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    startTimeConfirm(value) {
      this.form.startTime = String(value)
      this.startTimeIsShow = false
    },
    endTimeConfirm(value) {
      this.form.endTime = String(value)
      this.endTimeIsShow = false
    },
    typeSelect(value) {
      this.form.type = value.text
    },
    initEcharts() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      myChart.showLoading()
      this.getUserPrice(myChart)
    },
    // 获取近七天营收数据
    getUserPrice(myChart) {
      const arr = [
        ['01-25', 13],
        ['01-26', 24],
        ['01-27', 33],
        ['01-28', 20],
        ['01-29', 0],
        ['01-30', 25],
        ['01-31', 43]
      ]
      setTimeout(() => {
        myChart.hideLoading()
        this.echartsOption.dataset.source = arr
        this.echartsOption && myChart.setOption(this.echartsOption)
      }, 1000)
    },
    // 上拉加载数据
    orderOnLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        this.orderLoading = false
      }, 1000)
      this.orderFinished = true
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
    .popup {
      flex: 3.6;
    }
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
