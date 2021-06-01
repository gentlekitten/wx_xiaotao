<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="快递服务配置" is-arrow isBackUp />
    <div class="goods_specification">
      <div class="title">添加规格必选</div>
      <div class="top_input">
        <van-field
          class="left"
          v-model="form.expressSpecification"
          clearable
          placeholder="规格名，如小件"
        />
        <van-field
          class="center"
          v-model.number="form.specificationPrice"
          clearable
          placeholder="价格"
        />
        <div class="right_btn">
          <van-button class="btn" round @click="addSpecificationBtn">添加规格</van-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in expressSpecificationList" :key="item.id">
          <div class="text">{{ item.specificationName }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="close_icon" @click="deleteExpressSpecification(item)">
            <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
          </div>
        </div>
      </div>
    </div>
    <div class="goods_specification">
      <div class="title">添加可选服务</div>
      <div class="top_input">
        <van-field class="left" v-model="form.expressService" clearable placeholder="可选服务名，如雨天" />
        <van-field class="center" v-model.number="form.servicePrice" clearable placeholder="价格" />
        <div class="right_btn">
          <van-button class="btn" round @click="addServiceBtn">添加服务</van-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in expressServiceList" :key="item.id">
          <div class="text">{{ item.specificationName }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="close_icon" @click="deleteExpressService(item)">
            <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
          </div>
        </div>
      </div>
    </div>
    <div class="submit_btn">
      <van-button class="btn" round @click="clickSaveBtn">确定保存</van-button>
    </div>
  </div>
</template>
<script>
import { upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        expressSpecification: '',
        specificationPrice: '',
        expressService: '',
        servicePrice: ''
      },
      expressSpecificationList: [],
      expressServiceList: []
    }
  },
  methods: {
    // 添加规格
    addSpecificationBtn() {
      if (
        !this.form.expressSpecification.trim() ||
        !this.form.specificationPrice.toString().trim()
      ) {
        return this.$toast.fail('请填写规格名或者价格！')
      }
      const id =
        this.expressSpecificationList.length > 0
          ? this.expressSpecificationList[
              this.expressSpecificationList.length - 1
            ].id + 1
          : 0
      const expressSpecification = {
        id,
        specificationName: this.form.expressSpecification,
        price: this.form.specificationPrice
      }
      this.expressSpecificationList.push(expressSpecification)
      this.form.expressSpecification = ''
      this.form.specificationPrice = ''
    },
    //   删除商品规格
    deleteExpressSpecification(item) {
      this.expressSpecificationList = this.expressSpecificationList.filter(
        e => {
          return item.id !== e.id
        }
      )
    },
    // 添加可选服务
    addServiceBtn() {
      if (
        !this.form.expressService.trim() ||
        !this.form.servicePrice.toString().trim()
      ) {
        return this.$toast.fail('请填写服务名名或者价格！')
      }
      const id =
        this.expressServiceList.length > 0
          ? this.expressServiceList[this.expressServiceList.length - 1].id + 1
          : 0
      const expressSpecification = {
        id,
        specificationName: this.form.expressService,
        price: this.form.servicePrice
      }
      this.expressServiceList.push(expressSpecification)
      this.form.expressService = ''
      this.form.servicePrice = ''
    },
    //   删除可选服务
    deleteExpressService(item) {
      this.expressServiceList = this.expressServiceList.filter(e => {
        return item.id !== e.id
      })
    },
    clickSaveBtn() {
      const data = {
        productInfoProperties: this.goodsAttributeList,
        productInfoSpecifications: this.expressSpecificationList
      }
      this.$store.commit('addGoods/SET_GOODS_ATTRIBUTE', data)
      sessionStorage.setItem(
        'addGoods',
        JSON.stringify(this.$store.state.addGoods)
      )
      this.$router.go(-1)
      console.log(this.$store.state.addGoods)
    }
  }
}
</script>
<style lang="less" scoped>
.goods_specification {
  .title {
    font-weight: 900;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
  box-sizing: border-box;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  .top_input {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left {
      flex: 4;
      background-color: #f7f7f7;
      height: 2rem;
      border-radius: 0.5rem;
    }
    .center {
      flex: 1;
      background-color: #f7f7f7;
      height: 2rem;
      border-radius: 0.5rem;
      margin: 0 0.5rem;
    }
    .right_btn {
      flex: 1;
      .btn {
        width: 6rem;
        height: 2rem;
        background-color: @themeColor;
        border: 1px solid @themeColor;
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
  .content {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      padding: 0.5rem;
      margin: 1rem 1rem 0 0;
      height: 1rem;
      background-color: #fff;
      font-size: 0.8rem;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      .price {
        color: @priceColor;
        margin: 0 0.66rem;
      }
      .close_icon {
        background-color: #facbc0;
        border-left: 1px solid #facbc0;
        display: flex;
        align-items: center;
      }
    }
  }
}
.submit_btn {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  .btn {
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>
