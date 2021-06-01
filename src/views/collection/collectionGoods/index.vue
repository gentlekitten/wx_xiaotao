<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="我的收藏—商品" is-arrow isBackUp />
    <van-list
      v-if="goodsList.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="哼，我也是有底线的~"
      :immediate-check="false"
      :offset="0"
      @load="onLoadData"
    >
      <div class="goods_list" v-for="item in goodsList" :key="item.id">
        <div class="goods" @click="toShoppingDetails(item)">
          <div class="left">
            <img :src="'https://jixi.mynatapp.cc/' + item.logoAddress" />
          </div>
          <div class="right">
            <div class="name">{{ item.productName }}</div>
            <div class="price_num">
              <div class="new">￥{{ item.sellPrice }}</div>
              <div class="old">￥{{ item.originalPrice }}</div>
              <div class="num">{{ item.sale }}人付款</div>
            </div>
          </div>
        </div>
        <div class="btn_warp">
          <van-button class="btn" round @click="deleteGoods(item)">移除</van-button>
        </div>
      </div>
    </van-list>
    <van-empty v-else description="暂无收藏的商品" />
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageIndex: 0,
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10
      }
      const res = await getData('/product/record/find', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.pageIndex += 1
        this.goodsList = res.data.productInfo
        if (this.pageIndex * 10 > res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 上拉加载数据
    onLoadData() {
      if (this.goodsList.length > 0) {
        this.getGoodsList()
      }
    },
    // 移除收藏的商品
    async deleteGoods(item) {
      const res = await upData(
        '/product/record/delete',
        { productId: item.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toShoppingDetails(item) {
      this.$router.push('/shoppingDetails?id=' + item.id)
    }
  }
}
</script>
<style lang="less" scoped>
.goods_list {
  position: relative;
  border: 1px solid #f7f7f7;
  width: 100%;
  background-color: #fff;
  .goods {
    display: flex;
    padding: 1rem;
    box-sizing: border-box;
    .left {
      img {
        width: 8rem;
        height: 8rem;
        border-radius: 0.5rem;
      }
    }
    .right {
      margin-left: 1rem;
      width: 100%;
      .name {
        margin-bottom: 1.5rem;
        line-height: 1.5rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .price_num {
        color: @priceColor;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .old {
          color: #999;
          font-size: 0.8rem;
          text-decoration: line-through;
          margin-top: 0.2rem;
        }
        .num {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
      }
    }
  }
  .btn_warp {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    .btn {
      width: 4rem;
      height: 2rem;
      font-size: 0.8rem;
    }
  }
}
</style>
