<template>
  <div id="home">
    <!-- 上背景 -->
    <div class="avtor">
      <div class="user_img_warp">
        <div class="backdrop" />
        <img class="image_big" :src="user.avatar" />
        <div class="avtor_logo" @click="editUserInfo">
          <img class="image_icon" :src="user.avatar" />
          <div class="user_name">
            {{ user.name }}
            <div class="edit_user">编辑资料</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <van-grid :border="false" :column-num="2">
        <van-grid-item to="/collectionGoods">
          <div class="num">0</div>
          <div class="text">收藏的商品</div>
        </van-grid-item>
        <van-grid-item to="/collectionShop">
          <div class="num">0</div>
          <div class="text">收藏的店铺</div>
        </van-grid-item>
        <!-- <van-grid-item>
          <div class="num">0</div>
          <div class="text">关注的商品</div>
        </van-grid-item>-->
        <!-- <van-grid-item>
          <div class="num">0</div>
          <div class="text">我的足迹</div>
        </van-grid-item>-->
      </van-grid>
    </div>

    <div class="order">
      <div class="all_order" @click="toMyAllOrder">
        <div class="left">我的订单</div>
        <div class="right">
          全部订单
          <van-icon name="arrow" size="0.8rem" />
        </div>
      </div>
      <van-grid class="grids" :border="false" :column-num="5">
        <van-grid-item @click="toOrder(1)">
          <i class="icon iconfont icon-daifukuan1" />
          <div class="text">待付款</div>
        </van-grid-item>
        <van-grid-item @click="toOrder(2)">
          <i class="icon iconfont icon-daifahuo" />
          <div class="text">待发货</div>
        </van-grid-item>
        <van-grid-item @click="toOrder(3)">
          <i class="icon iconfont icon-daishouhuo1" />
          <div class="text">待收货</div>
        </van-grid-item>
        <van-grid-item @click="toOrder(4)">
          <i class="icon iconfont icon-pingjia" />
          <div class="text">待评价</div>
        </van-grid-item>
        <van-grid-item @click="toOrder(5)">
          <i class="icon iconfont icon-tuikuanshouhou" />
          <div class="text">退货吧</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="shop_anagement other">
      <van-cell title="领跑者" is-link class="text" to="/orderPeopleManage/user" />
      <van-cell title="二手市场" is-link class="text" to="/secondaryMarketManage/user" />
      <van-cell title="店铺" is-link class="text" to="/myShoppingList" />
      <van-cell
        title="站点"
        is-link
        class="text"
        :to="isSite ? '/mySiteManage/user' : '/applyForSite'"
      />
    </div>
    <div class="other">
      <van-cell title="收货地址管理" is-link class="text" to="/user/userInfo/addressList" />
      <van-cell title="联系客服" is-link class="text" to="/chatView" />
      <van-cell title="意见反馈" is-link class="text" to="/feedback" />
      <van-cell title="商务合作" is-link class="text" />
    </div>
    <div class="footer" @click="overlayIsShow = true">
      <van-cell title="分享应用" is-link class="text" />
    </div>
    <!-- 分享遮蔽层 -->
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
  </div>
</template>
<script>
import OverlayItem from '@/components/snackShop/OverlayItem.vue'

export default {
  components: {
    OverlayItem
  },
  data() {
    return {
      overlayIsShow: false,
      isSite: true,
      user: {
        name: '小明',
        avatar:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'
      }
    }
  },
  methods: {
    editUserInfo() {
      this.$router.push('/user/userInfo')
    },
    toMyAllOrder() {
      window.sessionStorage.setItem('tabActiveIndexOrder', 0)
      this.$router.push('/order')
    },
    toOrder(index) {
      window.sessionStorage.setItem('tabActiveIndexOrder', index)
      this.$router.push('/order')
    }
  }
}
</script>
<style lang="less" scoped>
#home {
  padding-bottom: 4.5rem;
}
.grid {
  position: absolute;
  width: 96%;
  left: 50%;
  top: 38%;
  transform: translate(-50%);
  box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.4);
}
.grid .num {
  color: red;
  margin-bottom: 0.1rem;
}
.grid .text {
  color: #808080;
  font-size: 0.76rem;
  padding: 0.2rem 0;
}
.order {
  margin: 6rem 1rem 0 1rem;
  .all_order {
    display: flex;
    padding: 1rem;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #f7f7f7;
    .right {
      color: #999;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
    }
  }
}
.order .text {
  color: #808080;
  font-size: 0.73rem;
  padding: 0.28rem 0 0.1rem 0;
}
.van-cell {
  height: 3rem;
}
.other {
  margin: 1rem 1rem 0 1rem;
}
.footer {
  margin: 1rem 1rem 0 1rem;
}
/* 遮罩层 */
/* .backdrop {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0.45;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
} */

.user_img_warp {
  position: relative;
  background: #000;
}
.avtor {
  height: 42vh;
  overflow: hidden;
  background-color: #999;
  position: relative;
}
.image_big {
  height: 45vh;
  width: 100%;
  opacity: 0.6;
}
/* 用户头像 */
.avtor_logo {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%);
  text-align: center;
  z-index: 1;
}
.image_icon {
  height: 6.5rem;
  width: 6.5rem;
  border-radius: 50%;
  border: #808080 solid 1px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.6);
}
/* 用户名 */
.user_name {
  color: #fff;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}
.edit_user {
  color: #fff;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.user_name span {
  font-size: 0.8rem;
  color: #eee;
}
.van-grid-item {
  padding: 0;
}
.van-overlay {
  z-index: 10;
}
</style>
