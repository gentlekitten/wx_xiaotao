<template>
  <div>
    <div class="goods_list" v-for="item in goodsList" :key="item.id">
      <img :src="'https://jixi.mynatapp.cc/' + item.logoAddress" />
      <div class="goods_content">
        <div class="title">{{ item.productName }}</div>
        <van-icon v-show="isEdit" class="delete_icon" name="minus" @click="deleteGoods(item)" />
        <div class="info">
          原价
          <span>{{ item.originalPrice}}</span>，售价
          <span>{{ item.sellPrice}}</span>
        </div>
        <div class="info">
          库存
          <span>{{ item.inventory === 0 ? '不限' : item.productInventory.productNumber}}</span>，总销
          <span class="color">{{ item.sale}}</span>
        </div>
        <div class="btn_item">
          <div v-if="item.state === 1" class="text">
            上架在售
            <i class="iconfont icon-ai36" />
          </div>
          <div v-else class="text red">
            下架停售
            <i class="iconfont icon-ai36" />
          </div>
          <van-button class="btn" round @click="toEditGoods">编辑</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    goodsList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    toEditGoods() {
      this.$emit('toEditGoods')
    },
    deleteGoods(item) {
      this.$emit('deleteGoods', item)
    }
  }
}
</script>
<style lang="less" scoped>
.goods_list {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #f7f7f7;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
  }
  .goods_content {
    margin-left: 1rem;
    line-height: 1.5rem;
    font-size: 0.72rem;
    position: relative;
    .title {
      font-weight: 900;
      font-size: 1rem;
    }
    .delete_icon {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.5rem;
      height: 1rem;
      border: 1px solid @themeColor;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info {
      span {
        color: @priceColor;
        font-size: 0.8rem;
      }
      .color {
        color: cadetblue;
      }
    }
  }
  .btn_item {
    display: flex;
    width: 50vw;
    justify-content: space-between;
    align-items: center;
    .text {
      color: cadetblue;
      font-size: 0.75rem;
    }
    .red {
      color: @priceColor;
    }
    .btn {
      width: 4rem;
      height: 1.5rem;
      font-size: 0.8rem;
      margin-right: 0.5rem;
      background-color: @themeColor;
      color: #fff;
    }
  }
}
</style>
