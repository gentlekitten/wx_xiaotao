<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="店铺详情" is-arrow isBackUp>
      <template v-slot:right_icon>
        <van-icon name="share-o" size="1.5rem" @click="overlayIsShow = true" />
      </template>
    </nav-bar>
    <div class="shopping_warp">
      <div class="shopping">
        <div class="shop_img">
          <img :src="'https://jixi.mynatapp.cc/'+shopInfoObj.shopPic" />
        </div>
        <div class="shop_info">
          <div class="title">{{ shopInfoObj.shopName }}</div>
          <van-rate
            v-model="rateValue"
            size="1rem"
            color="#f2af49"
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <div class="lable">{{ shopInfoObj.introduce }}</div>
        </div>
      </div>
    </div>
    <div class="cell_warp">
      <div class="cell_group">
        <div class="cell cell1">
          <div class="title">店铺电话</div>
          <div class="value" @click="toUserPhone">{{ shopInfoObj.shopPhone }}</div>
        </div>
        <div class="cell cell1">
          <div class="title">店铺地址</div>
          <div class="value">{{ shopInfoObj.shopAddress }}</div>
        </div>
        <div class="cell cell1">
          <div class="title">主营业务</div>
          <div class="value main_business">{{ shopInfoObj.businessInfo }}</div>
        </div>
        <div class="cell cell2">
          <div class="title">营业时间</div>
          <div class="value">{{ shopInfoObj.startTime+'-'+shopInfoObj.endTime }}</div>
        </div>
        <div class="cell cell2">
          <div class="title">举报商家</div>
          <div class="value">
            <van-icon
              class="icon_left"
              name="phone-o"
              size="1.5rem"
              @click="toPhone(shopInfoObj.sitePhone)"
            />
            <van-icon name="warning-o" size="1.5rem" @click="toReportView(shopInfoObj.shopId)" />
          </div>
        </div>
        <div class="cell3">
          <div class="title">店铺资质</div>
          <div class="business_img">
            <div class="text">营业执照</div>
            <van-image
              class="img"
              :src="'https://jixi.mynatapp.cc/'+shopInfoObj.businessLicense"
              @click="imagePreview('https://jixi.mynatapp.cc/'+shopInfoObj.businessLicense)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 分享遮蔽层 -->
    <van-overlay style="z-index: 999;" :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import { ImagePreview, Form } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'

export default {
  components: {
    NavBar,
    OverlayItem
  },
  data() {
    return {
      shopId: 0,
      overlayIsShow: false,
      rateValue: 0,
      shopInfoObj: {}
    }
  },
  created() {
    this.shopId = this.$route.query.id ? this.$route.query.id : 0
    this.getShopInfo()
  },
  methods: {
    // 获取店铺信息
    async getShopInfo() {
      const res = await getData(
        '/site/snack/shop/info',
        { shopId: this.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        const shopScore = this.shopInfoObj.shopScore
        if (shopScore.attitude || shopScore.attitude === 0) {
          this.rateValue =
            (shopScore.attitude + shopScore.quality + shopScore.sTime) / 6
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 拨打举报电话
    toPhone(phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    // 拨打商家电话
    toUserPhone(phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    // 跳转到举报界面
    toReportView(id) {
      this.$router.push(`/report?id=${id}`)
    },
    //   预览图片
    imagePreview(imgUrl) {
      const imgList = [imgUrl]
      ImagePreview({
        images: imgList,
        startPosition: 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
.shopping_warp {
  padding: 0 1rem;
  background-color: @themeColor;
  height: 12rem;
  display: flex;
  align-items: center;
}
.shopping {
  width: 90%;
  display: flex;
  position: relative;
  padding: 1rem;
  background-color: #fff;
  height: 5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  .shop_img {
    flex: 1;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
    }
  }
  .shop_info {
    flex: 5;
    margin-left: 1rem;
    .title {
      font-size: 1rem;
      font-weight: 900;
      margin-bottom: 0.2rem;
      display: flex;
      .icon {
        margin-top: 0.2rem;
      }
    }
    .lable {
      color: #999;
      font-size: 0.8rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.cell_warp {
  position: relative;
  .cell_group {
    position: absolute;
    top: -1rem;
    left: 5%;
    width: 90%;
  }
  .cell1:nth-child(1) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  .cell1:nth-child(3) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  .cell {
    box-sizing: border-box;
    padding: 1rem;
    width: 100%;
    height: 3rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      width: 25%;
      text-align: center;
      font-weight: 900;
    }
    .value {
      width: 75%;
      color: cadetblue;
      margin-left: 2rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .main_business {
      color: #999;
      font-size: 0.9rem;
    }
  }
  .cell2 {
    margin: 1rem 0;
    border-radius: 0.5rem;
    .value {
      color: #666;
    }
    .icon_left {
      margin-right: 2rem;
    }
  }
  .cell3 {
    background-color: #fff;
    padding: 1rem;
    margin-bottom: 1rem;
    .title {
      width: 25%;
      font-weight: 900;
    }
    .business_img {
      margin: 1rem 1rem 2rem 1rem;

      .text {
        color: #999;
        margin: 0 0 1rem 0;
      }
      .img {
        width: 5rem;
        //   height: 8rem;
      }
    }
  }
}
</style>
