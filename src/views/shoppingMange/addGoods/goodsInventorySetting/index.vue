<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="库存设置" is-arrow isBackUp />
    <div class="title">库存设置</div>
    <div class="switch_cell">
      <div class="text">限量库存</div>
      <van-switch class="switch" v-model="goodsInventoryChecked" size="24" />
      <div v-if="!goodsInventoryChecked" class="lable">不限库存</div>
      <div v-else class="lable">限制库存</div>
    </div>
    <div v-show="goodsInventoryChecked" class="stepper animated fadeInDown">
      <div class="text">库存数量</div>
      <van-stepper v-model="goodsNum" theme="round" />
    </div>
    <div class="btn_warp">
      <van-button class="btn" round @click="saveGoodsInventory">保存设置</van-button>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      productInventory: {},
      goodsInventoryChecked: false,
      goodsNum: 1
    }
  },
  created() {
    this.productInventory = JSON.parse(this.$route.query.productInventory)
      ? JSON.parse(this.$route.query.productInventory)
      : {}
    console.log(this.productInventory)
    if (
      Object.keys(this.productInventory).length > 0 &&
      this.productInventory.productNumber > 0
    ) {
      this.goodsInventoryChecked = true
      this.goodsNum = this.productInventory.productNumber
    }
  },
  methods: {
    saveGoodsInventory() {
      if (!this.goodsInventoryChecked) {
        this.$store.commit('addGoods/INVENTORY', 0)
        // return false
      } else {
        this.$store.commit('addGoods/INVENTORY', this.goodsNum)
      }
      sessionStorage.setItem(
        'addGoods',
        JSON.stringify(this.$store.state.addGoods)
      )
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  padding: 1rem;
  font-weight: 900;
}
.switch_cell {
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 0.8rem;
  background-color: #fff;
  .title {
    flex: 1;
  }
  .switch {
    margin: 0 1.2rem;
  }
  .lable {
    flex: 5;
    color: #999;
    font-size: 0.78rem;
  }
}
.stepper {
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 0.8rem;
  background-color: #fff;
  .text {
    margin-right: 1rem;
  }
}
.btn_warp {
  display: flex;
  justify-content: center;
  .btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
::v-deep .van-stepper--round .van-stepper__plus {
  //   background-color: #997a00;
}
</style>
