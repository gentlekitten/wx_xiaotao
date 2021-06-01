<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="优惠设置" is-arrow isBackUp />
    <van-form @submit="formSubmit">
      <div class="discount">
        <div class="text">满</div>
        <van-field
          v-model.number="form.requirePrice"
          required
          clearable
          type="number"
          placeholder="如300"
          :rules="[{ required: true, message: '请填写条件价格' }]"
        />
        <div class="text">减</div>
        <van-field
          v-model.number="form.discountPrice"
          required
          clearable
          type="number"
          placeholder="如50"
          :rules="[{ required: true, message: '请填写优惠价格' }]"
        />
      </div>
      <van-field
        v-model="form.endTime"
        required
        clearable
        type="number"
        label="优惠天数："
        placeholder="设置优惠天数"
        :rules="[{ required: true, message: '请填写优惠天数' }]"
      />
      <div class="btn_warp">
        <van-button class="btn" round native-type="formSubmit">提交发布</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import timeFormat from '@/assets/js/time.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        requirePrice: '',
        discountPrice: '',
        endTime: '',
        shopId: Number(window.sessionStorage.getItem('shopId'))
      }
    }
  },
  created() {
    this.getShopDisCount()
  },
  methods: {
    // 获取店铺优惠
    async getShopDisCount() {
      const res = await getData(
        '/shop/discount/find',
        { shopId: this.form.shopId },
        {
          showLoading: true
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.form = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 发布优惠
    async formSubmit() {
      if (Number(this.form.time) < 1) {
        this.$toast.fail('优惠天数不能小于1')
        return false
      }
      const endTime = timeFormat.gettime.setTime(
        this.form.endTime * 24 * 60 * 60 * 1000
      )
      console.log(endTime)
      const data = this._.cloneDeep(this.form)
      data.endTime = endTime
      const res = await upData('/shop/discount/add', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)

      // this.$store.commit('addShopping/DISCOUNTS', this.form)
      // sessionStorage.setItem(
      //   'addShopping',
      //   JSON.stringify(this.$store.state.addShopping)
      // )
      // this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.discount {
  display: flex;
  background-color: #fff;
  align-items: center;
  padding: 0 1rem;
  .text {
    color: @priceColor;
    font-weight: 900;
  }
}
.btn_warp {
  display: flex;
  justify-content: center;
  .btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>