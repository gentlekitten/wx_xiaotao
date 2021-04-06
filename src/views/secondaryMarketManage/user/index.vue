<template>
  <div>
    <div class="top_bg" />
    <div class="user_warp">
      <div class="user_info">
        <div class="user_top">
          <img :src="userInfoObj.img" />
          <div class="content">
            <div class="name">{{ userInfoObj.name }}</div>
            <div class="phone">{{ userInfoObj.phone }}</div>
          </div>
        </div>
        <div class="order_status">
          <div class="order">
            <div class="title">{{ userInfoObj.todayOrder }}单</div>
            <div class="text">总订单</div>
          </div>
          <div class="order">
            <div class="title">{{ userInfoObj.todayPrice }}元</div>
            <div class="text">总营业</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userInfoObj: {
        img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        name: '哈哈',
        phone: '147918348388',
        status: '接单中',
        todayOrder: 0,
        todayPrice: 0
      }
    }
  },
  methods: {
    userStatusSelect(action) {
      this.userInfoObj.status = action.text
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
.user_warp {
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  position: fixed;
  top: 3rem;
  right: 0;
  .user_info {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0 1rem;
    .user_top {
      display: flex;
      align-items: center;
      height: 6rem;
      border-bottom: 1px solid #eee;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
      }
      .content {
        flex: 5;
        margin-left: 1rem;
        line-height: 1.5rem;
        .name {
          font-weight: 900;
        }
        .phone {
          color: #999;
          font-size: 0.8rem;
        }
      }
      .status {
        flex: 1.5;
        height: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid cadetblue;
        color: cadetblue;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        padding: 0.2rem;
        box-sizing: border-box;
      }
    }
    .order_status {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .order {
        text-align: center;
        .title {
          font-weight: 900;
        }
        .text {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
