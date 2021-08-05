<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar v-if="type === 'add'" title="新增商品" is-arrow backTo="/shoppingMange/goods" />
    <nav-bar v-else title="更改商品" is-arrow backTo="/shoppingMange/goods" />
    <div class="tip">
      如要更改
      <span>图片和商品详情</span>内容，请删除商品再添加
    </div>
    <van-form ref="form" @submit="onFormSubmit">
      <van-field
        v-model.number="form.categoryId"
        label="分类"
        readonly
        required
        right-icon="arrow"
        @click="toClassifySetting"
      />
      <van-field
        v-model="form.productName"
        label="名称"
        placeholder="请输入商品名称"
        required
        clearable
        :rules="[{ required: true}]"
      />
      <van-field v-if="type === 'add'" class="uploaderImg" label="封面图片" required>
        <template #input>
          <van-uploader
            v-model="shopImg"
            :max-count="1"
            :after-read="upLogo"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
            @delete="deleteLogoImg"
          />
        </template>
      </van-field>
      <van-field
        v-model.number="form.originalPrice"
        type="number"
        label="原价"
        placeholder="可设置比售价高，以体现本店优惠"
        clearable
      />
      <van-field
        v-model.number="form.sellPrice"
        label="售价"
        type="number"
        required
        placeholder="本店实际售卖价格"
        clearable
        :rules="[{ required: true}]"
      />
      <van-field
        v-if="shopManageId !== 1 && shopManageId !== 2"
        v-model.number="form.deliveryFee"
        type="number"
        label="邮费"
        placeholder="运送邮费,不填为0"
        clearable
      />
      <div class="set_type" @click="toSettingGoodsType">
        设规格/属性
        <span>(比如设置鞋子的码数和颜色等)</span>
      </div>
      <!-- productDesc -->
      <van-field
        class="label"
        v-model="form.productDesc"
        rows="2"
        autosize
        type="textarea"
        clearable
        placeholder="商品的简单描述，特色、推荐语等，建议20字以内"
      />
      <van-cell
        v-if="type === 'add'"
        class="goods_info"
        title="商品详情"
        is-link
        value="编辑详情"
        @click="toGoodsInfoEditor"
      />
      <van-field
        v-if="type === 'add'"
        class="swiperImg"
        type="textarea"
        label="轮播图片(最多10张，不传则使用封面图片)"
      >
        <template #input>
          <van-uploader
            v-model="swiperImg"
            :max-count="9"
            :after-read="upSwiperImg"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
            @delete="deleteSwiperImg"
          />
        </template>
      </van-field>
      <div class="more_setting" @click="moreSettingIsShow = !moreSettingIsShow">
        更多高级设置
        <i class="icon iconfont icon-ai36" />
      </div>
      <div v-show="moreSettingIsShow" class="more_warp animated fadeInDown">
        <van-cell
          class="goods_info"
          title="库存设置"
          is-link
          :value="inventoryValue"
          @click="toGoodsInventorySetting"
        />
        <van-field v-model.number="form.sort" label="展示设置" placeholder="数值越大越靠前" clearable />
        <van-field
          v-model.number="form.restriction"
          label="限购数量"
          placeholder="每单限购数，0为不限购"
          clearable
        />
        <!-- 上架或下架 -->
        <van-cell>
          <template #title>
            <div class="title">
              商品状态
              <div v-if="form.state" class="text">(上架)</div>
              <div v-else class="text">(下架)</div>
            </div>
          </template>
          <template #default>
            <van-switch v-model="form.state" size="1.5rem" />
          </template>
        </van-cell>
        <!-- 是否支持7天退款 -->
        <van-cell v-if="shopManageId !== 1 || shopManageId !== 2">
          <template #title>
            <div class="title">
              是否支持七天退款
              <div v-if="form.sRefund" class="text">(支持)</div>
              <div v-else class="text">(不支持)</div>
            </div>
          </template>
          <template #default>
            <van-switch v-model="form.sRefund" size="1.5rem" />
          </template>
        </van-cell>
      </div>
      <div class="btn_warp">
        <van-button class="btn" round native-type="onFormSubmit">提交保存</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { upData, upLogo, getData } from '@/api/api.js'
