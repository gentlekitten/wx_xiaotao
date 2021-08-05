<template>
  <div class="shop_details">
    <div class="title">
      <span>|</span>商品详情
    </div>
    <template v-if="productDetailAddress">
      <iframe
        ref="ifram"
        class="goods_details"
        :src="'https://jixi.mynatapp.cc/'+productDetailAddress"
        scrolling="no"
        frameborder="0"
      ></iframe>
    </template>
    <div class="bottom_tip">到底了哦~</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    // 商品详情地址
    productDetailAddress: {
      type: String,
      default: ''
    },
    // 是否有商品详情地址
    isProductDetailAddress: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    this.setIframeHeight()
  },
  methods: {
    setIframeHeight() {
      if (!this.productDetailAddress) {
        return false
      }
      const iframe = document.getElementsByClassName('goods_details')
      try {
        const dHeight =
          iframe[0].contentWindow.document.documentElement.scrollHeight
        iframe[0].height = dHeight
        console.log(dHeight)
        console.log(iframe)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.shop_details {
  background-color: #fff;
  padding: 0 1rem 3rem 1rem;
  .title {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    span {
      margin-right: 1rem;
      color: #ccc;
    }
  }
  .bottom_tip {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #ccc;
  }
}
.goods_details {
  width: 100%;
  height: 100%;
}
</style>