<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="首页轮播设置" is-arrow isBackUp />
    <van-field class="uploaderImg" label="首页轮播图" required>
      <template #input>
        <van-uploader
          v-model="swiperImg"
          :max-count="2"
          :max-size="5120 * 1024"
          @oversize="handleImgLarge"
          :after-read="uploading"
          @delete="deleteImg"
        />
      </template>
    </van-field>
    <van-field
      v-if="swiperImg.length >= 1"
      v-model="swiperUrl[0]"
      class="animated fadeInDown"
      center
      clearable
      label-width="7rem"
      label="第一张图片链接"
      placeholder="请输入第一张图片链接"
    ></van-field>
    <van-field
      v-if="swiperImg.length >= 2"
      v-model="swiperUrl[1]"
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
import { upData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      swiperImg: [],
      swiperUrl: [],
      form: {
        siteInfoPics: [],
      },
    }
  },
  methods: {
    deleteImg(file, detail) {
      this.swiperImg.splice(detail.index, 1)
      // this.form.swiperImg.splice(detail.index, 1)
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('img', file.file)
      const res = await upLogo('/site/img/upload', formData)
      console.log(res)
      if (res.code === '0') {
        this.form.siteInfoPics.push({
          picAddress: res.data.filename,
          siteId: this.siteId,
          picLink: '',
        })
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 保存首页轮播
    async saveForm() {
      if (this.swiperImg.length < 1) {
        this.$toast.fail('请上传轮播图再保存哦~')
      }
      for (let index = 0; index < this.swiperUrl.length; index++) {
        this.form.siteInfoPics[index].picLink = this.swiperUrl[index]
      }
      const res = await upData('/site/pic/add', this.form, {
        showLoading: true,
      })
      if (res.code === '0') {
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
  },
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