<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单统计" is-arrow isBackUp />
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
    <div class="order_warp">
      <div class="order_content">
        <div class="item">
          <div class="text">普通订单</div>
          <div class="price">￥0</div>
          <div class="num">0单</div>
        </div>
        <div class="item">
          <div class="text">撤销订单</div>
          <div class="price">￥0</div>
          <div class="num">0单</div>
        </div>
      </div>
    </div>
    <van-list
      v-model="orderLoading"
      class="order_list"
      :finished="orderFinished"
      finished-text="没有更多了"
      @load="orderOnLoad"
    >
      <statistic-order-list class="items" :orderList="orderList" />
    </van-list>
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
      selectTimeIndex: 0,
      startTimeIsShow: false,
      endTimeIsShow: false,
      orderLoading: false,
      orderFinished: false,
      pickerStartTime: new Date(),
      pickerEndTimeIsShow: new Date(),
      startMinDate: new Date(2020, 0, 1),
      startMaxDate: new Date(2025, 10, 1),
      endMinDate: new Date(2020, 0, 1),
      endMaxDate: new Date(2025, 10, 1),
      timeSelectList: [
        { text: '昨日' },
        { text: '7日' },
        { text: '30日' },
        { text: '更多' }
      ],
      form: {
        startTime: '',
        endTime: ''
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
.order_warp {
  padding: 0 1rem;
  box-sizing: border-box;
  .order_content {
    display: flex;
    align-content: center;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    .item {
      width: 50%;
      color: #997a00;
      font-size: 0.8rem;
      text-align: center;
      line-height: 1.2rem;
      .price {
        font-weight: 900;
      }
    }
  }
  .order_content .item:nth-child(1) {
    border-right: 1px solid #eee;
  }
}
.order_list {
  padding: 1rem;
  box-sizing: border-box;
  .items {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
  }
}
</style>
