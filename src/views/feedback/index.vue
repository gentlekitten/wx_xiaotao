<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="意见反馈" is-arrow isBackUp />
    <van-form @submit="reportSubmit">
      <!-- 意见框 -->
      <van-field
        class="report_input"
        v-model="reportForm.msg"
        type="textarea"
        autosize
        maxlength="100"
        show-word-limit
        label="意见："
        placeholder="请输入您的意见"
        required
        clearable
        :rules="[{ required: true }]"
      />
      <!-- 邮箱 -->
      <van-field class v-model="reportForm.email" label="您的邮箱：" placeholder="填写邮箱" clearable />
      <div class="btn_warp">
        <van-button class="btn" round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 弹出层 -->
    <van-popup class="popup" v-model="popupIsShow" :close-on-click-overlay="false" round>
      <div class="popup_item">
        <van-icon class="icon" name="success" size="3rem" />您的意见我们已收到，我们会认真思考，谢谢您的参与。
      </div>
      <div class="btn_warp">
        <van-button class="btn" round block type="primary" @click="reportOver">好的</van-button>
      </div>
    </van-popup>
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
      reportForm: {
        msg: '',
        email: '',
        siteId: 23
      },
      popupIsShow: false
    }
  },
  methods: {
    // 提交
    async reportSubmit() {
      const res = await upData('/site/opinion/add', this.reportForm, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        return (this.popupIsShow = true)
      }
      return this.$toast.fail(res.msg)
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
::v-deep .van-field__word-limit {
  margin-top: 4rem;
}
</style>
