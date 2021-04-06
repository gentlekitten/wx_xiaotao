<template>
  <div class="home">
    <!-- 顶部返回 -->
    <nav-bar title="零食铺" is-arrow back-to="/index" />
    <!-- 图片 -->
    <van-image width="100%" height="10rem" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <!-- grid 宿舍分类 -->
    <div class="common">
      <div class="title">
        <van-icon name="star" />
        <span>我的常用</span>
      </div>
      <grid :gird-list="commonList" @clickSnackDormitory="clickSnackDormitory" />
    </div>
    <div class="other">
      <span class="title">新分类</span>
      <grid :gird-list="snackShopList" @clickSnackDormitory="clickSnackDormitory" />
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'
import Grid from '@/components/common/Grid.vue'

export default {
  components: {
    NavBar,
    Grid
  },
  data() {
    return {
      commonList: JSON.parse(localStorage.getItem('snackCommonShopList'))
        ? JSON.parse(localStorage.getItem('snackCommonShopList'))
        : [],
      snackShopList: [
        {
          id: 0,
          img: require('../../assets/img/index/snackShop.png'),
          text: '零食铺须知',
          url: 'snackShop?id=0'
        }
      ]
    }
  },
  created() {
    this.getSnackShopList()
  },
  methods: {
    // 获取零食铺
    async getSnackShopList() {
      const res = await getData(
        '/shop/snack/shop/list',
        {
          siteId: 23
        },
        { showLoading: true }
      )
      console.log(res)
      res.data.forEach(e => {
        e.url = `snackShop?id=${e.id}`
        e.img = require('../../assets/img/index/snackShop.png')
        e.text = e.shopName
      })
      if (res.code === '0') {
        return this.snackShopList.push(...res.data)
      }
      return this.$toast.fail(res.msg)
    },
    clickSnackDormitory(item) {
      // 去重
      this.commonList = this.commonList.filter(i => {
        return item.id !== i.id
      })
      this.commonList.unshift(item)
      if (this.commonList.length > 3) {
        this.commonList = this.commonList.slice(0, 3)
      }
      // this.addCommon(this.commonList)
      localStorage.setItem(
        'snackCommonShopList',
        JSON.stringify(this.commonList)
      )
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  background-color: #fff;
  height: 100vh;
}
.common {
  box-sizing: border-box;
  .title {
    display: block;
    margin: 1rem 0.8rem;
    font-weight: bolder;
    font-size: 0.9rem;
  }
}
.other {
  background-color: #fff;
  padding-bottom: 2rem;
  .title {
    display: block;
    margin: 1rem 0.8rem;
    font-weight: bolder;
    font-size: 0.9rem;
  }
}
::v-deep .van-grid-item {
  width: 30%;
  height: 8rem;
  margin: 0.6rem 10% / 6;
  box-shadow: 0px 0px 0.6rem rgba(0, 0, 0, 0.1);
  border-radius: 7%;
  .van-image {
    display: flex;
    justify-content: center;
    align-items: center;
    .van-image__img {
      height: 80%;
      width: 70%;
    }
  }
  .gird_text {
    text-align: center;
    margin-top: 0.2rem;
    height: 2rem;
  }
}
</style>
