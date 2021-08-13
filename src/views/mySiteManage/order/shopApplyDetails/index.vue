<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="店铺申请详情" is-arrow isBackUp />
    <van-cell class="shop_img_cell" title="店铺头像：">
      <template #default>
        <div
          class="shop_img"
          @click="imagePreview([imgBaseUrl+shopDetails.shopPic])"
        >
          <img :src="imgBaseUrl+shopDetails.shopPic" />
        </div>
      </template>
    </van-cell>
    <van-cell title="店铺名称：">
      <template #default>
        <div class="info">{{ shopDetails.shopName }}</div>
      </template>
    </van-cell>
    <van-cell title="客服电话：">
      <template #default>
        <div class="phone" @click="toPhone(shopDetails.shopPhone)">{{ shopDetails.shopPhone }}</div>
      </template>
    </van-cell>
    <van-cell title="店铺地址：">
      <template #default>
        <div class="info">{{ shopDetails.shopAddress }}</div>
      </template>
    </van-cell>
    <div class="tro_text">
      <div class="title">店铺介绍：</div>
      <div class="text">{{ shopDetails.introduce }}</div>
    </div>
    <!-- 店铺资质 -->
    <div class="shop_qualification">
      <div class="title">店铺资质：</div>
      <div class="item_warp">
        <div class="item">
          <div class="text">营业执照</div>
          <img
            :src="imgBaseUrl+shopDetails.businessLicense"
            @click="imagePreview([imgBaseUrl+shopDetails.businessLicense])"
          />
        </div>
      </div>
    </div>
    <div v-if="state === '2'" class="btn_warp">
      <van-button class="btn" type="primary" round @click="handleClickBtn(1)">同意</van-button>
      <van-button class="btn refuse" round @click="handleClickBtn(0)">拒绝</van-button>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: 0,
      state: 2,
      shopDetails: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.state = this.$route.query.state
      this.getShopDetails()
    }
  },
  methods: {
    async getShopDetails() {
      const res = await getData(
        '/shop/apply/id/find',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopDetails = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理拨打电话事件
    toPhone(phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    imagePreview(url) {
      ImagePreview({
        images: url
        // startPosition: 1
      })
    },
    async handleClickBtn(state) {
      const data = {
        state,
        id: this.id
      }
      const res = await getData('/shop/apply/id/update', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('操作成功！')
        this.$router.go(-1)
      }
      this.$handleCode.handleCode(res)
    }
  }
}
</script>
<style lang="less" scoped>
.shop_img_cell {
  height: 6rem;
  .shop_img {
    img {
      height: 5rem;
      width: 5rem;
      // margin-left: 1rem;
    }
  }
}
.phone {
  color: cadetblue;
}
.tro_text {
  //   height: 6rem;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  .title {
    font-weight: 900;
    width: 8rem;
  }
  .text {
    color: #999;
    font-size: 0.9rem;
  }
}
.shop_qualification {
  margin: 1rem 0;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 0.8rem;
  padding: 1rem;
  .title {
    font-size: 1rem;
    font-weight: 900;
  }
  .item_warp {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        margin: 0.8rem 0;
      }
      img {
        width: 5rem;
        height: 5rem;
      }
    }
  }
}
.btn_warp {
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;
  .btn {
    margin: 0 0 4rem 0;
    width: 8rem;
    height: 2.8rem;
  }
  .refuse {
    color: @priceColor;
    border: 1px solid @priceColor;
    background-color: #fff;
  }
}
.van-cell__title {
  font-size: 1rem;
  font-weight: 900;
}
.van-cell__value {
  text-align: left;
  margin-left: -12rem;
  font-size: 0.9rem;
}
</style>
