<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="选择发布任务类型" is-arrow isBackUp />
    <div class="top">
      <div class="content">
        本校
        <span class="total">10位</span>领跑者为你服务&nbsp;其中
        <span class="work">5位</span>当前在线等待接单
      </div>
    </div>
    <div class="task_type">
      <div class="warp">
        <van-cell
          class="cell"
          is-link
          v-for="(item, index) in taskTypeList"
          :key="item.title + index"
          :border="false"
          :to="item.url + item.title"
        >
          <template #icon>
            <img class="img" :src="item.img" />
          </template>
          <template #title>
            <span class="title">{{ item.title }}</span>
          </template>
          <template #label>
            <span class="label">{{ item.lable }}</span>
          </template>
        </van-cell>
      </div>
    </div>
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
      taskTypeList: [
        {
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '代取代送',
          lable: '取快递、寄快递、送礼物...',
          url: 'taskSend?id=0&title='
        },
        {
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '跑腿代办',
          lable: '买饮料、买零食、代排队...',
          url: 'taskSend?id=1&title='
        },
        {
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: '全能服务',
          lable: '陪伴谈心、道早晚安...',
          url: 'taskSend?id=2&title='
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 10rem;
  background-color: @themeColor;
  color: #fff;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  line-height: 1.5rem;
  .content {
    .total {
      color: cadetblue;
      margin: 0 0.5rem;
      font-weight: 900;
    }
    .work {
      color: red;
      margin: 0 0.5rem;
      font-weight: 900;
    }
  }
}
.task_type {
  width: 100%;
  height: 16rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  .warp {
    width: 90%;
    height: 100%;
    width: 90%;
    border-radius: 1rem;
    background-color: #fff;
    position: absolute;
    top: -2rem;
    .cell {
      height: 4rem;
      margin: 1rem 0;
      .img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .title {
        font-size: 1.2rem;
        font-weight: 900;
        margin-left: 1rem;
      }
      .label {
        font-size: 0.8rem;
        margin-left: 1rem;
      }
    }
  }
}
.van-icon-arrow {
  font-size: 1.5rem;
}
</style>
