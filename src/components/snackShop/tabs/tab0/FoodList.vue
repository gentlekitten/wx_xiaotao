<template>
  <div class="right_food">
    <!-- <div class="top">
      <div class="title">{{ dropdownObj.text }}</div>
    </div>-->
    <div v-for="item in shopList" :key="item.id">
      <div v-for="c in item.productInfos" :key="c.id">
        <div v-if="c.productInfoSpecifications.length > 0">
          <shop-card
            class="shop_list"
            v-for="d in c.productInfoSpecifications"
            :key="d.id"
          >
            <template v-slot:title>
              <div class="shop_title" @click="toShopInfoView(c, d.id)">
                {{ c.productName + d.specificationName }}
              </div>
            </template>
            <template v-slot:thumb>
              <van-image
                :src="imgBaseUrl + c.logoAddress"
                @click="toShopInfoView(c, d.id)"
              />
            </template>
            <template v-slot:tags>
              <van-tag
                plain
                type="danger"
                v-if="c.sale > 20"
                @click="toShopInfoView(c)"
                >热销中</van-tag
              >
            </template>
            <template v-slot:desc>
              <div class="desc">
                <div @click="toShopInfoView(c, d.id)">
                  <div class="grade">销量：{{ c.sale }}</div>
                  <div class="price">
                    ￥
                    <span class="price_num">{{ c.sellPrice + d.price }}</span>
                  </div>
                </div>
                <div class="add" @click="handleAdd(c, d.id)">
                  <van-icon name="plus" />
                </div>
              </div>
            </template>
          </shop-card>
        </div>
        <div v-else>
          <shop-card class="shop_list">
            <template v-slot:title>
              <div class="shop_title" @click="toShopInfoView(c)">
                {{ c.productName }}
              </div>
            </template>
            <template v-slot:thumb>
              <van-image
                :src="imgBaseUrl + c.logoAddress"
                @click="toShopInfoView(c)"
              />
            </template>
            <template v-slot:tags>
              <van-tag
                plain
                type="danger"
                v-if="c.sale > 20"
                @click="toShopInfoView(c)"
                >热销中</van-tag
              >
            </template>
            <template v-slot:desc>
              <div class="desc">
                <div @click="toShopInfoView(c)">
                  <div class="grade">销量：{{ c.sale }}</div>
                  <div class="price">
                    ￥
                    <span class="price_num">{{ c.sellPrice }}</span>
                  </div>
                </div>
                <div class="add" @click="handleAdd(c)">
                  <van-icon name="plus" />
                </div>
              </div>
            </template>
          </shop-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShopCard from '@/components/common/ShopCard.vue'

export default {
  components: {
    ShopCard,
  },
  props: {
    shopList: {
      type: Array,
      default: () => {
        return []
      },
    },
    dropdownObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    shopId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleAdd(item, d) {
      item.d = d
      this.$emit('handleAdd', item)
    },
    toShopInfoView(item, d) {
      window.sessionStorage.setItem('snackShopInfoItem', JSON.stringify(item))
      this.$router.push(`/shopInfoView?d=${d}&shopId=${this.shopId}`)
    },
  },
}
</script>
<style lang="less" scoped>
.right_food {
  // float: right;
  // width: 78%;

  // position: absolute;
  // padding-bottom: 20rem;
  // top: 0;
  // right: 0;
  // overflow: scroll;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0;
    margin: 0.8rem 1rem 0.2rem 1rem;
    .title {
      font-size: 0.8rem;
      color: #999;
    }
  }
  .shop_list {
    margin-bottom: 1rem;
    .shop_title {
      font-size: 1rem;
      font-weight: 900;
    }
  }
  .desc {
    .grade {
      margin: 0.3rem 0;
      color: #999;
      font-size: 0.7rem;
    }
    .price {
      color: red;
      margin-bottom: 0.5rem;
      .price_num {
        font-weight: bolder;
        font-size: 0.8rem;
        margin-left: -0.2rem;
      }
    }
    .add {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background-color: @themeColor;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 1rem;
      position: absolute;
      right: 0.2rem;
      top: 2.7rem;
    }
  }
}
</style>
