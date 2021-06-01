<template>
  <div>
    <nav-bar v-if="type === 'edit'" :title="'编辑地址'" is-back-up :is-arrow="true" />
    <nav-bar v-else :title="'新增地址'" is-back-up :is-arrow="true" />
    <div v-if="type === 'edit'" class="tip">只更换默认地址不用点保存哦~</div>
    <van-address-edit
      :area-list="areaList"
      :show-delete="type === 'edit'"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :tel-validator="telValidator"
      :address-info="formDataObj"
      @save="saveAddress"
      @delete="deleteAddress"
      @change-default="defaultAddressChange"
    />
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import { getProvinceList, getCityList, getCountyList } from '@/address.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      // 添加还是编辑
      type: 'add',
      // 地址id
      id: null,
      // 地区列表
      areaList: {
        province_list: getProvinceList(),
        city_list: getCityList(),
        county_list: getCountyList()
      },
      formDataObj: {}
      // addressInfo: this.$store.getters.addressItem
      // addressInfo: {
      //   addressDetail: '1号',
      //   areaCode: '110101',
      //   city: '北京市',
      //   county: '东城区',
      //   id: '1',
      //   isDefault: false,
      //   name: '张三',
      //   province: '北京市',
      //   tel: '13000000000'
      // }
    }
  },
  created() {
    this.type = this.$route.query.type
    this.type === 'edit' && (this.id = this.$route.query.id)
    this.type === 'edit' && this.getFormDataObj()
  },
  methods: {
    // 获取地区的编码（根据value获取key），因为vant的地址编辑组件，地址显示要areaCode=那个地址的编码
    getAreaNumber(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
    },
    // 点击编辑获取数据
    getFormDataObj() {
      this.formDataObj = JSON.parse(sessionStorage.getItem('addressObj'))
      this.formDataObj.areaCode = this.getAreaNumber(
        getCountyList(),
        this.formDataObj.county
      )
    },

    // 手机号验证 14708701960
    telValidator(val) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(val)
    },
    // 保存地址
    async saveAddress(content) {
      let data = {}
      const {
        province,
        city,
        county,
        isDefault,
        name,
        tel,
        addressDetail
      } = content
      const formData = {}
      // 由于后端发送数据包含无关数据会报错所以需要格式化一下
      if (this.type === 'edit') {
        formData.realname = name
        formData.phone = tel
        formData.province = province
        formData.city = city
        formData.district = county
        formData.addressDetail = addressDetail
        formData.siteId = this.siteId
        formData.id = this.id
        data = formData
      } else {
        // 因为vant字段和后端数据字段不同需要改改
        this.formDataObj.addressDefault = isDefault ? 1 : 0
        this.formDataObj.realname = name
        this.formDataObj.phone = tel
        this.formDataObj.province = province
        this.formDataObj.city = city
        this.formDataObj.district = county
        this.formDataObj.addressDetail = addressDetail
        this.formDataObj.siteId = this.siteId
        data = this.formDataObj
      }
      // const id = this.$store.getters.addressId + 1
      // this.changeId(id)
      const url =
        this.type === 'add'
          ? '/customer/address/add'
          : '/customer/address/update'

      const res = await upData(url, data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('保存成功')
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode()
    },
    // 删除地址
    async deleteAddress(content) {
      // console.log(content)
      const res = await getData(
        '/customer/address/id/delete',
        { id: this.id },
        { showLoading: true }
      )
      if (res.code === '0') {
        this.$toast.success('删除成功')
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 修改默认地址
    async defaultAddressChange(value) {
      if (this.type === 'edit') {
        const data = {
          addressDefault: value ? 1 : 0,
          id: this.id,
          siteId: this.siteId
        }
        const res = await getData('/customer/address/default/update', data, {
          showLoading: true
        })
        console.log(res)
        if (res.code === '0') {
          this.$toast.success('修改成功！')
          return false
        }
        this.$handleCode.handleCode(res)
      }
    }
  }
}
</script>
<style scoped>
.tip {
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
  padding-top: 1rem;
}
::v-deep .van-address-edit__fields .van-field__label {
  width: 5rem;
}
</style>
