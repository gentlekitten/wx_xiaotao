<template>
  <div class="home">
    <template v-if="id === 0">
      <snack-shop-tip :snackShopTipObj="snackShopTipObj" />
    </template>
    <template v-else>
      <!-- 顶部导航 -->
      <nav-bar @toSearch="toSearch" @toPhone="toPhone" @toShare="toShare" />
      <!-- 顶部商店信息 -->
      <top-shop-info :isCollect="isCollect" :shopInfoObj="shopInfoObj" @toCollect="toCollect" />
      <!-- tab栏信息 -->
      <tabs-index
        :shop-id="id"
        :tab-index="tabIndex"
        :cart-list="cartList"
        :dropdown-list="dropdownList"
        :dropdown-obj="dropdownObj"
        :tab-list="tabList"
        :sidebar-list="sidebarList"
        :shop-list="shopList"
        :evaluate-info-list="evaluateInfoObj"
        :comment-list="commentList"
        :shop-info-obj="shopInfoObj"
        @sidebarChange="sidebarChange"
        @handleAdd="handleAdd"
        @cartSubmit="cartSubmit"
        @clickTab="clickTab"
        @clickCommnetImg="clickCommnetImg"
        @clearCart="clearCart"
        @clickImg="clickImg"
        @deleteFood="deleteFood"
        @shopNumChange="shopNumChange"
        @dropdownChange="dropdownChange"
      />
      <!-- 搜索弹出层 -->
      <van-popup class="popup" v-model="searchIsShow" closeable round position="top">
        <search-popup @clickShopSearch="clickShopSearch" />
      </van-popup>
      <!-- 促销公告遮蔽层或店铺不营业遮蔽层提示 -->
      <van-overlay class="overlay" :show="noticeIsShow" @click="noticeIsShow = false">
        <notice-item :shop-info-obj="shopInfoObj" />
      </van-overlay>
      <!-- 分享遮蔽层 -->
      <van-overlay class="overlay" :show="overlayIsShow" @click="overlayIsShow = false">
        <overlay-item />
      </van-overlay>
    </template>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { ImagePreview } from 'vant'

import { getData, upData } from '@/api/api.js'

import SnackShopTip from '@/components/snackShop/SnackShopTip.vue'
import NavBar from '@/components/snackShop/NavBar.vue'
import SearchPopup from '@/components/snackShop/SearchPopup.vue'
import OverlayItem from '@/components/snackShop/OverlayItem.vue'
import NoticeItem from '@/components/snackShop/NoticeItem.vue'
import TopShopInfo from '@/components/snackShop/TopShopInfo.vue'
import TabsIndex from '@/components/snackShop/tabs/TabsIndex.vue'

