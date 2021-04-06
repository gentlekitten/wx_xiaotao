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
            <div class="site">昆明冶金高等专科学校安宁校区</div>
          </div>
        </div>
        <div class="order_status">
          <div class="order">
            <div class="title">{{ userInfoObj.todayOrder }}单</div>
            <div class="text">今日订单</div>
          </div>
          <div class="order">
            <div class="title">{{ userInfoObj.todayPrice }}人</div>
            <div class="text">今日新增</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <div class="grid_warp">
      <grid class="grid" isManage :gird-list="girdList" :column-num="3" />
    </div>
  </div>
</template>
<script>
import Grid from '@/components/common/Grid.vue'

export default {
  components: {
    Grid
  },
  data() {
    return {
      userStatusShowPopover: false,
      girdList: [
        {
          img: require('../../../assets/img/mange/shop-mang.png'),
          text: '站点管理',
          url: '/mySiteManage/user/mySiteManage'
        },
        {
          img: require('../../../assets/img/mange/chat.png'),
          text: '消息管理',
          url: '/mySiteManage/user/chatManage'
        },
        {
          img: require('../../../assets/img/mange/fenxi.png'),
          text: '站点数据',
          url: '/mySiteManage/user/statisticAnalysis'
        },
        {
          img: require('../../../assets/img/mange/kaohe.png'),
          text: '站长考核',
          url: '/mySiteManage/user/assess'
        },
        {
          img: require('../../../assets/img/mange/code.png'),
          text: '参数二维码',
          url: '/mySiteManage/user/code'
        }
      ],
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
        .site {
          color: #999;
          font-size: 0.8rem;
        }
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
.grid_warp {
  padding: 1rem;
  margin-top: 3rem;
  .grid {
    border-radius: 0.5rem;
    padding-bottom: 1rem;
  }
}
</style>
