<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="navBarTitle" is-arrow isBackUp />
    <van-form @submit="onFormSubmit">
      <van-field
        v-model="form.productName"
        label="名称"
        placeholder="请输入商品名称"
        required
        clearable
        :rules="[{ required: true}]"
      />
      <van-field
        v-model.number="form.usageTime"
        label="使用时间"
        type="number"
        placeholder="请输入商品使用时间(天)"
        required
        clearable
        :rules="[{ required: true}]"
      />
      <van-field class="uploaderImg" label="封面图片" required>
        <template #input>
          <van-uploader
            v-model="uploaderImg"
            :max-count="1"
            :max-size="2048 * 1024"
            @oversize="handleImgLarge"
            :after-read="uploadingLogo"
            @delete="deleteLogoImg"
          />
        </template>
      </van-field>
      <van-field
        v-model.number="form.sellPrice"
        label="售价"
        type="number"
        required
        placeholder="商品售卖价格"
        clearable
        :rules="[{ required: true}]"
      />
      <van-field
        v-model.number="form.postage"
        type="number"
        label="邮费"
        placeholder="运送邮费,不填为0"
        clearable
      />
      <van-field class="swiperImg" type="textarea" label="轮播图片(最多10张，不传则使用封面图片)">
        <template #input>
          <van-uploader
            v-model="swiperImg"
            multiple
            :max-count="9"
            :max-size="2048 * 1024"
            @oversize="handleImgLarge"
            :after-read="uploadingShoppingPic"
            @delete="deleteSwiperImg"
          />
        </template>
      </van-field>
      <van-field
        class="label"
        v-model="form.productDesc"
        rows="2"
        autosize
        type="textarea"
        clearable
        placeholder="商品的简单描述，特色、推荐语等，建议20字以内"
      />
      <van-cell class="goods_info" title="商品详情" is-link value="编辑详情" @click="toGoodsInfoEditor" />
      <van-cell>
        <template #title>
          <div class="title">
            商品状态
            <div v-if="goodsStatusChecked" class="text">(上架)</div>
            <div v-else class="text">(下架)</div>
          </div>
        </template>
        <template #default>
          <van-switch v-model="goodsStatusChecked" size="1.5rem" />
        </template>
      </van-cell>
      <div class="tip">
        发布即表示你已阅读并同意
        <span>《二手商品协议》</span>
      </div>
      <div class="btn_warp">
        <van-button v-if="type === 'update'" class="btn" round native-type="onFormSubmit">确认修改</van-button>
        <van-button v-else class="btn" round native-type="onFormSubmit">发布商品</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { upData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      type: '',
      navBarTitle: '新增二手商品',
      goodsStatusChecked: true,
      // 封面地址图片
      uploaderImg: [],
      swiperImg: [],
      form: {
        productName: '商品名称',
        usageTime: 10,
        postage: '',
        sellPrice: 100,
        productDesc: '商品描述',
        logoAddress: '',
        productDetailAddress: '',
        state: 0,
        secondhandProductPics: []
      }
    }
  },
  computed: {
    getProductDetailAddress() {
      return this.$store.getters.productDetailAddress
    },
    // 获取表单数据，因为页面跳转表单数据为清空
    getFormData() {
      return this.$store.getters.secondAddGoodsForm
    },
    getLogoImg() {
      return this.$store.getters.logoImg
    },
    getSwiperImg() {
      return this.$store.getters.swiperImg
    }
  },
  created() {
    this.handlePageRefresh()
    this.initView()
  },
  methods: {
    // 初始化界面数据
    initView() {
      this.type = this.$route.query.type
      this.uploaderImg = this.getLogoImg
      this.swiperImg = this.getSwiperImg
      if (this.type === 'update') {
        this.navBarTitle = '修改商品'
      }
      if (Object.keys(this.getFormData).length > 0) {
        this.form = this.getFormData
      }
      this.form.productDetailAddress = this.getProductDetailAddress
      // console.log(this.uploaderImg)
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过2M')
    },
    // 处理页面刷新
    handlePageRefresh() {
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem(
          'secondaryMarketAddGoods',
          JSON.stringify(this.$store.state.secondaryMarket)
        )
      })

      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('secondaryMarketAddGoods')) {
        this.$store.commit(
          'secondaryMarket/UPDATE_DATA',
          Object.assign(
            {},
            this.$store.state.secondaryMarket,
            JSON.parse(sessionStorage.getItem('secondaryMarketAddGoods'))
          )
        )
      }
    },
    // 商品logo图片
    async uploadingLogo(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('productImg', file.file)
      const res = await upLogo('/secondhand/product/img', formData)
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
    // 处理上传轮播图片
    async uploadingShoppingPic(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('productImg', file.file)
      const res = await upLogo('/secondhand/product/img', formData)
      console.log(res)
      if (res.code === '0') {
        this.form.secondhandProductPics.push({ picAddress: res.data.filename })
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
    // 处理删除商品图片
    deleteLogoImg() {
      this.uploaderImg = []
      this.form.logoAddress = ''
    },
    // 发布商品
    async onFormSubmit() {
      console.log(this.form)
      const data = {
        productDetailAddress: '',
        logoImg: [],
        swiperImg: [],
        addGoodsForm: {}
      }
      this.form.postage = this.form.postage ? this.form.postage : 0
      this.form.state = this.goodsStatusChecked ? 1 : 0
      const res = await upData('/secondhand/product/add', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('发布成功！')
        // 删除session
        sessionStorage.removeItem('secondaryMarketAddGoods')
        // 重置vuex里的数据
        this.$store.commit('secondaryMarket/UPDATE_DATA', data)
        this.$router.push('/secondaryMarket')
      }
      this.$handleCode.handleCode(res)
    },
    toGoodsInfoEditor() {
      this.$store.state.secondaryMarket.logoImg = this.uploaderImg
      this.$store.state.secondaryMarket.swiperImg = this.swiperImg
      this.$store.state.secondaryMarket.addGoodsForm = this.form
      this.$router.push('/shoppingMange/addGoods/goodsInfoEditor?id=1')
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  }
}
</script>
<style lang="less" scoped>
.uploaderImg {
  height: 6rem !important;
}
.label {
  height: 6rem;
}
.van-cell__value {
  span {
    color: #000;
  }
}
.goods_info {
  margin-top: 0.5rem;
}
.title {
  display: flex;
  .text {
    color: @themeColor;
    font-size: 1rem;
  }
}
.swiperImg {
  height: 15rem !important;
}
.tip {
  width: 100%;
  height: 2rem;
  font-size: 0.8rem;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: @themeColor;
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
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
</style>