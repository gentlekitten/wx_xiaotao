<template>
  <van-cell-group>
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="分类名称"
        label="分类名称："
        placeholder="商品分类名"
        :rules="[{ required: true}]"
      />
      <van-field
        v-model="form.num"
        type="password"
        name="排序数值"
        label="排序数值："
        placeholder="越大越靠前"
        :rules="[{ required: true}]"
      />
      <div class="btn_warp">
        <van-button class="btn" round native-type="onSubmit">保存</van-button>
        <van-button v-show="isShowDeteleBtn" class="btn detele" round @click="deleteGoods">删除</van-button>
      </div>
    </van-form>/
  </van-cell-group>
</template>
<script>
export default {
  props: {
    isShowDeteleBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        num: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.form)
    },
     deleteGoods() {
      this.$emit('deleteGoods')
    }
  }
}
</script>
<style lang="less" scoped>
.form {
  padding: 1rem;
  .btn_warp {
    display: flex;
    justify-content: center;
    .btn {
      width: 8rem;
      height: 2rem;
      font-size: 1rem;
      color: #fff;
      background-color: @themeColor;
      margin: 1rem 0;
    }
    .detele {
      background-color: #ccc;
      margin-left: 0.5rem;
    }
  }
}
</style>
