<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="navBarTitle" is-arrow isBackUp />
    <van-form @submit="formSubmit">
      <van-field class="uploaderImg" label="店铺头像" required>
        <template #input>
          <van-uploader
            v-model="shopLogoImg"
            :max-count="1"
            :after-read="uploading"
            @delete="deleteImg('logo')"
          />
        </template>
      </van-field>
      <van-field
        v-model="form.shopName"
        label="店铺名称"
        placeholder="请输入店铺的名称"
        clearable
        required
        :rules="[{required: true}]"
      />
      <van-field
        v-model="form.shopPhone"
        label="客服电话"
        placeholder="请输入电话"
        clearable
        required
        :rules="[{validator, message: '手机号格式错误'}]"
      />
      <div v-if="shopManageId === 1" class="snack_shop_select">
        <div class="title">楼栋选择</div>
        <van-dropdown-menu active-color="#f2af49">
          <van-dropdown-item v-model="snackShopValue" :options="snackShopList" />
        </van-dropdown-menu>
      </div>
      <van-field v-if="shopManageId === 2" label="类型" required>
        <template #input>
          <van-radio-group v-model="takeOutType" direction="horizontal">
            <van-radio :name="1">周边外卖</van-radio>
            <van-radio :name="2">校园食堂</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div class="cell_item">
        <van-cell
          title="店铺地址"
          :value="form.shopAddress+form.addressDetail"
          is-link
          @click="topPopupIsShow = true"
        />
        <van-cell
          v-if="isShop"
          title="营业时间"
          :value="getBusinessTimeValue"
          is-link
          @click="toSeleceTime"
        />
        <van-cell
          v-if="isShop"
          title="优惠设置"
          :value="getDisountsValue"
          is-link
          @click="toSettingDiscount"
        />
      </div>
      <van-field
        v-if="isShop"
        class="textarea"
        v-model="form.tip"
        type="textarea"
        row="2"
        autosize
        label="促销公告"
        placeholder="店铺促销公告"
        clearable
      />
      <van-field
        class="textarea"
        v-model="form.businessInfo"
        type="textarea"
        row="2"
        autosize
        label="主营业务"
        placeholder="如：零食"
        required
        maxlength="20"
        show-word-limit
        clearable
      />
      <van-field
        class="textarea"
        v-model="form.introduce"
        type="textarea"
        row="2"
        autosize
        label="店铺介绍"
        placeholder="店铺介绍"
        clearable
        required
        :rules="[{required: true}]"
      />
      <!-- 店铺资质 -->
      <div class="shop_qualification">
        <div class="title">店铺资质</div>
        <div class="item_warp">
          <div class="item">
            <van-field class="uploaderImg" label="营业执照" required>
              <template #input>
                <van-uploader
                  v-model="shopQualificationImg"
                  :after-read="upBusinessLicense"
                  max-count="1"
                  @delete="deleteImg('qualification')"
                />
              </template>
            </van-field>
          </div>
        </div>
      </div>
      <div class="btn_warp">
        <van-button v-if="isShop" class="btn" round native-type="formSubmit">提交保存</van-button>
        <van-button v-else class="btn" round native-type="formSubmit">提交申请</van-button>
      </div>
    </van-form>
    <!-- 地址选择弹出层 -->
    <van-popup class="popup" v-model="topPopupIsShow" round position="top">
      <div class="title">店铺地址</div>
      <div class="btn_warp">
        <van-button class="btn" round @click="isAddressSelect = true">选择地址</van-button>
      </div>
      <van-field class="input" v-model="address.address" required placeholder="地址" readonly />
      <van-field
        class="input"
        v-model="address.addressDetails"
        required
        placeholder="详细地址"
        clearable
      />
      <!-- <van-field
        class="input"
        v-model="address.coordinate"
        placeholder="点击获取店铺坐标"
        required
        readonly
        @click="toSelectCoordinate"
      />-->
      <div class="btn_warp">
        <van-button class="btn" round @click="saveAddress">保存</van-button>
      </div>
      <van-overlay :show="isAddressSelect" @click="isAddressSelect = false">
        <div class="wrapper" @click.stop>
          <van-area
            class="area"
            v-show="isAddressSelect"
            title="标题"
            :area-list="areaList"
            :columns-placeholder="['请选择', '请选择', '请选择']"
            @confirm="areaConfirm"
            @cancel="isAddressSelect = false"
          />
        </div>
      </van-overlay>
    </van-popup>
    <!-- <van-overlay
      class="coordinate"
      :show="coordinateSelectIsShow"
      @click="coordinateSelectIsShow = false"
    >
      <div class="wrapper">
        <div id="container"></div>
        <div class="info">
          <h4 id="status"></h4>
          <hr />
          <p id="result"></p>
        </div>
      </div>
    </van-overlay>-->
  </div>
