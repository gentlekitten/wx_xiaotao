<template>
  <div class="home">
    <!-- 顶部导航 -->
    <nav-bar @toSearch="toSearch" @toPhone="toPhone" @toShare="toShare" />
    <!-- 顶部商店信息 -->
    <top-shop-info />
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
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <overlay-item />
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import NavBar from '@/components/snackShop/NavBar.vue'
import TopShopInfo from '@/components/snackShop/TopShopInfo.vue'
import TabsIndex from '@/components/snackShop/tabs/TabsIndex.vue'
import OverlayItem from '@/components/snackShop/OverlayItem.vue'
import NoticeItem from '@/components/snackShop/NoticeItem.vue'
import SearchPopup from '@/components/snackShop/SearchPopup.vue'

export default {
  components: {
    NavBar,
    TopShopInfo,
    TabsIndex,
    OverlayItem,
    SearchPopup,
    NoticeItem
  },
  data() {
    return {
      id: 0,
      searchIsShow: false,
      overlayIsShow: false,
      noticeIsShow: true,
      // tab index
      tabIndex: Number(window.sessionStorage.getItem('tabActiveShop')),
      cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
        ? JSON.parse(window.sessionStorage.getItem('cartList'))
        : [],
      dropdownList: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
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
      sidebarList: [
        {
          title: '全部分类'
        },
        {
          title: '盖饭'
        },
        {
          title: '炒饭'
        },
        {
          title: '热卖'
        },
        {
          title: '小吃'
        },
        {
          title: '饮料'
        },
        {
          title: '香烟类'
        },
        {
          title: '香烟类'
        },
        {
          title: '全部分类'
        },
        {
          title: '优惠商品'
        },
        {
          title: '休闲零食'
        },
        {
          title: '辣条'
        },
        {
          title: '饮料类'
        },
        {
          title: '泡面'
        },
        {
          title: '香烟类'
        },
        {
          title: '香烟类'
        }
      ],
      // 商品信息列表
      shopList: [
        {
          id: 0,
          title: '书香苑',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isRot: true,
          sales: 133,
          num: 1,
          price: 10
        },
        {
          id: 1,
          title: '面条',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isRot: true,
          sales: 133,
          num: 1,
          price: 8
        },
        {
          id: 2,
          title: '米饭',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isRot: true,
          sales: 133,
          num: 1,
          price: 1
        },
        {
          id: 3,
          title: '泡椒牛肉盖饭',
          imgUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
          isRot: true,
          sales: 133,
          num: 1,
          price: 12
        }
      ],
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
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [],
          comment_video: []
        }
      ]
    }
  },
  created() {
    this.id = this.$route.query.id
    console.log(this.id)
  },
  methods: {
    // 处理添加商品
    handleAdd(addItem) {
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
      window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
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
      console.log(111)
      const index = this.cartList.findIndex(i => {
        item.id = i.id
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
      console.log(index)
      this.dropdownObj = this.dropdownList[index]
    },
    // 展示搜索弹出层
    toSearch(searchIsShow) {
      this.searchIsShow = searchIsShow
    },
    // 处理拨打电话事件
    toPhone() {
      const phoneNum = 14708701960
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
    }
  }
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
</style>
