<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="选择店铺" is-arrow isBackUp />
    <div class="top_bg" />
    <div class="task_type">
      <div class="warp">
        <van-cell
          class="cell"
          is-link
          v-for="(item, index) in taskTypeList"
          :key="item.titel + index"
          :border="false"
          :to="item.url"
          @click="handleClickShop(item)"
        >
          <template #icon>
            <img class="img" :src="item.img" />
          </template>
          <template #title>
            <span class="title">{{ item.title }}</span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      shopCategoryIdList: [],
      shopIdList: [],
      taskTypeList: [
        {
          id: 1,
          img: require('../../assets/img/index/snackShop.png'),
          title: '零食铺'
        },
        {
          id: 4,
          img: require('../../assets/img/index/takeOut.png'),
          title: '外卖商店'
        },
        {
          id: 2,
          img: require('../../assets/img/index/beautyMakeup.png'),
          title: '美妆店'
        },
        {
          id: 3,
          img: require('../../assets/img/index/electronic.png'),
          title: '数码店'
        }
      ]
    }
  },
  created() {
    this.getShopList()
    // this.handleUserIsShopping()
  },
  methods: {
    async getShopList() {
      const res = await getData(
        '/shop/info/user/find',
        {},
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopIdList = res.data
        res.data.forEach(e => {
          this.shopCategoryIdList.push(e.shopCategoryId)
        })
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 判断用户有没有店铺
    handleClickShop(item) {
      const index = this.taskTypeList.findIndex(e => {
        return e.id === item.id
      })
      // (1零食2美妆3数码4外卖5食堂)
      const id = item.id === 1 ? 1 : item.id === 2 ? 3 : item.id === 3 ? 4 : 2
      if (this.shopCategoryIdList.indexOf(item.id) > -1) {
        const shopId = this.shopIdList.filter(e => {
          return (item.id = e.shopCategoryId)
        })[0].id
        this.$router.push(`/shoppingMange/user?id=${id}&shopId=${shopId}`)
      } else if (this.shopCategoryIdList.indexOf(5) > -1) {
        const shopId = this.shopIdList.filter(e => {
          return (item.id = e.shopCategoryId)
        })[0].id
        this.$router.push(`/shoppingMange/user?id=2&shopId=${shopId}`)
      } else {
        this.$router.push(
          `/shoppingMange/user/shopManage?isShop=${false}&id=${id}`
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.top_bg {
  width: 100%;
  height: 10rem;
  background-color: @themeColor;
}
.task_type {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .warp {
    width: 90%;
    width: 90%;
    padding: 1rem 0;
    border-radius: 1rem;
    background-color: #fff;
    position: absolute;
    top: -6rem;
    .cell {
      height: 4rem;
      margin: 1rem 0;
      .img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .title {
        font-size: 1.2rem;
        font-weight: 900;
        margin-left: 1rem;
      }
      .label {
        font-size: 0.8rem;
        margin-left: 1rem;
      }
    }
  }
}
.van-icon-arrow {
  font-size: 1.5rem;
}
</style>
