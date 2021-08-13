<template>
  <div>
    <nav-bar :title="'我的淘币'" back-to="/user" :is-arrow="true">
      <template v-slot:right_icon>
        <div @click="toTaoCoinsRecord">记录</div>
      </template>
    </nav-bar>
    <div class="container">
      <div class="top">
        <img src="../../../assets/img/零钱.png" />
        <span>我的淘币</span>
        <div class="price">￥{{ myTaoCoinsInfo.cMoney }}</div>
      </div>
      <div class="btn_warp">
        <van-button class="btn" round @click="popupShow = !popupShow"
          >提现</van-button
        >
      </div>
    </div>
    <van-popup
      class="popup"
      v-model="popupShow"
      closeable
      round
      position="bottom"
    >
      <van-field
        class="input"
        v-model="priceNum"
        type="number"
        center
        required
        clearable
        label="提现金额："
        placeholder="请输入金额"
      >
        <template #button>
          <van-button
            class="btn"
            size="small"
            round
            type="primary"
            @click="handleConfirmOperation"
            >确认</van-button
          >
        </template>
      </van-field>
    </van-popup>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      popupShow: false,
      priceNum: '',
      myTaoCoinsInfo: {},
      cMoney: 0,
    }
  },
  created() {
    this.getMyMoney()
  },
  methods: {
    // 获取我的淘币金额
    async getMyMoney() {
      const res = await getData(
        '/customer/money/use/find',
        {},
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.myTaoCoinsInfo = res.data
        // this.myTaoCoinsInfo.cMoney = this.myTaoCoinsInfo.cMoney
        //   ? this.myTaoCoinsInfo.cMoney
        //   : 0
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 去我的淘币记录
    toTaoCoinsRecord() {
      this.$router.push('/user/taoCoins/record')
    },
    handleConfirmOperation() {
      if (!this.priceNum) {
        return this.$toast.fail('请输入提现金额或不能为0！')
      }
      if (this.priceNum <= 0) {
        return this.$toast.fail('提现金额不能小于0！')
      }
      if (this.myTaoCoinsInfo.state === 0) {
        return this.$toast.fail('您现在账户冻结，不能提现请见谅！')
      }
      if (this.priceNum > this.myTaoCoinsInfo.cMoney) {
        return this.$toast.fail('余额不足！')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    margin-top: 5rem;
    text-align: center;
    line-height: 2.5rem;
    img {
      width: 50%;
      height: 50%;
    }
    span {
      display: block;
      font-size: 0.9rem;
    }
    .price {
      font-weight: 900;
      font-size: 2rem;
    }
  }
  .btn_warp {
    margin-top: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .btn {
      width: 52%;
      height: 2.3rem;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  }
}
.popup {
  height: 10rem;
  display: flex;
  align-items: center;
  .input {
  }
  .btn {
    font-size: 0.8rem;
    width: 4rem;
    height: 2rem;
  }
}
</style>
