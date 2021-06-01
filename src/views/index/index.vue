<template>
  <div class="home container">
    <!-- 顶部 -->
    <top-area :siteInfo="siteInfo" @toSearch="toSearch" @toGetLocation="getWxProps" />
    <!-- 轮播图 -->
    <swipe :images="swipeImagesList" height="500px" />
    <!-- 宫格 -->
    <grid :gird-list="girdList" :column-num="4" />

    <!-- 公告 -->
    <advertising />
    <!-- 外卖区域 -->
    <div class="take_out">
      <tabs
        :tab-list="tabsList"
        :sticky="true"
        tabsIndexName="tabActiveIndexTakeOut"
        @clickTab="clickTab"
      >
        <div class="top_type">
          <div class="title">{{ dropdownObj.text }}</div>
          <!-- 下拉选择 -->
          <dropdown-menu :dropdown-list="dropdownList" @dropdownChange="dropdownChange" />
        </div>
        <template v-if="shopList.length > 0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="哼，我也是有底线的~"
            :immediate-check="false"
            @load="onLoadRefresh"
          >
            <!-- 商品列表 -->
            <food-list :dropdown-list="dropdownList" :shop-list="shopList" />
          </van-list>
        </template>
        <template v-else>
          <van-empty description="暂无该内容" />
        </template>
      </tabs>
    </div>
    <!-- 回到顶部 -->
    <back-top />
  </div>
</template>
<script>
// import Cookies from 'js-cookie'

import { upData, getData } from '@/api/api.js'

import wx from 'weixin-js-sdk'

import wechatUtil from '@/utils/wechatUtil'

import Grid from '@/components/common/Grid.vue'
import Swipe from '@/components/common/Swipe.vue'
import BackTop from '@/components/common/BackTop.vue'
import DropdownMenu from '@/components/common/DropdownMenu.vue'

import TopArea from '@/components/index/TopArea.vue'
import Advertising from '@/components/index/Advertising.vue'
import Tabs from '@/components/common/Tabs.vue'
import FoodList from '@/components/common/FoodList.vue'

