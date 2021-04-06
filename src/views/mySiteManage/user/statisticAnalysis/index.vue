<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="站点数据" is-arrow isBackUp />
    <div class="top_warp">
      <div class="time_select">
        <div
          class="item"
          v-for="(i, index) in timeSelectList"
          :key="index"
          :class="{'active': selectTimeIndex === index}"
          @click="clickTimeSelect(i, index)"
        >{{ i.text }}</div>
      </div>
    </div>
    <div v-show="selectTimeIndex === 3" class="search_warp animated fadeInDown">
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
        <van-button class="btn" round>搜索</van-button>
      </div>
    </div>
    <div class="echarts">
      <div class="title">本站点数据</div>
      <div id="main" class="echarts_item" style="width: 100%;height:15rem;"></div>
    </div>
    <div class="data_warp">
      <div class="item">
        <div class="top">
          本站累计用户：
          <span>50</span>
        </div>
        <div class="content">
          近10天，新增用户：
          <span>0</span>；众包任务：
          <span>0</span>；代取快递：
          <span>0</span>；领跑者：
          <span>0</span>；二手市场：
          <span>0</span>；零食铺：
          <span>0</span>；商城：
          <span>0</span>
        </div>
      </div>
    </div>
    <div class="sort_list_warp">
      <div class="sort_list">
        <div class="item">
          <div class="title">昨日&nbsp;用户增量&nbsp;前10站点</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
        </div>
        <div class="item">
          <div class="title">昨日&nbsp;用户增量&nbsp;前10站点</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
        </div>
        <div class="item">
          <div class="title">昨日&nbsp;用户增量&nbsp;前10站点</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
          <div class="content">昆明冶金高等学校安宁校区</div>
        </div>
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

export default {
  components: {
    NavBar
  },
  data() {
    return {
      selectTimeIndex: 0,
      startTimeIsShow: false,
      endTimeIsShow: false,
      pickerStartTime: new Date(),
      pickerEndTimeIsShow: new Date(),
      startMinDate: new Date(2020, 0, 1),
      startMaxDate: new Date(2025, 10, 1),
      endMinDate: new Date(2020, 0, 1),
      endMaxDate: new Date(2025, 10, 1),
      form: {
        startTime: '',
        endTime: ''
      },
      timeSelectList: [
        { text: '7日' },
        { text: '30日' },
        { text: '90日' },
        { text: '更多' }
      ],
      echartsOption: {
        // 全局调色盘。
        // color: ['#9dd3e8'],
        dataset: {
          // 提供一份数据。
          source: []
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            top: 10,
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [
            '新增用户',
            '众包任务',
            '外卖',
            '代取快递',
            '领跑者',
            '二手市场',
            '零食铺',
            '商城'
          ],
          right: 30
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
            name: '新增用户',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 0
          },
          {
            name: '众包任务',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 1
          },
          {
            name: '外卖商城',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 2
          },
          {
            name: '代取快递',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 3
          },
          {
            name: '领跑者',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 4
          },
          {
            name: '二手市场',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 5
          },
          {
            name: '零食铺',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 6
          },
          {
            name: '商城',
            type: 'line',
            areaStyle: {},
            stack: '总量',
            emphasis: {
              focus: 'series'
            },
            datasetIndex: 7
          }
        ]
      }
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    clickTimeSelect(i, index) {
      this.selectTimeIndex = index
    },
    startTimeConfirm(value) {
      this.form.startTime = String(value)
      this.startTimeIsShow = false
    },
    endTimeConfirm(value) {
      this.form.endTime = String(value)
      this.endTimeIsShow = false
    },
    initEcharts() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      myChart.showLoading()
      this.getUserPrice(myChart)
    },
    getUserPrice(myChart) {
      const arr = [
        {
          source: [
            ['01-25', 12],
            ['01-26', 18],
            ['01-27', 20],
            ['01-28', 5],
            ['01-29', 9],
            ['01-30', 8],
            ['01-31', 20]
          ]
        },
        {
          source: [
            ['01-25', 10],
            ['01-26', 20],
            ['01-27', 26],
            ['01-28', 5],
            ['01-29', 9],
            ['01-30', 8],
            ['01-31', 12]
          ]
        },
        {
          source: [
            ['01-25', 12],
            ['01-26', 10],
            ['01-27', 36],
            ['01-28', 8],
            ['01-29', 9],
            ['01-30', 19],
            ['01-31', 12]
          ]
        },
        {
          source: [
            ['01-25', 17],
            ['01-26', 0],
            ['01-27', 6],
            ['01-28', 8],
            ['01-29', 13],
            ['01-30', 23],
            ['01-31', 29]
          ]
        },
        {
          source: [
            ['01-25', 10],
            ['01-26', 5],
            ['01-27', 13],
            ['01-28', 0],
            ['01-29', 20],
            ['01-30', 30],
            ['01-31', 22]
          ]
        },
        {
          source: [
            ['01-25', 0],
            ['01-26', 5],
            ['01-27', 23],
            ['01-28', 0],
            ['01-29', 10],
            ['01-30', 20],
            ['01-31', 12]
          ]
        },
        {
          source: [
            ['01-25', 30],
            ['01-26', 15],
            ['01-27', 3],
            ['01-28', 20],
            ['01-29', 10],
            ['01-30', 0],
            ['01-31', 12]
          ]
        },
        {
          source: [
            ['01-25', 12],
            ['01-26', 50],
            ['01-27', 13],
            ['01-28', 5],
            ['01-29', 14],
            ['01-30', 10],
            ['01-31', 2]
          ]
        }
      ]
      setTimeout(() => {
        myChart.hideLoading()
        this.echartsOption.dataset = arr
        this.echartsOption && myChart.setOption(this.echartsOption)
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.top_warp {
  padding: 0.8rem 1rem;
  box-sizing: border-box;
  .time_select {
    background-color: #fff;
    border-radius: 1rem;
    display: flex;
    justify-content: space-around;
    line-height: 2rem;
    color: #999;
    font-size: 0.95rem;
    .item {
      width: 100%;
      text-align: center;
    }
    .active {
      color: #997a00;
      background-color: #ffe788;
    }
  }
  .time_select .item:nth-child(1) {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
  .time_select .item:nth-child(4) {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
.search_warp {
  box-sizing: border-box;
  margin-bottom: 1rem;
  .top_select {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    .input {
      flex: 3;
      border-radius: 0.5rem;
    }
    .input:nth-child(2) {
      margin-left: 0.2rem;
    }
    .btn {
      flex: 1;
      width: 100%;
      color: #997a00;
      height: 2rem;
      background-color: #ffe788;
      border: 1px solid #ffe788;
      font-size: 0.8rem;
      margin-left: 0.5rem;
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
.echarts {
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem;
  .title {
    font-weight: 900;
    margin-bottom: 1rem;
  }
  .echarts_item {
    margin-bottom: 1rem;
  }
}
.data_warp {
  padding: 1rem;
  .item {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    line-height: 1.5rem;
    .top {
      span {
        color: cadetblue;
        font-weight: 900;
      }
    }
    .content {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #999;
      span {
        color: cadetblue;
        font-weight: 900;
      }
    }
  }
}
.sort_list_warp {
  padding: 1rem;
  box-sizing: border-box;
  .sort_list {
    .item {
      margin-bottom: 1rem;
      background-color: #fff;
      border-radius: 0.5rem;
      .title {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;
      }
      .content {
        padding: 0.5rem;
        background-color: #fff;
        color: #606266;
      }
      .content:nth-child(odd) {
        background-color: #fdf5e6;
      }
    }
  }
}
</style>