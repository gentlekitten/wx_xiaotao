<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="举报4栋生活圈" is-arrow isBackUp />
    <van-form @submit="reportSubmit">
      <!-- 举报框 -->
      <van-field
        class="report_input"
        v-model="reportForm.msg"
        type="textarea"
        autosize
        maxlength="100"
        show-word-limit
        label="描述："
        placeholder="请详细描述商家违规行为或内容："
        required
        clearable
      />
      <!-- 文件上传 -->
      <van-field class="up_img" name="uploader" label="上传证据图片：（最多三张）">
        <template #input>
          <van-uploader
            v-model="reportUploaderImg"
            :max-count="3"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
            :after-read="uploading"
            @delete="deleteImg"
          />
        </template>
      </van-field>
      <!-- 电话 -->
      <van-field
        class
        v-model="reportForm.phone"
        type="number"
        label="您的电话："
        placeholder="填写可能受到进度反馈"
        clearable
      />
      <div class="btn_warp">
        <van-button class="btn" round block type="primary" native-type="reportSubmit">提交</van-button>
      </div>
    </van-form>
    <!-- 弹出层 -->
    <van-popup class="popup" v-model="popupIsShow" :close-on-click-overlay="false" round>
      <div class="popup_item">
        <van-icon class="icon" name="success" size="3rem" />您的举报我们已收到，本校站长及总部客服将尽快调查处理。可能给您造成不便深表歉意。
      </div>
      <div class="btn_warp">
        <van-button class="btn" round block type="primary" @click="reportOver">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { upData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      reportUploaderImg: [],
      reportForm: {
        msg: '',
        reportPics: [],
        phone: '',
        siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
          : 0,
        shopId: 1
      },
      popupIsShow: false
    }
  },
  methods: {
    // 删除图片
    deleteImg(file, detail) {
      this.reportUploaderImg.splice(detail.index, 1)
      this.reportForm.reportPics.splice(detail.index, 1)
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('reportImg', file.file)
      const res = await upLogo('/site/report/img', formData)
      console.log(res)
      this.reportForm.reportPics.push({ picAddress: res.data.filename })
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    // 提交
    async reportSubmit() {
      const res = await upData('/site/report/add', this.reportForm, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        return (this.popupIsShow = true)
      }
      this.$handleCode.handleCode(res)
    },
    // 点击好的
    reportOver() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.report_input {
  height: 8rem;
}
.up_img {
  height: 7rem;
}
.btn_warp {
  width: 100%;
  display: flex;
  justify-content: center;
  .btn {
    width: @buttonWidth;
    margin: 2rem 0;
  }
}
.popup {
  box-sizing: border-box;
  padding: 0 2rem;
  width: 15rem;
  height: 16rem;
  text-align: center;
  .popup_item {
    width: 100%;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .icon {
    position: absolute;
    top: 1rem;
  }
  .btn_warp {
    width: 100%;
    display: flex;
    justify-content: center;
    .btn {
      width: 8rem;
      height: 2.5rem;
    }
  }
}
.van-popup--center {
  top: 25%;
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
::v-deep .van-field__word-limit {
  margin-top: 4rem;
}
</style>
