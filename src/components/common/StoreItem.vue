<template>
  <div>
    <div class="shopping_warp animated fadeInLeft">
      <div class="shopping" @click="toShopping(item)">
        <div class="left">
          <img :src="'https://jixi.mynatapp.cc/'+item.shopPic" />
        </div>
        <div class="center">
          <div class="name">{{ item.shopName }}</div>
          <van-rate
            v-model="rate"
            readonly
            :size="20"
            color="#f2af49"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="right">
          <van-icon name="arrow" size="1rem" color="#999" />
        </div>
      </div>
      <div v-if="isShowDeleteBtn">
        <van-button class="btn" round @click="deleteShopping(item)">??</van-button>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShowDeleteBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rate: 0
    }
  },
  created() {
    this.rate = this.item.score ? this.item.score : 0
  },
  methods: {
    toShopping(item) {
      this.$emit('toShopping', item)
    },
    getRate(item) {}
  }
}
</script>
<style lang="less" scoped>
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
