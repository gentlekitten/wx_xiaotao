<template>
  <div class="shop_details">
    <div class="title">
      <span>|</span>商品详情
    </div>
    <template v-if="isProductDetailAddress">
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
    productDetailAddress: {
      type: String,
      default: ''
    },
    isProductDetailAddress: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.isProductDetailAddress)
  },
  mounted() {
    this.setIframeHeight()
  },
  methods: {
    setIframeHeight() {
      const iframe = document.getElementsByClassName('goods_details')
      try {
        // var bHeight = iframe.contentWindow.document.body.scrollHeight
        // var dHeight = iframe.contentWindow.document.documentElement.scrollHeight
        // var height = Math.min(bHeight, dHeight)
        // this.deviceHeight = height
        const iframe = document.getElementsByClassName('goods_details')
        const dHeight =
          iframe[0].contentWindow.document.documentElement.scrollHeight
        iframe[0].height = dHeight
      } catch (ex) {}
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