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
        :tab-index="tabIndex"
        :cart-list="cartList"
        :dropdown-list="dropdownList"
        :dropdown-obj="dropdownObj"
        :tab-list="tabList"
        :sidebar-list="sidebarList"
        :shop-list="shopList"
        :evaluate-info-list="evaluateInfoList"
        :comment-list="commentList"
        :shopInfoObj="shopInfoObj"
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
      <!-- 促销公告遮蔽层 -->
      <van-overlay class="overlay" :show="noticeIsShow" @click="noticeIsShow = false">
        <notice-item />
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
      id: 0,
      shopId: 0,
      // 是否收藏
      isCollect: false,
      searchIsShow: false,
      overlayIsShow: false,
      noticeIsShow: true,
      // tab index
      tabIndex: Number(window.sessionStorage.getItem('tabActiveShop')),
      cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
        ? JSON.parse(window.sessionStorage.getItem('cartList'))
        : [],
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
      sidebarList: [],
      allShopList: [],
      // 商品信息列表
      shopList: [],
      // 评价信息列表
      evaluateInfoList: [
        {
          num: 0,
          text: '服务态度'
        },
        {
          num: 0,
          text: '产品品质'
        },
        {
          num: 0,
          text: '送达速度'
        }
      ],
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
    this.$route.query.shopId && (this.shopId = Number(this.$route.query.shopId))
    if (this.id === 0) {
      this.getExpressTip()
    } else {
      this.getShopInfo()
      this.getGoodsList()
    }
  },
  methods: {
    ...mapMutations({ addCart: 'shopInfo/SHOP_ITEM' }),
    // 获取零食铺须知内容
    async getExpressTip() {
      const res = await getData(
        '/shop/snack/tip/find',
        {
          siteId: 20
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return (this.snackShopTipObj = res.data)
      }
      return this.$toast.fail(res.msg)
    },
    // 获取店铺信息
    async getShopInfo() {
      const res = await getData(
        '/shop/snack/shop/info/find',
        { shopId: 23 },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        return false
      }
      return this.$toast.fail(res.msg)
    },
    // 获取商品信息
    async getGoodsList() {
      const res = await getData(
        '/shop/snack/info/find',
        { shopId: 23 },
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
          })
        })
        this.shopList = res.data
        this.allShopList = res.data
        return false
      }
      return this.$toast.fail(res.msg)
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
      console.log(addItem)

      // 判断商品是否存在
      const isFood = this.cartList.some(item => {
        return addItem.id === item.id
      })
      // 处理商品已经存在
      if (isFood) {
        const foodIndex = this.cartList.findIndex(item => {
          return addItem.id === item.id
        })
        this.cartList[foodIndex].num++
      } else {
        this.cartList.push(addItem)
      }
      this.addCart(this.cartList)
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 侧边栏改变
    sidebarChange(index) {
      const sidebarId = this.sidebarList[index].id
      if (index === 0) {
        this.shopList = this.allShopList
        return false
      }
      this.shopList = this.shopList.filter(e => {
        return e.id === sidebarId
      })
    },
    // 购物车提交
    cartSubmit() {
      this.$router.push('/shoppingOrderView')
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
      this.cartList = []
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
      const index = this.cartList.findIndex(i => {
        return item.id === i.id
      })
      this.cartList.splice(index, 1)
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 商品数量该表更新数据
    shopNumChange() {
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // 下拉选择
    dropdownChange(index) {
      this.dropdownObj = this.dropdownList[index]
    },
    // 展示搜索弹出层

    toSearch(searchIsShow) {
      this.searchIsShow = searchIsShow
    },
    // 处理拨打电话事件
    toPhone() {
      const phoneNum = this.shopInfoObj.shopPhone
      window.location.href = 'tel:' + phoneNum
    },
    toShare() {
      this.overlayIsShow = true
    },
    // 商品搜索事件
    clickShopSearch(shopSearchValue) {
      if (shopSearchValue !== '') {
        this.searchIsShow = false
      } else {
        this.$toast.fail('请输入搜索内容！')
      }
    },
    // 点击收藏店铺
    async toCollect() {
      const url = !this.isCollect ? '/shop/record/add' : '/shop/record/delete'
      const res = await upData(url, { shopId: 1 }, { showLoading: true })
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
      return this.$toast.fail(res.msg)
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
