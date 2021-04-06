<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="公告配置" is-arrow isBackUp />
    <van-form @submit="saveForm">
      <van-field
        class="input"
        v-model="form.expressTip"
        rows="2"
        autosize
        label="快递公告"
        type="textarea"
        maxlength="50"
        required
        clearable
        placeholder="快递服务公告"
        show-word-limit
        :rules="[{ required: true}]"
      />
      <van-field
        class="input"
        v-model="form.snackShopTip"
        rows="2"
        autosize
        label="零食铺须知"
        type="textarea"
        maxlength="50"
        required
        clearable
        placeholder="零食铺须知内容"
        show-word-limit
        :rules="[{ required: true}]"
      />
      <div class="btn_warp">
        <van-button class="btn" round native-type="saveForm">{{ btnType }}</van-button>
      </div>
    </van-form>
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
      btnType: '保存',
      form: {
        expressTip: '',
        snackShopTip: '',
        siteId: 20
      }
    }
  },
  created() {
    // 处理更新还是保存
    if (this.form.expressTip) {
      this.btnType = '更新'
    }
  },
  methods: {
    async saveForm() {
      const res = await upData('/site/tip/add', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        return this.$toast.success('保存成功！')
      }
      return this.$toast.fail(res.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.input {
  height: 5rem;
}
.van-cell__title {
  font-size: 0.9rem;
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
</style>
