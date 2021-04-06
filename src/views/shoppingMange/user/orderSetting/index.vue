<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单配置" is-arrow isBackUp />
    <div class="home">
      <!-- <div class="order_type">
        <div class="title">支持订单类型</div>
        <van-checkbox-group class="checkbox_group" v-model="checkboxValue" checked-color="#CEAC20">
          <van-checkbox name="a">到店消费</van-checkbox>
          <van-checkbox class="checkbox" name="b">校内邮寄</van-checkbox>
          <van-checkbox name="c">快递邮寄</van-checkbox>
        </van-checkbox-group>
      </div>-->
      <div class="send_price">
        <van-field class="input" type="number" v-model="sendPrice" label="外卖起送价格" />
        <van-button class="btn" round>确认</van-button>
      </div>
      <div class="send_setting">
        <div class="title">配送设置</div>
        <div class="method">
          配送方式：
          <van-checkbox-group
            class="checkbox_group"
            v-model="checkboxValue"
            checked-color="#CEAC20"
          >
            <van-checkbox name="a" class="checkbox">商家配送</van-checkbox>
            <van-checkbox name="b">快递邮寄</van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-show="checkboxValue.indexOf('a') > -1" class="dispatching_price animated fadeInDown">
          商家配送费：
          <van-field class="input" type="number" v-model="merchantDispatchingPrice" />元
        </div>
        <div class="btn_warp">
          <van-button class="btn" round>保存</van-button>
        </div>
      </div>
      <div v-show="checkboxValue.indexOf('b') > -1" class="post_setting animated fadeInDown">
        <div class="title">邮寄设置</div>
        <div class="post_price">
          统一邮费：
          <van-field class="input" type="number" v-model="merchantDispatchingPrice" />元
        </div>
        <div class="btn_warp">
          <van-button class="btn" round>保存</van-button>
        </div>
      </div>
    </div>
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
      checkboxValue: [],
      sendPrice: 0,
      //   商家配送价格
      merchantDispatchingPrice: 0
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
  box-sizing: border-box;
  font-size: 0.95rem;
  // .order_type {
  //   background-color: #fff;
  //   box-sizing: border-box;
  //   padding: 1rem;
  //   border-radius: 0.5rem;
  //   .title {
  //     font-weight: 900;
  //     margin-bottom: 0.8rem;
  //   }
  //   .checkbox_group {
  //     display: flex;
  //     justify-content: space-between;
  //   }
  // }
  .send_price {
    display: flex;
    background-color: #fff;
    border-radius: 0.5rem;
    align-items: center;
    margin: 0.8rem 0;
    .input {
      width: 70%;
    }
    .btn {
      width: 5rem;
      height: 2rem;
      color: #997a00;
      background-color: #ffe788;
      border: 1px solid #ffe788;
    }
  }
  .send_setting {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    .title {
      margin-bottom: 1rem;
      font-weight: 900;
    }
    .method {
      display: flex;
      .checkbox_group {
        display: flex;
        .checkbox {
          margin-right: 1rem;
        }
      }
    }
    .dispatching_price {
      display: flex;
      margin-top: 0.5rem;
      align-items: center;
      .input {
        width: 30%;
      }
    }
  }
  .post_setting {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin-top: 0.8rem;
    .title {
      font-weight: 900;
    }
    .post_price {
      display: flex;
      align-items: center;
    }
    .input {
      width: 30%;
    }
  }
  .btn_warp {
    display: flex;
    justify-content: center;
    .btn {
      margin: 1rem 0;
      width: @buttonWidth;
      color: #997a00;
      height: 2.8rem;
      background-color: #ffe788;
      border: 1px solid #ffe788;
    }
  }
}
::v-deep .van-field__label {
  width: 6rem;
}
::v-deep .van-field__control {
  background-color: #f7f7f7;
}
</style>