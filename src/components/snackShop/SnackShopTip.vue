<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="关于零食配送" is-arrow back-to="/snackShopList">
      <template v-slot:right_icon>
        <van-icon name="share-o" size="1.5rem" @click="overlayIsShow = true" />
      </template>
    </nav-bar>
    <div class="top">
      <p class="top_info">用心做最好的服务。</p>
    </div>
    <div class="content">
      <span class="text">{{ snackShopTipObj.snackShopTip }}</span>
      <span class="time">
        发布时间：
        {{ new Date() | datefmt('YYYY-MM-DD HH:mm:ss') }}
      </span>
    </div>
    <!-- 分享遮蔽层 -->
    <van-overlay class="overlay" :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

import OverlayItem from '@/components/snackShop/OverlayItem.vue'

export default {
  components: {
    NavBar,
    OverlayItem
  },
  props: {
    snackShopTipObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      overlayIsShow: false
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  border-bottom: 1px dashed #ccc;
  .top_info {
    color: #666;
    margin: 0.8rem 2rem;
  }
}
.content {
  padding: 1rem;
  .text {
    line-height: 2rem;
  }
  .time {
    color: #999;
    display: block;
    font-size: 0.8rem;
    margin-top: 2rem;
  }
}
.overlay {
  z-index: 100;
}
</style>
