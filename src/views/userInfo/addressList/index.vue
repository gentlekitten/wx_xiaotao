<template>
  <div>
    <nav-bar :title="'选择地址'" is-back-up :is-arrow="true" />
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="addAddress"
      @edit="editAddress"
      @select="selectAddress"
    />
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      chosenAddressId: 1,
      // 地址配送列表
      addressList: [],
      // 不可配送地址列表
      disabledList: [
        {
          id: '2',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        },
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    // 获取用户地址列表
    async getAddressList() {
      const data = {}
      const res = await getData(
        '/customer/address/my/find',
        { siteId: 13 },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.addressList = res.data
        this.disabledList = this.addressList.filter(e => {
          return e.state === 0
        })
        this.addressList.forEach(e => {
          e.name = e.realname
          e.tel = e.phone
          e.county = e.district
          e.isDefault = e.addressDefault === 0 ? false : true
          e.address = e.city + e.province + e.district + e.addressDetail
        })
        this.chosenAddressId = res.data.filter(e => {
          return e.addressDefault === 1
        })[0].id

        return false
      }
      return this.$toast.fail(res.msg)
    },
    // 点击新增地址
    addAddress() {
      this.$router.push('/user/userInfo/editAddress?type=add')
    },
    // 点击编辑地址
    editAddress(item, index) {
      sessionStorage.setItem('addressObj', JSON.stringify(item))
      this.$router.push(`/user/userInfo/editAddress?type=edit&id=${item.id}`)
    },
    // 更选地址
    selectAddress(item) {
      const isExist = this.disabledList.some(e => {
        return e.id === item.id
      })
      console.log(isExist)

      if (isExist) {
        return this.$toast.fail('该地址不在配送范围哦！')
      }
      this.$toast.success('更改成功')
      console.log(item)
    }
  }
}
</script>
<style lang="less" scoped>
.van-address-item {
  height: 4.5rem;
  .van-cell {
    height: 4.5rem;
  }
}
</style>
