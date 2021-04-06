<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="参数二维码" is-arrow isBackUp />
    <div class="code_warp">
      <div class="code_item" @click="getCode">
        <div class="code">
          <van-icon name="plus" size="1rem" />点击生成推广二维码
        </div>
      </div>
    </div>
    <div class="code_img_warp">
      <div class="item">
        <van-image
          class="img"
          fit="contain"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          @click="imagePreview(['https://img01.yzcdn.cn/vant/cat.jpeg'])"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {}
  },
  methods: {
    imagePreview(url) {
      ImagePreview({
        images: url
      })
    },
    getCode() {}
  }
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