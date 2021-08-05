<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="快递服务配置" is-arrow isBackUp />
    <div class="goods_specification">
      <div class="title">添加规格必选</div>
      <div class="top_input">
        <van-field
          class="left"
          v-model="form.specificationName"
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
          <van-button class="btn" round @click="addSpecificationBtn"
            >添加规格</van-button
          >
        </div>
      </div>
      <div class="content">
        <div
          class="item"
          v-for="item in expressSpecificationList"
          :key="item.id"
        >
          <div class="text">{{ item.serviceName }}</div>
          <div class="price">￥{{ item.servicePrice }}</div>
          <div class="close_icon" @click="deleteExpressSpecification(item)">
            <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
          </div>
        </div>
      </div>
    </div>
    <div class="goods_specification">
      <div class="title">添加可选服务</div>
      <div class="top_input">
        <van-field
          class="left"
          v-model="form.serviceName"
          clearable
          placeholder="可选服务名，如雨天"
        />
        <van-field
          class="center"
          v-model.number="form.servicePrice"
          clearable
          placeholder="价格"
        />
        <div class="right_btn">
          <van-button class="btn" round @click="addServiceBtn"
            >添加服务</van-button
          >
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in expressServiceList" :key="item.id">
          <div class="text">{{ item.serviceName }}</div>
          <div class="price">￥{{ item.servicePrice }}</div>
          <div class="close_icon" @click="deleteExpressService(item)">
            <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
          </div>
        </div>
      </div>
    </div>
    <div class="goods_specification">
      <div class="title">设置上门小费</div>
      <div class="top_input">
        <van-field
          class="left express_money"
          v-model.number="form.expressMoney"
          clearable
          placeholder="寄出快递的上门小费"
        />
        <div class="right_btn">
          <van-button class="btn" round @click="saveExpressMoney"
            >保存</van-button
          >
        </div>
      </div>
    </div>
    <div class="submit_btn">
      <van-button class="btn" round @click="clickSaveBtn">确定保存</van-button>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('mySiteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('mySiteInfo')).id
        : 0,
      form: {
        // 规格
        specificationName: '',
        specificationPrice: '',
        // 服务
        serviceName: '',
        servicePrice: '',
        // 上门小费
        expressMoney: '',
      },
      // 规格列表
      expressSpecificationList: [],
      // 服务列表
      expressServiceList: [],
    }
  },
  created() {
    this.getPecificationList()
    this.getExpressServiceList()
    this.getExpressMoney()
  },
  methods: {
    // 获取规格
    async getPecificationList() {
      const data = {}
      if (this.siteId) {
        data.siteId = this.siteId
      }
      const res = await getData('/site/express/config/find', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.expressSpecificationList = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取服务
    async getExpressServiceList() {
      const data = {}
      if (this.siteId) {
        data.siteId = this.siteId
      }
      const res = await getData('/site/express/other/find', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.expressServiceList = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 添加规格
    async addSpecificationBtn() {
      if (
        !this.form.specificationName.trim() ||
        !this.form.specificationPrice.toString().trim()
      ) {
        return this.$toast.fail('请填写规格名或者价格！')
      }
      const data = {
        serviceName: this.form.specificationName,
        servicePrice: this.form.specificationPrice,
        siteId: this.siteId,
      }
      const res = await upData('/site/express/config/add', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.form.specificationName = ''
        this.form.specificationPrice = ''
        this.expressSpecificationList.push(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    //   删除商品规格
    async deleteExpressSpecification(item) {
      const res = await upData(
        '/site/express/config/delete',
        { id: item.id, siteId: this.siteId },
        {
          showLoading: true,
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.expressSpecificationList = this.expressSpecificationList.filter(
          (e) => {
            return item.id !== e.id
          }
        )
        this.$toast.success('删除成功！')
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 添加可选服务
    async addServiceBtn() {
      if (
        !this.form.serviceName.trim() ||
        !this.form.servicePrice.toString().trim()
      ) {
        return this.$toast.fail('请填写服务名名或者价格！')
      }
      const data = {
        serviceName: this.form.serviceName,
        servicePrice: this.form.servicePrice,
        siteId: this.siteId,
      }
      const res = await upData('/site/express/other/add', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.form.serviceName = ''
        this.form.servicePrice = ''
        this.expressServiceList.push(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    //   删除可选服务
    async deleteExpressService(item) {
      const res = await upData(
        '/site/express/other/delete',
        { id: item.id, siteId: this.siteId },
        {
          showLoading: true,
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.expressServiceList = this.expressServiceList.filter((e) => {
          return item.id !== e.id
        })
        this.$toast.success('删除成功！')
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取上门小费
    async getExpressMoney() {
      const res = await getData(
        '/site/express/fee/find',
        {
          siteId: this.siteId,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.form.expressMoney = res.data.expressMoney
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 保存上门小费
    async saveExpressMoney() {
      if (!this.form.expressMoney.toString()) {
        return this.$toast.fail('请填写上门小费！')
      }
      const res = await upData(
        '/site/express/fee/add',
        {
          expressMoney: this.form.expressMoney,
          siteId: this.siteId,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('保存成功！')
        return false
      }
      this.$handleCode.handleCode(res)
    },
    clickSaveBtn() {
      this.$router.go(-1)
    },
  },
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
    .express_money {
      margin-right: 1rem;
    }
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
