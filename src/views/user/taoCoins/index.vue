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
        <div class="price">￥100.00</div>
      </div>
      <div class="btn_warp">
        <van-button class="btn" type="primary" round @click="handlePrice('chong')">充值</van-button>
        <van-button class="btn" round @click="handlePrice('ti')">提现</van-button>
      </div>
    </div>
    <van-popup class="popup" v-model="popupShow" closeable round position="bottom">
      <van-field
        class="input"
        v-model="priceNum"
        type="number"
        center
        required
        clearable
        :label="inputLabel+':'"
        placeholder="请输入金额"
      >
        <template #button>
          <van-button
            class="btn"
            size="small"
            round
            type="primary"
            @click="handleConfirmOperation"
          >确认</van-button>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      popupShow: false,
      priceNum: '',
      inputLabel: ''
    }
  },
  methods: {
    // 去我的淘币记录
    toTaoCoinsRecord() {
      this.$router.push('/user/taoCoins/record')
    },
    handlePrice(type) {
      this.inputLabel = type === 'chong' ? '充值金额' : '提现金额'
      this.popupShow = !this.popupShow
    },
    handleConfirmOperation() {
      if (!this.priceNum) {
        return this.$toast.fail('请输入' + this.inputLabel)
      }
      if (this.priceNum <= 0) {
        return this.$toast.fail(this.inputLabel + '不能小于0！')
      }
    }
  }
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
