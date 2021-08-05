<template>
  <div>
    <van-cell
      class="animated fadeInLeft"
      v-for="(item, index) in shopList"
      :key="index + item.id"
      @click="toSnackShopInfo(item)"
    >
      <shop-card>
        <template v-slot:title>
          <div class="shop_title">{{ item.shopName }}</div>
        </template>
        <template v-slot:thumb>
          <van-image :src="'https://jixi.mynatapp.cc/' + item.shopPic" />
        </template>
        <template v-slot:tags>
          <van-tag plain type="danger" v-if="item.hasDiscount === 1"
            >满{{ item.shopDiscount.requirePrice }}减￥{{
              item.shopDiscount.discountPrice
            }}</van-tag
          >
        </template>
        <template v-slot:desc>
          <div class="desc">
            <div class="trade">
              <span class="grade">
                <van-icon name="star-o" />
                <template v-if="item.score">{{ item.score }}</template>
                <template v-else>暂无</template>
              </span>
              已售：{{ item.sale }}单
            </div>
            <div class="price">
              起价:
              <span class="price_item">￥{{ item.lowPrice }}</span>
              配送:
              <span class="price_item"
                >￥{{ item.deliveryFee ? item.deliveryFee : 0 }}</span
              >
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
            <div class="text stop" v-else-if="item.shopState === 2">停业中</div>
            <div class="text stop" v-else>打烊中</div>
          </div>
        </template>
      </shop-card>
    </van-cell>
  </div>
</template>
<script>
import DropdownMenu from '@/components/common/DropdownMenu.vue'
import ShopCard from '@/components/common/ShopCard.vue'

export default {
  components: {
    DropdownMenu,
    ShopCard,
  },
  props: {
    shopList: {
      type: Array,
      default: () => {
        return []
      },
    },
    dropdownList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    toSnackShopInfo(item) {
      if (item.shopCategoryId === 4 || item.shopCategoryId === 5) {
        this.$router.push(`/takeOutShop?id=` + item.shopId)
        return false
      }
      this.$router.push(`/snackShop?id=` + item.shopId)
    },
  },
}
</script>
<style lang="less" scoped>
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
  // .text::before {
  //   box-sizing: content-box;
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   content: '';
  //   top: -31px;
  //   right: 0.5rem;
  //   border-left: 13px solid transparent;
  //   border-right: 13px solid transparent;
  //   border-bottom: 1rem solid #fff;
  //   border-top: 13px solid transparent;
  //   display: block;
  //   z-index: 12;
  // }
  // .text::after {
  //   box-sizing: content-box;
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   content: '';
  //   top: -33px;
  //   right: 0.4rem;
  //   border-left: 15px solid transparent;
  //   border-right: 15px solid transparent;
  //   border-top: 15px solid transparent;
  //   border-bottom: 1rem solid @themeColor;
  //   display: block;
  //   z-index: 10;
  // }
  .stop {
    color: #ccc;
    border: 1px solid #ccc;
  }
  // .stop::after {
  //   border-bottom: 1rem solid #ccc;
  // }
}
</style>
