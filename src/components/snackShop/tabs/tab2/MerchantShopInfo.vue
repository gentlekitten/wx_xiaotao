<template>
  <div>
    <div class="user_info">
      <div class="user_img">
        <img class="user_img" v-lazy="userImg" />
      </div>
      <div class="username">店主：小明</div>
      <div class="option">
        <van-icon
          class="icon"
          name="phone-o"
          size="1.5rem"
          @click="toUserPhone(shopInfoObj.shopPhone)"
        />
        <van-icon class="icon" name="comment-o" size="1.5rem" @click="toChatView" />
      </div>
    </div>
    <div class="dispatching">
      <div class="left">起送价：￥{{ shopInfoObj.lowPrice ? shopInfoObj.lowPrice : 0 }}</div>
      <div
        v-if="shopInfoObj.shopOrders"
        class="right"
      >配送费：￥{{ shopInfoObj.shopOrders[0].deliveryFee ? shopInfoObj.shopOrders[0].deliveryFee : 0 }}</div>
    </div>
    <div class="shop_info">
      <div class="top">
        <div class="cell">
          已售：
          <span>{{ shopInfoObj.sale }}单</span>
        </div>
        <div class="cell">店铺电话：{{ shopInfoObj.shopPhone }}</div>
        <div class="cell">
          店铺地址：{{ shopInfoObj.addressDetail }}
          <van-icon name="location-o" />
        </div>
        <div class="cell">营业时间：{{ shopInfoObj.startTime }}</div>
        <div class="cell">主营业务：{{ shopInfoObj.businessInfo }}</div>
        <div class="cell">店铺简介：{{ shopInfoObj.introduce }}</div>
      </div>
      <div class="center">
        <div class="cell">
          <i class="iconfont icon-song" />专人配送
        </div>
      </div>
      <!-- <div class="business_license">
        <div class="cell">营业执照</div>
        <div class="cell_info">
          <van-image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            @click="clickImg(['https://img.yzcdn.cn/vant/apple-1.jpg'])"
          />
        </div>
        <div class="cell">经营许可</div>
        <div class="cell_info">
          <van-image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            @click="clickImg(['https://img.yzcdn.cn/vant/apple-1.jpg'])"
          />
        </div>
      </div>-->
      <div class="shop_qualification">
        <div class="title">店铺资质</div>
        <div class="item_warp">
          <div class="item">
            <div class="text">营业执照</div>
            <van-image
              class="image"
              fit="contain"
              :src="'https://jixi.mynatapp.cc/'+shopInfoObj.businessLicense"
              @click="clickImg(['https://jixi.mynatapp.cc/'+shopInfoObj.businessLicense])"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="cell">
          举报商家：
          <van-icon class="icon" name="phone-o" size="1.5rem" @click="toPhone" />
          <van-icon class="icon" name="warning-o" size="1.5rem" @click="toReportView" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shopInfoObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      userImg: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  methods: {
    clickImg(imgUrl) {
      this.$emit('clickImg', imgUrl)
    },
    // 拨打店主电话
    toUserPhone(phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    // 去聊天界面
    toChatView() {
      this.$router.push('/chatView')
    },
    // 拨打举报电话
    toPhone() {
      const phoneNum = 14708701960
      window.location.href = 'tel:' + phoneNum
    },
    // 跳转到举报界面
    toReportView() {
      this.$router.push('/report')
    }
  }
}
</script>
<style lang="less" scoped>
.user_info {
  display: flex;
  height: 4rem;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 0.5rem;
  .user_img {
    flex: 1;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .username {
    flex: 5;
    font-size: 0.8rem;
  }
  .option {
    display: flex;
    flex: 3;
    .icon {
      margin: 0 1rem;
    }
  }
}
.dispatching {
  display: flex;
  border-top: 1px solid #ccc;
  font-size: 0.8rem;
  box-sizing: border-box;
  height: 2.5rem;
  width: 100%;
  background-color: #fff;
  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.shop_info {
  font-size: 0.8rem;
  .shop_qualification {
    margin: 1rem 0;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 0.8rem;
    padding: 1rem 0.5rem;
    .title {
      font-size: 0.9rem;
    }
    .item_warp {
      display: flex;
      justify-content: flex-start;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .image {
          width: 5rem;
          height: 5rem;
        }
        .text {
          margin: 0.8rem 0;
        }
      }
    }
  }
  .cell {
    background-color: #fff;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    line-height: 1.5rem;
    .icon {
      margin: 0 0.5rem;
    }
    span {
      color: saddlebrown;
    }
  }
  .cell_info {
    height: 4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    .van-image {
      width: 30%;
    }
  }
  .top {
    margin-top: 1rem;
  }
  .bottom {
    margin-bottom: 3rem;
  }
}
</style>
