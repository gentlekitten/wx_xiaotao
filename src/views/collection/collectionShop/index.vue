<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="我的收藏—店铺" is-arrow isBackUp />
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      tabsIndexName="tabActiveIndexCollectionShop"
      @clickTab="clickTab"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="哼，我也是有底线的~"
        :immediate-check="false"
        :offset="0"
        @load="onLoadData"
      >
        <template v-if="tabIndex === 0">
          <template v-if="shopList.length > 0">
            <shop-card
              class="shop_warp animated fadeInLeft"
              v-for="(item, index) in shopList"
              :key="index + item.shopId"
            >
              <template v-slot:title>
                <div class="shop_title" @click="toFoodShopping(item)">
                  {{ item.shopName }}
                </div>
              </template>
              <template v-slot:thumb>
                <van-image
                  :src="imgBaseUrl + item.shopPic"
                  @click="toFoodShopping(item)"
                />
              </template>
              <template v-slot:tags>
                <van-tag
                  plain
                  type="danger"
                  v-if="item.shopDiscount && item.shopDiscount.discountPrice"
                  @click="toFoodShopping(item)"
                  >满{{ item.requirePrice }}减￥{{
                    item.discountPrice
                  }}</van-tag
                >
              </template>
              <template v-slot:desc>
                <div class="desc" @click="toFoodShopping(item)">
                  <div class="trade">
                    <span class="grade">
                      <van-icon name="star-o" />
                      {{ item.score }}
                    </span>
                    已售：{{ item.sale }}单
                  </div>
                  <div class="price">
                    起价:
                    <span class="price_item">￥{{ item.lowPrice }}</span>
                    配送:
                    <span class="price_item">￥{{ item.deliveryFee }}</span>
                  </div>
                  <div class="type">
                    <van-icon name="shop-o" />
                    {{ item.businessInfo }}
                  </div>
                  <div class="address">
                    <van-icon name="eye-o" />
                    {{ item.addressDetail }}
                  </div>
                </div>
                <div class="shop_status">
                  <div class="text" v-if="item.shopState === 1">营业中</div>
                  <div class="text stop" v-else-if="item.shopState === 2">
                    停业中
                  </div>
                  <div class="text stop" v-else>打烊中</div>
                </div>
              </template>
              <template v-slot:footer>
                <div class="delete_btn">
                  <van-button
                    class="btn"
                    round
                    @click="deleteFoodShopping(item)"
                    >移除</van-button
                  >
                </div>
              </template>
            </shop-card>
          </template>
          <van-empty v-else description="暂无收藏的店铺"></van-empty>
        </template>
        <template v-else>
          <template v-if="shoppingList.length > 0">
            <store-item
              v-for="item in shoppingList"
              :key="item.shopId"
              :item="item"
              @toShopping="toShopping"
              @deleteShopping="deleteShopping"
            />
          </template>
          <van-empty v-else description="暂无收藏的店铺"></van-empty>
        </template>
      </van-list>
    </tabs>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'
import Tabs from '@/components/common/Tabs.vue'
import ShopCard from '@/components/common/ShopCard.vue'
import StoreItem from '@/components/common/StoreItem.vue'

export default {
  components: {
    NavBar,
    Tabs,
    ShopCard,
    StoreItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      pageIndex: 0,
      tabIndex: Number(
        window.sessionStorage.getItem('tabActiveIndexCollectionShop')
      ),
      tabsList: [
        {
          title: '外卖 / 零食店铺',
        },
        {
          title: '商品店铺',
        },
      ],
      shopList: [],
      //   商品店铺列表
      shoppingList: [],
    }
  },
  created() {
    this.getShopDataList()
  },
  methods: {
    // 获取收藏的店铺
    async getShopDataList() {
      const data = {
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      const url =
        this.tabIndex === 0 ? '/shop/record/snack/find' : '/shop/record/find'
      const res = await getData(url, data, {
        showLoading: true,
      })
      console.log(res)
      this.loading = false
      if (res.code === '0') {
        this.tabIndex === 0
          ? this.shopList.push(...res.data.customerShopRecordVos)
          : this.shoppingList.push(...res.data.customerShopRecordSeVos)
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.finished = true
      this.$handleCode.handleCode(res)
    },
    // 上拉加载数据
    onLoadData() {
      if (this.shopList.length > 0 || this.shoppingList.length > 0) {
        this.getShopDataList()
      }
    },
    // 删除收藏的外卖或者零食铺
    async deleteFoodShopping(item) {
      const res = await upData(
        '/shop/record/delete',
        { shopId: item.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 删除收藏的商城铺
    async deleteShopping(item) {
      const res = await upData(
        '/shop/record/delete',
        { shopId: item.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 去外卖或者零食铺详情
    toFoodShopping(item) {
      if (item.state !== 1) {
        return this.$toast.fail('抱歉，该店铺已经不存在！')
      }
      // 区别零食还是外卖
      const url =
        item.shopCategoryId === 1 ? 'snackShop?id=' : '/takeOutShop?id='
      this.$router.push(url + item.shopId)
    },
    clickTab(index) {
      this.tabIndex = index
      this.finished = false
      this.pageIndex = 0
      this.shopList = []
      this.shoppingList = []
      this.getShopDataList()
    },
    toShopping(item) {
      this.$router.push(`/shoppingShop?id=` + item.shopId)
    },
  },
}
</script>
<style lang="less" scoped>
.shop_warp {
  border: 1px solid #f7f7f7;
  position: relative;
}
.shop_title {
  font-size: 1rem;
  font-weight: 900;
}
.desc {
  padding: 0.5rem 0;
  color: #999;
  .trade {
    .grade {
      color: @themeColor;
    }
  }
  .price {
    .price_item {
      color: @priceColor;
    }
  }
  .address,
  .type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 11.6rem;
  }
}
.van-cell {
  height: 9rem;
  padding: 0;
  line-height: 1.1rem;
}
.shop_status {
  position: absolute;
  top: 0.5rem;
  right: 0;
  .text {
    width: 2rem;
    height: 0.8rem;
    padding: 0.2rem;
    font-size: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @themeColor;
    border: 1px solid @themeColor;
  }

  .stop {
    color: #ccc;
    border: 1px solid #ccc;
  }
}
.delete_btn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  .btn {
    width: 4rem;
    height: 2rem;
    font-size: 0.8rem;
  }
}
.shopping_warp {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #f7f7f7;
  .shopping {
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    .center {
      flex: 5;
      .name {
        margin-bottom: 0.2rem;
      }
    }
  }
  .btn {
    width: 4rem;
    height: 2rem;
    float: right;
    font-size: 0.8rem;
  }
}
</style>