import axios from 'axios'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      // 商品id
      productId: '',
      // 店铺类型
      shopManageId: Number(window.sessionStorage.getItem('shopManageId'))
        ? Number(window.sessionStorage.getItem('shopManageId'))
        : 1,
      // 是编辑还是添加
      type: 'add',
      moreSettingIsShow: false,
      // 库存值
      inventoryValue: '不限库存',
      shopImg: [],
      swiperImg: [],
      form: {
        shopId: window.sessionStorage.getItem('shopId'),
        categoryId: null,
        productName: '',
        originalPrice: '',
        sellPrice: '',
        productDesc: '',
        sort: 0,
        restriction: 0,
        deliveryFee: '',
        state: true,
        sRefund: true,
        inventory: 0,
        logoAddress: '',
        detailUrl: '',
        productInfoPicList: [],
        productInventory: {},
        productInfoProperties: [],
        productInfoSpecifications: []
      }
    }
  },
  computed: {
    getCategoryId() {
      return this.$store.getters.categoryId
    },
    getInventory() {
      return this.$store.getters.inventory
    },
    getDetailUrl() {
      return this.$store.getters.detailUrl
    },
    // 获取表单数据，因为页面跳转表单数据为清空
    getFormData() {
      return this.$store.getters.addGoodsForm
    },
    getImgList() {
      return this.$store.getters.imgList
    },
    getGoodsAttribute() {
      return this.$store.getters.productInfoProperties
    },
    getGoodsSpecification() {
      return this.$store.getters.productInfoSpecifications
    }
  },
  created() {
    this.handlePageRefresh()
    this.type = this.$route.query.type ? this.$route.query.type : 'add'
    this.productId = this.$route.query.id ? this.$route.query.id : ''
    this.initView()
    this.getGoodsInfo()
  },
  methods: {
    // 初始化页面数据
    initView() {
      if (this.type === 'edit') {
        return false
      }
      if (Object.keys(this.getFormData).length > 0) {
        this.form = this.getFormData
      }
      this.form.categoryId = this.getCategoryId
      this.form.inventory = this.getInventory
      this.inventoryValue =
        this.form.inventory > 0
          ? '限库存(' + this.form.inventory + ')件'
          : '不限库存'
      this.form.detailUrl = this.getDetailUrl
      this.form.productInfoProperties = this.getGoodsAttribute
      this.form.productInfoSpecifications = this.getGoodsSpecification
      this.shopImg = this.getImgList.logoImg
      this.swiperImg = this.getImgList.swiperImg
    },
    // 处理页面刷新
    handlePageRefresh() {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem(
          'addGoods',
          JSON.stringify(this.$store.state.addGoods)
        )
      })

      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('addGoods')) {
        this.$store.commit(
          'addGoods/UPDATE_DATA',
          Object.assign(
            {},
            this.$store.state.addGoods,
            JSON.parse(sessionStorage.getItem('addGoods'))
          )
        )
      }
    },
    // 获取商品信息
    async getGoodsInfo() {
      if (this.type === 'add') {
        return false
      }
      const res = await getData(
        '/product/info/detail/find',
        { productId: this.productId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        res.data.state = res.data.state === 1 ? true : false
        res.data.sRefund = res.data.sRefund === 1 ? true : false
        res.data.productInfoPicList = res.data.productInfoPicList
          ? res.data.productInfoPicList
          : []
        res.data.productInfoProperties = res.data.productInfoProperties
          ? res.data.productInfoProperties
          : []
        res.data.productInfoSpecifications = res.data.productInfoSpecifications
          ? res.data.productInfoSpecifications
          : []
        this.form = _.cloneDeep(res.data)
        // 改变库存设置的字
        this.inventoryValue =
          this.form.inventory === 1
            ? `限${this.form.productInventory.productNumber}份`
            : '不限库存'
        this.form.productInventory = this.form.productInventory
          ? this.form.productInventory
          : {}
        if (Object.keys(this.getFormData).length > 0) {
          this.form = this.getFormData
        }
        if (this.getCategoryId || this.getCategoryId === 0) {
          this.form.categoryId = this.getCategoryId
        }
        if (this.getInventory || this.getInventory === 0) {
          this.form.inventory = this.getInventory
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    // 商品图片
    async upLogo(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('productImg', file.file)
      const res = await upLogo('/product/img', formData)
      console.log(res)
      if (res.code === '0') {
        this.form.logoAddress = res.data.filename
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 商品轮播图片
    async upSwiperImg(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('productImg', file.file)
      const res = await upLogo('/product/img', formData)
      console.log(res)
      if (res.code === '0') {
        this.form.productInfoPicList.push({ picAddress: res.data.filename })
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 处理删除轮播图片
    deleteSwiperImg(file, detail) {
      this.swiperImg.splice(detail.index, 1)
      this.form.productInfoPicList.splice(detail.index, 1)
    },
    // 处理删除logo图片
    deleteLogoImg() {
      this.shopImg = []
      this.form.logoAddress = ''
    },
    //
    toSettingGoodsType() {
      this.handleSaveFormData()
      this.$router.push(
        `/shoppingMange/addGoods/settingGoodsType?type=${this.type}&id=${this.productId}`
      )
    },
    toClassifySetting() {
      this.handleSaveFormData()
      this.$router.push('/shoppingMange/addGoods/goodsClassifySetting')
    },
    async onFormSubmit() {
      // 添加还是修改
      const url = this.type === 'add' ? '/product/add' : '/product/update'
      // 提交后重置vuex数据模板
      const data = {
        categoryId: null,
        inventory: 0,
        detailUrl: '',
        addGoodsForm: {},
        imgList: {},
        productInfoSpecifications: [],
        productInfoProperties: []
      }
      if (this.type === 'edit') {
        if (this.form.categoryId === '') {
          this.$toast.fail('请选择分类')
          return false
        }
      } else {
        if (this.form.categoryId === '' || this.shopImg.length <= 0) {
          this.$toast.fail('请填写相应内容')
          return false
        }
      }
      // 处理要提交的数据
      delete this.form.createTime
      delete this.form.updateTime
      delete this.form.record
      this.form.productInventory.productNumber = this.form.inventory
      this.form.inventory = this.form.inventory > 0 ? 1 : 0
      this.form.state = this.form.state ? 1 : 0
      this.form.sRefund = this.form.sRefund ? 1 : 0
      this.form.sort = this.form.sort ? this.form.sort : 0
      this.form.deliveryFee = this.form.deliveryFee ? this.form.deliveryFee : 0
      this.form.restriction = this.form.restriction ? this.form.restriction : 0
      const res = await upData(url, this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$router.push('/shoppingMange/goods')
        sessionStorage.removeItem('addGoods')
        // 重置vuex里的数据
        this.$store.commit('addGoods/UPDATE_DATA', data)
        return this.$toast.success('保存成功！')
      }
      this.$handleCode.handleCode(res)
    },
    toGoodsInfoEditor() {
      // 页面跳转，保存表单信息
      this.handleSaveFormData()
      this.$router.push('/shoppingMange/addGoods/goodsInfoEditor?id=0')
    },
    toGoodsInventorySetting() {
      this.handleSaveFormData()
      this.$router.push(
        `/shoppingMange/addGoods/goodsInventorySetting?productInventory=${JSON.stringify(
          this.form.productInventory
        )}`
      )
    },
    // 处理页面跳转保存表单数据
    handleSaveFormData() {
      this.$store.state.addGoods.addGoodsForm = this.form
      this.$store.commit('addGoods/IMG_LIST', {
        logoImg: this.shopImg,
        swiperImg: this.swiperImg
      })
    }
  },
  // 页面销毁刷新事件
  beforeDestroy() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  }
}
</script>
<style lang="less" scoped>
.tip {
  font-size: 0.8rem;
  color: #ccc;
  margin: 1rem 0;
  text-align: center;
  span {
    color: cadetblue;
  }
}
.uploaderImg {
  height: 6rem !important;
}
.swiperImg {
  height: 15rem !important;
}
.set_type {
  margin: 1rem;
  color: cadetblue;
  font-size: 0.95rem;
  span {
    color: #999;
    font-size: 0.8rem;
  }
}
.label {
  height: 6rem;
}
.goods_info {
  margin-top: 0.5rem;
}
.more_setting {
  padding: 1rem;
  text-align: center;
  color: cadetblue;
  .icon {
    font-size: 1.2rem;
  }
}
.title {
  display: flex;
  .text {
    color: @themeColor;
    font-size: 1rem;
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
.van-cell__value {
  span {
    color: #000;
  }
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
::v-deep .van-cell__title {
  font-size: 0.8rem;
}
::v-deep .van-cell__value {
  span {
    font-size: 0.8rem;
  }
}
</style>
