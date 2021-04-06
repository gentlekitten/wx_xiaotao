<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="选择店铺" is-arrow isBackUp />
    <div class="top_bg" />
    <div class="task_type">
      <div class="warp">
        <van-cell
          class="cell"
          is-link
          v-for="(item, index) in taskTypeList"
          :key="item.titel + index"
          :border="false"
          :to="item.url"
        >
          <template #icon>
            <img class="img" :src="item.img" />
          </template>
          <template #title>
            <span class="title">{{ item.title }}</span>
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
          img: require('../../assets/img/index/snackShop.png'),
          title: '零食铺',
          url: '/shoppingMange/user?id=1'
        },
        {
          img: require('../../assets/img/index/takeOut.png'),
          title: '外卖商店',
          url: '/shoppingMange/user?id=2'
        },
        {
          img: require('../../assets/img/index/beautyMakeup.png'),
          title: '美妆店',
          url: '/shoppingMange/user?id=3'
        },
        {
          img: require('../../assets/img/index/electronic.png'),
          title: '数码店',
          url: '/shoppingMange/user?id=4'
        }
      ]
    }
  },
  created() {
    this.handleUserIsShopping()
  },
  methods: {
    // 判断用户有没有店铺
    handleUserIsShopping() {
      this.taskTypeList[2].url = `/shoppingMange/user/shopManage?isShop=${false}&id=3`
    }
  }
}
</script>
<style lang="less" scoped>
.top_bg {
  width: 100%;
  height: 10rem;
  background-color: @themeColor;
}
.task_type {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .warp {
    width: 90%;
    width: 90%;
    padding: 1rem 0;
    border-radius: 1rem;
    background-color: #fff;
    position: absolute;
    top: -6rem;
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
