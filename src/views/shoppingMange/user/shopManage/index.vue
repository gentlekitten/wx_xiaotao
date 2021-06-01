<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="navBarTitle" is-arrow isBackUp />
    <van-form @submit="formSubmit">
      <van-field v-if="!isShop" class="uploaderImg" label="店铺头像" required>
        <template #input>
          <van-uploader
            v-model="shopLogoImg"
            :max-count="1"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
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
        v-model="form.salesPromotion"
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
      <div v-if="!isShop" class="shop_qualification">
        <div class="title">店铺资质</div>
        <div class="item_warp">
          <div class="item">
            <van-field class="uploaderImg" label="营业执照" required>
              <template #input>
                <van-uploader
                  v-model="shopQualificationImg"
                  :after-read="upBusinessLicense"
                  :max-size="5120 * 1024"
                  @oversize="handleImgLarge"
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
      <van-field class="input" v-model="form.shopAddress" required placeholder="地址" readonly />
      <van-field class="input" v-model="form.addressDetail" required placeholder="详细地址" clearable />
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
            title="选择地址"
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
import { upData, upLogo, getData } from '@/api/api.js'
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
      shopId: Number(window.sessionStorage.getItem('shopId')),
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
      snackShopValue: 0,
      snackShopList: [],
      // 外卖类型
      takeOutType: 1,
      form: {
        shopName: '',
        shopPhone: '',
        // 店铺地址
        shopAddress: '',
        // 店铺详细地址
        addressDetail: '',
        salesPromotion: '',
        businessInfo: '',
        introduce: '',
        shopPic: '',
        businessLicense: '',
        // 店铺类型
        shopCategoryId: '',
        // 所属楼栋
        siteApartment: {}
      },
      // 营业时间对象
      businessTime: {
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: ''
      }
    }
  },
  computed: {
    getImgList() {
      return this.$store.getters.addShoppingList
    },
    getFormData() {
      return this.$store.getters.form
    },
    // 格式化营业时间
    getBusinessTimeValue() {
      if (this.businessTime.startTime) {
        return this.businessTime.startTime + '-' + this.businessTime.endTime
      }
      return ''
    }
    // 格式化优惠
    // getDisountsValue() {
    //   if (this.discountValue.discountPrice) {
    //     return (
    //       '满' +
    //       this.discountValue.requirePrice +
    //       '减' +
    //       this.discountValue.discountPrice +
    //       '-' +
    //       this.discountValue.time +
    //       '天'
    //     )
    //   }
    //   return ''
    // }
  },
  created() {
    this.initViewData()
    this.getSnackShopList()
    this.getShopManageInfo()
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
      this.shopLogoImg = this.getImgList.shopLogoImg
      this.shopQualificationImg = this.getImgList.shopQualificationImg
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
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
    // 获取店铺管理信息
    async getShopManageInfo() {
      // 判断是否有无店铺
      if (!this.isShop) {
        return false
      }
      const res = await getData(
        '/shop/info/manger/find',
        { shopId: this.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        // 处理数据
        this.form.shopName = res.data.shopName
        this.form.shopPhone = res.data.shopPhone
        this.form.salesPromotion = res.data.salesPromotion
        this.form.businessInfo = res.data.businessInfo
        this.form.introduce = res.data.introduce
        this.businessTime.startTime = res.data.startTime
        this.businessTime.endTime = res.data.endTime
        this.form.shopAddress = res.data.shopAddress
        this.form.addressDetail = res.data.addressDetail
        // 4周边外卖 5 食堂
        this.takeOutType = res.data.shopCategoryId === 4 ? 1 : 2
        this.snackShopList.push({
          text: res.data.apartmentName,
          value: res.data.siteApartmentId
        })
        this.snackShopValue = res.data.siteApartmentId
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取零食铺楼栋
    async getSnackShopList() {
      let data = {}
      // 判断是否有无店铺
      if (this.isShop) {
        // 因为申请店铺和店铺管理是共用这个接口，所以要改一下上传的参数
        data.shopId = this.shopId
      }
      const res = await getData('/shop/snack/apart/free/find', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        res.data.forEach(e => {
          this.snackShopList.push({ text: e.apartmentName, value: e.id })
        })
        // 判断是否有无店铺
        if (!this.isShop) {
          this.snackShopValue =
            Object.keys(this.snackShopList).length > 0
              ? this.snackShopList[0].value
              : 0
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 删除图片
    deleteImg(type) {
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
      this.$handleCode.handleCode(res)
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
      this.$handleCode.handleCode(res)
    },
    // 地址选择框确认
    areaConfirm(address) {
      this.isAddressSelect = false
      let addr = ''
      address.forEach(e => {
        addr = addr + e.name
      })
      this.form.shopAddress = addr
    },
    // 保存地址
    saveAddress() {
      if (!this.form.shopAddress || !this.form.addressDetail) {
        return this.$toast.fail('请填写相应信息！')
      }
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
      // 店铺申请，表单数据要更改
      // (1零食2美妆3数码4外卖5食堂)
      let res = null
      this.form.siteApartment.id = this.snackShopValue
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
      // 处理店铺类型
      const shopManageId = this.shopManageId
      if (shopManageId !== 2) {
        // this.form.shopCategoryId = 5
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
      if (!this.isShop) {
        if (
          this.shopLogoImg.length <= 0 ||
          this.shopQualificationImg.length <= 0
        ) {
          this.$toast.fail('请填写相应信息')
          return false
        }
        this.form.siteId = JSON.parse(window.sessionStorage.getItem('siteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
          : 0
        res = await upData('/shop/add', this.form, { showLoading: true })
      } else {
        this.form.id = this.shopId
        // 存在店铺，修改店铺信息
        res = await upData('/shop/info/update', this.form, {
          showLoading: true
        })
      }
      console.log(res)
      if (res.code === '0') {
        sessionStorage.removeItem('addShopping')
        this.$store.commit('addShopping/UPDATE_DATA', data)
        this.$router.go(-1)
        return this.$toast.success('操作成功！')
      }
      this.$handleCode.handleCode(res)
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
  margin-top: 1rem;
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
  margin-top: 1rem;
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