<template>
  <div>
    <div class="shop_list">
      <div class="warp" :class="[dropdownList.length > 0 ? 'margin' : '']">
        <div
          class="shop_item"
          v-for="item in shopList"
          :key="item.id"
          @click="toShoppingDetails(item.productId)"
        >
          <img v-lazy="'https://jixi.mynatapp.cc/'+item.logoAddress" />
          <div class="title">{{ item.productName }}</div>
          <div class="info">
            <div class="new_price">￥{{ item.sellPrice }}</div>
            <div v-if="item.originalPrice" class="old_price">￥{{ item.originalPrice }}</div>
            <div v-if="item.sale || item.sale === 0" class="sale">已售：{{ item.sale }}</div>
            <!-- 二手市场 -->
            <div v-if="tabIndex === 1" class="status">
              <div v-if="item.state === 2">已售出</div>
              <div v-else-if="item.state === 0" class="text">
                未售出
                <br />(已下架)
              </div>
              <div v-else class="text">
                未售出
                <br />(已上架)
              </div>
            </div>
          </div>
          <div v-if="item.usageTime && tabIndex === 0" class="use_time">使用天数:{{ item.usageTime }}天</div>
          <div v-if="tabIndex === 1 && type === 3" class="update_btn_warp">
            <van-button
              v-if="item.state !== 2"
              class="btn"
              round
              @click.stop="toUpdateShop(item)"
            >编辑</van-button>
            <br />
            <van-button class="btn" round @click.stop="toDeleteShop(item)">删除</van-button>
          </div>
        </div>
      </div>
      <div v-if="dropdownList.length > 0" class="top_type">
        <div class="title">{{ dropdownObj.text }}</div>
        <!-- 下拉选择 -->
        <dropdown-menu :dropdown-list="dropdownList" @dropdownChange="dropdownChange" />
      </div>
    </div>
  </div>
</template>
<script>
import DropdownMenu from '@/components/common/DropdownMenu.vue'

export default {
  components: {
    DropdownMenu
  },
  props: {
    shopList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dropdownList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dropdownObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 类别，3是二手市场
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchValue: '',
      tabIndex: Number(
        window.sessionStorage.getItem('tabActiveIndexSecondaryMarket')
      )
        ? Number(window.sessionStorage.getItem('tabActiveIndexSecondaryMarket'))
        : 0
    }
  },
  methods: {
    dropdownChange(index) {
      this.$emit('dropdownChange', index)
    },
    toShoppingDetails(id) {
      this.$emit('toShoppingDetails', id)
    },
    toUpdateShop(item) {
      this.$router.push(
        '/secondaryMarket/addGoods?id=' + item.productId + '&type=update'
      )
    },
    toDeleteShop(item) {
      this.$emit('toDeleteShop', item)
    }
  }
}
</script>
<style lang="less" scoped>
.margin {
  margin-top: 2.5rem;
}
.shop_list {
  padding: 1rem;
  position: relative;
  .top_type {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    margin-bottom: 1rem;
    .title {
      color: #999;
      font-size: 0.8rem;
    }
  }
  .warp {
    display: flex;
    flex-wrap: wrap;
    .shop_item {
      width: 47.5%;
      height: 17rem;
      background-color: #fff;
      border-radius: 1rem;
      margin-bottom: 1rem;
      position: relative;
      img {
        width: 100%;
        height: 56%;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
      .title {
        box-sizing: border-box;
        padding: 0.8rem;
        font-size: 1rem;
        line-height: 1.5rem;
        height: 3.6rem;
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .info {
        // padding: 1rem 0.8rem 0 0.8rem;
        padding: 0 0.8rem;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        .new_price {
          color: red;
          font-size: 1rem;
        }
        .sale {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
        .status {
          font-size: 0.9rem;
          margin-top: 0.2rem;
          color: cadetblue;
          .text {
            color: #999;
          }
        }
        .old_price {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.2rem;
          text-decoration: line-through;
        }
      }
      .use_time {
        padding: 0 1rem;
        font-size: 0.8rem;
        margin-top: 0.2rem;
        color: #999;
      }
      .update_btn_warp {
        // padding: 0 0.5rem;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.7;
        .btn {
          width: 4rem;
          height: 1.5rem;
          font-size: 0.8rem;
          color: #997a00;
          background-color: #ffe788;
          border: 1px solid #ffe788;
        }
        .left {
          // margin-right: 1.9rem;
        }
      }
    }
  }
}
.shop_list .shop_item:nth-child(odd) {
  margin-right: 1rem;
}
</style>