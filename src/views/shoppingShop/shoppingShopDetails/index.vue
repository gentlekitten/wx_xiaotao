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
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="shop_info">
          <div class="title">哈哈哈哈哈</div>
          <van-rate
            v-model="rateValue"
            size="1rem"
            color="#f2af49"
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <div class="lable">店铺描述店铺描描述店铺描描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述店铺描述</div>
        </div>
      </div>
    </div>
    <div class="cell_warp">
      <div class="cell_group">
        <div class="cell cell1">
          <div class="title">店铺电话</div>
          <div class="value" @click="toUserPhone">111213113131</div>
        </div>
        <div class="cell cell1">
          <div class="title">店铺地址</div>
          <div class="value">蜀汉路金都花园</div>
        </div>
        <div class="cell cell1">
          <div class="title">主营业务</div>
          <div class="value main_business">零食</div>
        </div>
        <div class="cell cell2">
          <div class="title">营业时间</div>
          <div class="value">09:00-18:00</div>
        </div>
        <div class="cell cell2">
          <div class="title">举报商家</div>
          <div class="value">
            <van-icon class="icon_left" name="phone-o" size="1.5rem" @click="toPhone" />
            <van-icon name="warning-o" size="1.5rem" @click="toReportView" />
          </div>
        </div>
        <div class="cell3">
          <div class="title">店铺资质</div>
          <div class="business_img">
            <div class="business" v-for="(item, index) in businessList" :key="item.text + index">
              <div class="text">{{ item.text }}</div>
              <van-image class="img" :src="item.imgUrl" @click="imagePreview(index)" />
            </div>
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
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'

export default {
  components: {
    NavBar,
    OverlayItem
  },
  data() {
    return {
      overlayIsShow: false,
      rateValue: 2.5,
      businessList: [
        {
          text: '营业执照',
          imgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg'
        }
      ]
    }
  },
  methods: {
    // 拨打举报电话
    toPhone() {
      const phoneNum = 14708701960
      window.location.href = 'tel:' + phoneNum
    },
    // 拨打商家电话
    toUserPhone() {
      const phoneNum = 14708701960
      window.location.href = 'tel:' + phoneNum
    },
    // 跳转到举报界面
    toReportView() {
      this.$router.push('/report')
    },
    //   预览图片
    imagePreview(index) {
      const imgList = []
      this.businessList.forEach(i => {
        imgList.push(i.imgUrl)
      })
      ImagePreview({
        images: imgList,
        startPosition: index
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
      display: flex;
      flex-wrap: wrap;
      .business {
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
}
</style>