</template>
<script>
import { upData, upLogo } from '@/api/api.js'
import { getProvinceList, getCityList, getCountyList } from '@/address.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      // 店铺类型
      shopManageId: 1,
      topPopupIsShow: false,
      isAddressSelect: false,
      overlayIsShow: false,
      coordinateSelectIsShow: false,
      // 是否有该店铺
      isShop: true,
      navBarTitle: '店铺管理',
      // 店铺头像
      shopLogoImg: [],
      // 店铺资质
      shopQualificationImg: [],
      // 地区列表
      areaList: {
        province_list: getProvinceList(),
        city_list: getCityList(),
        county_list: getCountyList()
      },
      // 店铺地址
      address: {
        address: '',
        addressDetails: ''
      },
      snackShopValue: 1,
      snackShopList: [
        { text: '3栋零食铺', value: 1 },
        { text: '4栋零食铺', value: 2 },
        { text: '5栋零食铺', value: 3 }
      ],
      // 外卖类型
      takeOutType: 1,
      form: {
        shopName: '店铺名字',
        shopPhone: '14708701960',
        addressDetail: '',
        tip: '',
        businessInfo: '主营业务',
        introduce: '店铺介绍',
        shopPic: '',
        businessLicense: '',
        // 营业时间
        businessTime: {
          // 开始时间
          startTime: '',
          // 结束时间
          endTime: ''
        },
        // 优惠
        discountValue: {
          // 满多少
          requirePrice: '',
          // 减多少
          discountPrice: '',
          // 多少天
          time: ''
        },
        shopAddress: '',
        siteId: 23,
        shopCategoryId: '',
        // 所属楼栋
        siteApartment: {}
      }
    }
  },
  computed: {
    getBusinessTime() {
      return this.$store.getters.time
    },
    getDisounts() {
      return this.$store.getters.discounts
    },
    getImgList() {
      return this.$store.getters.addShoppingList
    },
    getFormData() {
      return this.$store.getters.form
    },
    // 格式化营业时间
    getBusinessTimeValue() {
      if (this.form.businessTime.startTime) {
        return (
          this.form.businessTime.startTime +
          '-' +
          this.form.businessTime.endTime
        )
      }
      return ''
    },
    // 格式化优惠
    getDisountsValue() {
      if (this.form.discountValue.discountPrice) {
        return (
          '满' +
          this.form.discountValue.requirePrice +
          '减' +
          this.form.discountValue.discountPrice +
          '-' +
          this.form.discountValue.time +
          '天'
        )
      }
      return ''
    }
  },
  created() {
    this.initViewData()
  },
  methods: {
    initViewData() {
      this.$route.query.id && (this.shopManageId = Number(this.$route.query.id))
      // 处理页面刷新
      this.handlePageRefresh()
      if (this.$route.query.isShop) {
        this.isShop = JSON.parse(this.$route.query.isShop)
      }
      if (!this.isShop) {
        this.navBarTitle = '店铺申请'
      }
      if (Object.keys(this.getFormData).length > 0) {
        this.form = this.getFormData
      }
      this.form.businessTime = this.getBusinessTime
      this.form.discountValue = this.getDisounts
      this.shopLogoImg = this.getImgList.shopLogoImg
      this.shopQualificationImg = this.getImgList.shopQualificationImg
    },
    //   验证手机号
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    // 处理页面刷新
    handlePageRefresh() {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem(
          'addShopping',
          JSON.stringify(this.$store.state.addShopping)
        )
      })

      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('addShopping')) {
        this.$store.commit(
          'addShopping/UPDATE_DATA',
          Object.assign(
            {},
            this.$store.state.addShopping,
            JSON.parse(sessionStorage.getItem('addShopping'))
          )
        )
      }
    },
    // 删除图片
    deleteLogoImg(type) {
      if (type === 'logo') {
        this.shopLogoImg = []
        this.form.shopPic = ''
        return false
      }
      this.shopQualificationImg = []
      this.businessLicense = ''
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('shopImg', file.file)
      const res = await upLogo('/shop/img', formData)
      console.log(res)
      this.form.shopPic = res.data.filename
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
    },
    // 处理上传营业执照
    async upBusinessLicense(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('shopImg', file.file)
      const res = await upLogo('/shop/img', formData)
      console.log(res)
      this.form.businessLicense = res.data.filename
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
    },
    // 地址选择框确认
    areaConfirm(address) {
      this.isAddressSelect = false
      let addr = ''
      address.forEach(e => {
        addr = addr + e.name
      })
      this.address.address = addr
    },
    // 保存地址
    saveAddress() {
      if (!this.address.address || !this.address.addressDetails) {
        return this.$toast.fail('请填写相应信息！')
      }
      this.form.shopAddress = this.address.address
      this.form.addressDetail = this.address.addressDetails
      this.topPopupIsShow = false
    },
    // 去选择营业时间
    toSeleceTime() {
      this.handlePageTurns()
      this.$router.push('/shoppingMange/user/shopManage/selectTime')
    },
    // 优惠界面
    toSettingDiscount() {
      this.handlePageTurns()
      this.$router.push('/shoppingMange/user/shopManage/discuntSetting')
    },
    // 获取坐标
    toSelectCoordinate() {},
    // 提交保存或店铺申请
    async formSubmit() {
      if (!this.form.shopAddress) {
        return this.$toast.fail('请先选择店铺地址哦~')
      }
      const data = {
        time: {
          startTime: '',
          endTime: ''
        },
        discounts: {
          requirePrice: '',
          discountPrice: '',
          time: ''
        },
        imgList: {},
        form: {}
      }
      if (
        this.shopLogoImg.length <= 0 ||
        this.shopQualificationImg.length <= 0
      ) {
        this.$toast.fail('请填写相应信息')
        return false
      }
      // 店铺申请，表单数据要更改
      // (1零食2美妆3数码4外卖5食堂)
      if (!this.isShop) {
        const shopManageId = this.shopManageId
        if (shopManageId !== 2) {
          this.form.shopCategoryId =
            shopManageId === 1
              ? 1
              : shopManageId === 2
              ? 4
              : shopManageId === 3
              ? 2
              : 3
        } else {
          this.form.shopCategoryId = this.takeOutType === 1 ? 4 : 5
        }
        this.form.siteApartment.id = this.snackShopValue
        delete this.form.tip
        delete this.form.businessTime
        delete this.form.discountValue
      }
      const res = await upData('/shop/add', this.form, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        sessionStorage.removeItem('addShopping')
        this.$store.commit('addShopping/UPDATE_DATA', data)
        this.$router.go(-1)
        return this.$toast.success('操作成功！')
      }
      return this.$toast.fail(res.msg)
    },
    // 页面跳转保存数据
    handlePageTurns() {
      this.$store.state.addShopping.form = this.form
      const imgList = {
        shopLogoImg: this.shopLogoImg,
        shopQualificationImg: this.shopQualificationImg
      }
      this.$store.commit('addShopping/IMG_LIST', imgList)
    }
  },
  // 销毁刷新事件
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  }
}
</script>
<style lang="less" scoped>
.uploaderImg {
  height: 5rem !important;
}
.popup {
  height: 22rem;
  padding: 1rem;
  box-sizing: border-box;
  .btn_warp {
    display: flex;
    justify-content: center;
    .btn {
      margin: 0;
      width: @buttonWidth;
      color: #997a00;
      height: 2.8rem;
      background-color: #ffe788;
      border: 1px solid #ffe788;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .area {
      width: 18rem;
      border-radius: 0.5rem;
    }
  }
  .title {
    font-weight: 900;
    text-align: center;
    height: 2rem;
  }
  .input {
    background-color: #eee;
    height: 2.5rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
}
.cell_item {
  margin: 0.8rem 0;
  .van-cell__title {
    font-size: 0.8rem;
  }
}
.textarea {
  height: 4rem;
}
.shop_qualification {
  margin: 1rem 0;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 0.8rem;
  padding: 1rem;
  .title {
    font-size: 0.9rem;
  }
  .item_warp {
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        margin: 0.8rem 0;
      }
    }
  }
}
.snack_shop_select {
  display: flex;
  background-color: #fff;
  padding: 0.2rem 0.8rem;
  box-sizing: border-box;
  align-items: center;
  .title {
    font-size: 0.85rem;
    width: 5rem;
  }
}
.btn_warp {
  display: flex;
  justify-content: center;
  .btn {
    margin: 0 0 4rem 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
// .coordinate {
//   box-sizing: border-box;
//   padding: 1rem;
//   .wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 50%;
//     background-color: #fff;
//     margin-top: 2rem;
//     border-radius: 0.5rem;
//   }
// }
// .van-overlay {
//   z-index: 2010;
// }
::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
</style>