<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="首页轮播设置" is-arrow isBackUp />
    <van-field class="uploaderImg" label="首页轮播图" required>
      <template #input>
        <van-uploader
          v-model="swiperImg"
          :max-count="2"
          :after-read="uploading"
          @delete="deleteImg"
        />
      </template>
    </van-field>
    <van-field
      v-if="swiperImg.length >= 1"
      v-model="form.oneSwiperUrl"
      class="animated fadeInDown"
      center
      clearable
      label-width="7rem"
      label="第一张图片链接"
      placeholder="请输入第一张图片链接"
    ></van-field>
    <van-field
      v-if="swiperImg.length >= 2"
      v-model="form.twoSwiperUrl"
      class="animated fadeInDown"
      center
      clearable
      label-width="7rem"
      label="第二张图片链接"
      placeholder="请输入第二张图片链接"
    ></van-field>
    <div class="btn_warp">
      <van-button class="btn" round @click="saveForm">保存</van-button>
    </div>
  </div>
</template>
<script>
import { upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      swiperImg: [],
      form: {
        oneSwiperUrl: '',
        twoSwiperUrl: '',
        swiperImg: []
      }
    }
  },
  methods: {
    deleteImg(file, detail) {
      this.swiperImg.splice(detail.index, 1)
      // this.form.swiperImg.splice(detail.index, 1)
    },
    // 处理上传图片
    uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'done'
      }, 1000)
    },
    async saveForm() {
      if (this.swiperImg.length < 1) {
        this.$toast.fail('请上传轮播图再保存哦~')
      }
      const res = await upData()
      if (res.code === '0') {
        return this.$toast.success('保存成功！')
      }
      return this.$toast.fail(res.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.uploaderImg {
  height: 5rem !important;
}
.btn_warp {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  .btn {
    margin: 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
</style>