export default {
  components: {
    SnackShopTip,
    NavBar,
    TopShopInfo,
    TabsIndex,
    SearchPopup,
    OverlayItem,
    NoticeItem
  },
  data() {
    return {
      // 店铺id
      id: 0,
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      // 是否收藏
      isCollect: false,
      searchIsShow: false,
      overlayIsShow: false,
      // 促销遮蔽层是否显示
      noticeIsShow: false,
      // tab index
      tabIndex: Number(window.sessionStorage.getItem('tabActiveShop')),
      cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
        ? JSON.parse(window.sessionStorage.getItem('cartList'))
        : {},
      // cartList: this.$store.getters.shopItem,
      dropdownList: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 }
      ],
      // 下拉选择框选择的对象
      dropdownObj: { text: '全部商品', value: 0 },
      tabList: [
        {
          title: '商品'
        },
        {
          title: '评价'
        },
        {
          title: '商家'
        }
      ],
      // 侧边栏列表
      sidebarList: [],
      // 保存的一份商品列表
      allShopList: [],
      // 搜索之前的商品列表
      searchShopListBefore: [],
      // 商品信息列表
      shopList: [],
      // 评价信息列表
      evaluateInfoObj: [],
      // 用户评价列表
      commentList: [
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 3,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg'
          ],
          comment_video: ['https://img.yzcdn.cn/vant/apple-1.jpg']
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 4,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: ['https://img.yzcdn.cn/vant/apple-1.jpg'],
          comment_video: []
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 1,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [],
          comment_video: []
        }
      ],
      // 零食铺须知内容
      snackShopTipObj: {
        snackShopTip: ''
      },
      // 店铺信息
      shopInfoObj: {}
    }
  },
  computed: {},
  created() {
    this.$route.query.id && (this.id = Number(this.$route.query.id))
    if (this.id === 0) {
      this.getExpressTip()
    } else {
      this.getShopInfo()
      this.getGoodsList()
    }
  },
  methods: {
    // 获取零食铺须知内容
    async getExpressTip() {
      if (!this.siteId) {
        return false
      }
      const res = await getData(
        '/shop/snack/tip/find',
        {},
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return (this.snackShopTipObj = res.data)
      }
      this.$handleCode.handleCode(res)
    },
    // 获取店铺信息
    async getShopInfo() {
      const res = await getData(
        '/site/snack/shop/info',
        { shopId: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        // shopState!== 1 店铺不营业，这里店铺不营业或有促销公告都展示遮蔽层，然后在组建中再判断
        if (
          this.shopInfoObj.salesPromotion ||
          this.shopInfoObj.shopState !== 1
        ) {
          this.noticeIsShow = true
        }
        this.isCollect = this.shopInfoObj.hasRecord === 0 ? false : true
        this.evaluateInfoObj = this.shopInfoObj.shopScore
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取商品信息
    async getGoodsList() {
      const res = await getData(
        '/shop/snack/info/find',
        { shopId: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        res.data.forEach(e => {
          this.sidebarList.push({
            title: e.categoryName,
            id: e.id,
            sort: e.sort
          })
        })
        this.sidebarList.sort(this.handleSort)
        this.sidebarList.unshift({
          id: 0,
          title: '全部分类',
          sort: 99999999999
        })
        res.data.forEach(e => {
          e.productInfos.sort(this.handleSort)
          e.productInfos.forEach(c => {
            c.num = 1
            c.isCheck = true
          })
        })
        this.shopList = res.data
        this.allShopList = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    async getCommentList() {
      const res = await getData('')
    },
    // 处理侧边栏排序和商品排序
    handleSort(a, b) {
      return b.sort - a.sort
    },
    // 处理添加商品
    handleAdd(addItem) {
      // addItem.d是productInfoSpecifications的id
      console.log(addItem)
      let addObj = {}
      let isFood = false
      // 判断cartList对象是否存在
      if (!this.cartList.id) {
        this.cartList = {
          id: this.shopInfoObj.shopId,
          shopOrders: this.shopInfoObj.shopOrder,
          shopPic: this.shopInfoObj.shopPic,
          shopName: this.shopInfoObj.shopName,
          shopList: []
        }
      }
      // 判断添加的对象是否有规格，判断商品存在，不仅要判断商品id是否一样如果规格存在的话还要判断规格id是否相同
      if (addItem.d) {
        this.cartList.shopList.forEach(e => {
          if (e.id === addItem.id) {
            isFood = e.productInfoSpecifications.some(item => {
              return addItem.d === item.id
            })
            if (isFood) {
              return
            }
          }
        })
      } else {
        isFood = this.cartList.shopList.some(item => {
          return addItem.id === item.id
        })
      }
      // 处理商品已经存在
      if (isFood) {
        let foodIndex = 0
        if (addItem.d) {
          foodIndex = this.cartList.shopList.findIndex(item => {
            return item.productInfoSpecifications[0].id === addItem.d
          })
        } else {
          foodIndex = this.cartList.shopList.findIndex(item => {
            return addItem.id === item.id
          })
        }
        this.cartList.shopList[foodIndex].num++
      } else {
        addObj = this._.cloneDeep(addItem)
        if (addItem.d) {
          // 处理规格 d是选中的规格的id
          let productInfoSpecifications = []
          productInfoSpecifications = addObj.productInfoSpecifications.filter(
            e => {
              return e.id === addItem.d
            }
          )
          addObj.productInfoSpecifications = productInfoSpecifications
        }
        this.cartList.shopList.push(addObj)
      }
      // this.addCart(this.cartList)
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 侧边栏改变
    sidebarChange(index) {
      this.shopList = this.allShopList
      const sidebarId = this.sidebarList[index].id
      // index === 0 是全部分类
      if (index === 0) {
        return false
      }
      this.shopList = this.shopList.filter(e => {
        return e.id === sidebarId
      })
    },
    // 购物车提交
    cartSubmit(foodTotalPrice) {
      this.cartList.totalPrice = foodTotalPrice
      window.sessionStorage.setItem(
        'shopCartList',
        JSON.stringify(this.cartList)
      )
      // form 0外卖 1 商城
      this.$router.push('/shoppingOrderView?form=0')
    },
    clickTab(index) {
      this.tabIndex = index
    },
    // 处理点击评论区图片
    clickCommnetImg(itemImgs, indexs) {
      ImagePreview({
        images: itemImgs,
        startPosition: indexs
      })
    },
    // 清空购物车
    clearCart() {
      this.cartList = {}
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 处理点击商家执照图片
    clickImg(imgUrl, indexs) {
      ImagePreview({
        images: imgUrl,
        startPosition: indexs
      })
    },
    // 删除单个商品
    deleteFood(item) {
      // 删除商品的索引
      let foodIndex = 0
      // 判断有无规格
      if (item.productInfoSpecifications.length > 0) {
        foodIndex = this.cartList.shopList.findIndex(e => {
          return (
            e.productInfoSpecifications[0].id ===
            item.productInfoSpecifications[0].id
          )
        })
      } else {
        foodIndex = this.cartList.shopList.findIndex(i => {
          return item.id === i.id
        })
      }
      this.cartList.shopList.splice(foodIndex, 1)
      if (this.cartList.shopList.length <= 0) {
        this.cartList = {}
      }
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 商品数量该表更新数据
    shopNumChange() {
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 下拉选择
    // dropdownChange(index) {
    //   this.dropdownObj = this.dropdownList[index]
    // },
    // 展示搜索弹出层
    toSearch(searchIsShow) {
      this.searchIsShow = searchIsShow
    },
    // 处理拨打电话事件
    toPhone() {
      const phoneNum = this.shopInfoObj.shopPhone
      window.location.href = 'tel:' + phoneNum
    },
    // 展示分享遮蔽层
    toShare() {
      this.overlayIsShow = true
    },
    // 商品搜索事件
    clickShopSearch(shopSearchValue) {
      if (shopSearchValue !== '') {
        this.searchShopListBefore = this._.cloneDeep(this.shopList)
        this.shopList = this.searchShopListBefore
        this.shopList.forEach(e => {
          e.productInfos = e.productInfos.filter(c => {
            return c.productName.indexOf(shopSearchValue) !== -1
          })
        })
        this.searchIsShow = false
      } else {
        this.$toast.fail('请输入搜索内容！')
      }
    },
    // 点击收藏店铺
    async toCollect() {
      if (!this.id) {
        return false
      }
      const url = !this.isCollect ? '/shop/record/add' : '/shop/record/delete'
      const res = await upData(url, { shopId: this.id }, { showLoading: true })
      console.log(res)
      if (res.code === '0') {
        this.isCollect = !this.isCollect
        let message = this.isCollect ? '收藏成功！' : '已取消收藏！'
        this.$toast({
          message,
          position: 'bottom'
        })
        return false
      }
      this.$handleCode.handleCode(res)
    }
  }
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
.overlay {
  z-index: 100;
}
</style>
