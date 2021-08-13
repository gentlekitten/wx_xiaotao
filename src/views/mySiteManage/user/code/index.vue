<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="参数二维码" is-arrow isBackUp />
    <div class="code_warp">
      <div class="code_item" @click="createCode">
        <div class="code">
          <van-icon name="plus" size="1rem" />点击生成推广二维码
        </div>
      </div>
    </div>
    <div v-if="codeUrl" class="code_img_warp">
      <div class="item">
        <van-image
          class="img"
          fit="contain"
          :src="imgBaseUrl + codeUrl"
          @click="imagePreview([imgBaseUrl + codeUrl])"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      codeUrl: '',
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    async getCode() {
      const res = await getData('/qrcode/find', {}, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        this.codeUrl = res.data.codeUrl
        return false
      }
      this.$handleCode.handleCode(res)
    },
    async createCode() {
      const res = await getData('/qrcode/create', {}, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        this.codeUrl = res.data.codeUrl
        this.$toast.success('生成成功！')
        return false
      }
      this.$handleCode.handleCode(res)
    },
    imagePreview(url) {
      ImagePreview({
        images: url,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.code_warp {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  .code_item {
    background-color: #fff;
    width: 70%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    .code {
      color: #999;
      display: flex;
      align-items: center;
    }
  }
}
.code_img_warp {
  padding: 1rem;
  .item {
    display: flex;
    justify-content: center;
    .img {
      width: 90%;
    }
  }
}
</style>