export default {
  name: 'Index',
  components: {
    Grid,
    TopArea,
    Swipe,
    Advertising,
    Tabs,
    FoodList,
    BackTop,
    DropdownMenu
  },
  data() {
    return {
      code: '',
      // 站点信息
      siteInfo: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo'))
        : {},
      dropdownObj: { text: '综合排序', value: 0 },
      // 是否显示加载
      loading: false,
      // 是否加载完成
      finished: false,
      // 下拉选择框列表
      dropdownList: [
        { text: '综合排序', value: 0 },
        { text: '营业状态', value: 1 },
        { text: '单量排序', value: 2 },
        { text: '优惠活动', value: 3 }
      ],
      isShowFilterType: false,
      tabIndex: Number(sessionStorage.getItem('tabActiveIndexTakeOut'))
        ? Number(sessionStorage.getItem('tabActiveIndexTakeOut'))
        : 0,
      // 请求数据页数
      pageIndex: 0,
      // 轮播图列表
      swipeImagesList: [],
      girdList: [
        {
          img: require('../../assets/img/index/snackShop.png'),
          text: '零食',
          url: 'snackShopList'
        },
        {
          img: require('../../assets/img/index/expressage.png'),
          text: '快递服务',
          url: 'expressage'
        },
        {
          img: require('../../assets/img/index/orderPeople.png'),
          text: '领跑者',
          url: 'orderPeople'
        },
        {
          img: require('../../assets/img/index/beautyMakeup.png'),
          text: '美妆',
          url: 'beautyMakeup'
        },
        {
          img: require('../../assets/img/index/electronic.png'),
          text: '数码',
          url: 'electronicProducts'
        },
        {
          img: require('../../assets/img/index/secondMarket.png'),
          text: '跳蚤市场',
          url: 'secondaryMarket'
        },
        {
          img: require('../../assets/img/index/takeOut.png'),
          text: '外卖',
          url: 'takeOutShopList'
        },
        // {
        //   img: require('../../assets/img/index/shop.png'),
        //   text: '商城',
        //   url: 'shoppingMall'
        // },
        {
          img: require('../../assets/img/index/partTime.png'),
          text: '兼职信息',
          url: 'partTimeJobInfo'
        }
      ],
      tabsList: [
        {
          title: '周边外卖'
        },
        {
          title: '零食铺'
        },
        {
          title: '校园食堂'
        },
        {
          title: '全部店铺'
        }
      ],
      shopList: [],
      shopListTwo: []
    }
  },
  created() {
    // 当前需要直接退出的页面
    window.history.pushState('_android_back', null, location.href) // popstate只能监听pushState创建的
    window.addEventListener('popstate', this.popstate, false)

    this.handleIsUpCode()
  },
  methods: {
    // 处理是否上传code
    handleIsUpCode() {
      this.code = this.getUrlCode().code ? this.getUrlCode().code : ''
      if (this.code) {
        this.upWxCode()
      } else {
        this.getSiteInfoBySiteId()
      }
    },
    popstate() {
      wx.closeWindow() // 微信网页退出
    },
    // 截取url中的code方法
    getUrlCode() {
      let url = window.location.search
      let theRequest = new Object()
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    },
    // 上传code
    async upWxCode() {
      const res = await getData(
        '/mp/login',
        { code: this.code, state: 'wechat' },
        { showLoading: true }
      )
      if (res.code === '0') {
        // 设置一个state，判断是否上传
        // Cookies.set('state', 'wechat')
        // window.sessionStorage.setItem('state', 'wechat')
        window.location.href = 'https://jixi.mynatapp.cc/dist/index.html#/index'
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await getData(
        '/customer/basicInfo',
        {},
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取站点id和站点名字
    async getSiteInfoBySiteId() {
      // 获取用户信息
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
        ? JSON.parse(window.sessionStorage.getItem('userInfo'))
        : {}
      if (Object.keys(userInfo).length <= 0) {
        this.getUserInfo()
      }
      // 判断是否有站点id
      const siteId = JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : ''
      if (siteId !== '') {
        this.getSwiper(siteId)
        this.getShopList(siteId)
        return false
      }
      const res = await getData('/page/index', {}, { showLoading: false })
      console.log(res)
      if (res.code === '0') {
        this.siteInfo = res.data
        // 返回数据为空使用微信定位获取站点id
        if (Object.keys(this.siteInfo).length <= 0 || this.siteInfo.id === '') {
          const location = JSON.parse(
            window.sessionStorage.getItem('getLocation')
          )
            ? JSON.parse(window.sessionStorage.getItem('getLocation'))
            : {}
          if (Object.keys(location).length > 0) {
            this.getInfo(location)
          } else {
            this.getWxProps()
          }
          return false
        }
        window.sessionStorage.setItem('siteInfo', JSON.stringify(res.data))
        this.getSwiper(res.data.id)
        this.getShopList(res.data.id)
        return false
      }
      // if (res.code === '5x10001') {
      //   window.sessionStorage.setItem('isSite', false)
      // }
      this.$handleCode.handleCode(res)
    },
    // 获取微信权限
    async getWxProps() {
      const res = await getData(
        '/js/ticket/get',
        {
          url: 'https://jixi.mynatapp.cc/dist/index.html'
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.getLocation(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取定位
    async getLocation(data) {
      console.log('config', data)
      const _that = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ['getLocation', 'hideMenuItems'] // 必填，需要使用的JS接口列表
      })
      wx.checkJsApi({
        jsApiList: ['getLocation'],
        success: function(res) {
          if (res.checkResult.getLocation === false) {
            this.$toast.fail(
              '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！'
            )
            return
          }
        },
        fail: function(res) {}
      })
      wx.ready(() => {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            // 微信坐标转高德坐标
            let gps = [res.longitude, res.latitude]
            let lnglats = {}
            AMap.convertFrom(gps, 'gps', function(status, result) {
              if (result.info === 'ok') {
                lnglats = result.locations[0]
                window.sessionStorage.setItem(
                  'getLocation',
                  JSON.stringify(lnglats)
                )
                _that.$toast.success('定位成功！')
                _that.getInfo(lnglats)
              }
            })
          },
          fail() {
            _that.$toast.fail('定位失败！')
            console.log('fail')
          },
          cancel() {
            _that.$toast.fail('取消定位！')
            console.log('cancel')
          }
        })
        wx.hideMenuItems({
          menuList: [
            'menuItem:editTag',
            'menuItem:delete',
            'menuItem:copyUrl',
            'menuItem:originPage',
            'menuItem:readMode',
            'menuItem:openWithQQBrowser',
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:share:brand',
            'menuItem:share:QZone',
            'menuItem:share:facebook',
            'menuItem:share:weiboApp'
          ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        // wx.updateAppMessageShareData({
        //   title: '校淘校园·为校而生', // 分享标题
        //   desc: '校淘校园·为校而生', // 分享描述
        //   link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function() {
        //     // 设置成功
        //   }
        // })
      })
      wx.error(res => {
        _that.$toast.fail('wx.config error')
      })
    },
    // 获取站点信息(根据定位)
    async getInfo(data) {
      const res = await getData(
        '/site/location/info',
        { lat: data.lat, lng: data.lng },
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.siteInfo = res.data
        window.sessionStorage.setItem('siteInfo', JSON.stringify(res.data))
        this.getSwiper(res.data.id)
        this.getShopList(res.data.id)
        return false
      }
      // 未知站点
      if (res.code === '5x10001') {
        JSON.parse(window.sessionStorage.getItem('siteInfo')) &&
          window.sessionStorage.setItem('siteInfo', JSON.stringify({}))
        this.siteInfo = {}
        this.$toast.fail('你的站点不存在!')
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取轮播图列表
    async getSwiper(siteId) {
      if (!siteId) {
        return false
      }
      const res = await getData(
        '/site/pic/find',
        { siteId },
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.swipeImagesList = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    //排序函数
    getSortFun(order, sortBy) {
      var ordAlpah = order == 'asc' ? '>' : '<'
      var sortFun = new Function(
        'a',
        'b',
        'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1'
      )
      return sortFun
    },
    // 下拉选择框改变
    dropdownChange(index) {
      if (index === 1) {
        this.shopList.sort(this.getSortFun('asc', 'shopState'))
      } else if (index === 2) {
        this.shopList.sort(this.getSortFun('desc', 'sale'))
      } else if (index === 3) {
        this.shopList = this.shopList.filter(e => {
          return e.shopDiscount.discountPrice
        })
      } else {
        this.shopList = this.shopListTwo
      }
      this.dropdownObj = this.dropdownList[index]
    },
    // 获取店铺列表
    async getShopList(siteId) {
      // 1零食 2 美妆 3 数码 4 外卖 5 食堂
      const shopCategoryId =
        this.tabIndex === 0
          ? 4
          : this.tabIndex === 1
          ? 1
          : this.tabIndex === 2
          ? 5
          : 0
      const data = {
        // siteId,
        pageIndex: this.pageIndex,
        shopCategoryId,
        pageLimit: 1
      }
      const res = await getData('/shop/info/basic/find', data, {
        showLoading: false
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.shopList.push(...res.data.pageIndexShopInfoVo)
        this.shopListTwo.push(...res.data.pageIndexShopInfoVo)
        this.pageIndex += 1
        if (this.pageIndex * 1 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toSearch() {
      this.$router.push('/search')
    },
    showFilterType() {
      console.log('showFilterType')
      this.isShowFilterType = !this.isShowFilterType
    },
    // 点击tabs
    clickTab(name) {
      this.tabIndex = name
      this.pageIndex = 0
      this.shopList = []
      this.finished = false
      this.getShopList(this.siteInfo.id)
    },
    // 上拉刷新
    async onLoadRefresh() {
      this.getShopList(this.siteInfo.id)
    }
  },
  destroyed: function() {
    // 记得清除，不然单页面，其它页面也可以用
    window.removeEventListener('popstate', this.popstate, false)
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
}

.take_out {
  position: relative;
  padding-bottom: 5rem;
}
.top_type {
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  .title {
    color: #999;
    font-size: 0.8rem;
  }
}
</style>
