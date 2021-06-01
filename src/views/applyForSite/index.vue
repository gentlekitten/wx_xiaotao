<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="站点申请" is-arrow isBackUp />
    <van-form @submit="onFormSubmit">
      <van-field
        v-model="form.username"
        label="姓名："
        placeholder="请输入姓名"
        required
        clearable
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="form.phone"
        type="number"
        label="手机号"
        placeholder="请输入手机号"
        required
        clearable
        :rules="[{ validator, message: '手机号格式错误' }]"
      />
      <van-field
        v-model="form.siteName"
        label="申请的站点"
        placeholder="请输入您想申请的站点"
        required
        clearable
        :rules="[{ required: true, message: '请填写站点' }]"
      />
      <van-field
        v-model="getSiteScopeValue"
        label-width="5.5rem"
        label="站点范围设置"
        placeholder="点击设置站点范围"
        required
        readonly
        @click="toSettingScope"
      />
      <div class="btn_warp">
        <van-button class="btn" round block type="info" native-type="onFormSubmit">提交申请</van-button>
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
      form: {
        username: '',
        phone: '',
        siteName: '',
        latitude: '',
        longitude: '',
        radius: ''
      }
    }
  },
  computed: {
    getSiteScope() {
      return this.$store.getters.siteAddress
    },
    getForm() {
      return this.$store.getters.applyForForm
    },
    // 格式化经纬
    getSiteScopeValue() {
      if (this.form.latitude) {
        return (
          '(' +
          this.form.latitude +
          ',' +
          this.form.longitude +
          ')' +
          'r:' +
          this.form.radius
        )
      }
      return ''
    }
  },
  mounted() {
    this.form = this.getForm
    this.form.latitude = this.getSiteScope.latitude
    this.form.longitude = this.getSiteScope.longitude
    this.form.radius = this.getSiteScope.radius
  },
  methods: {
    //   验证手机号
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    toSettingScope() {
      this.$store.state.scopeSetting.form = this.form
      this.$router.push('/mySiteManage/user/mySiteManage/scopeSetting')
    },
    // 提交
    async onFormSubmit() {
      if (this.form.latitude === '') {
        return this.$toast.fail('请设置站点范围')
      }
      const res = await upData('/site/add', this.form, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        return this.$toast.success('发送成功，请静候佳音哦~')
      }
      this.$handleCode.handleCode(res)
    }
  }
}
</script>
<style lang="less" scoped>
.btn_warp {
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  .btn {
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>
