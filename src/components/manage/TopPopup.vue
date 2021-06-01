<template>
  <van-cell-group>
    <div class="form">
      <van-field
        v-model="form.classifyName"
        name="分类名称"
        label="分类名称："
        required
        clearable
        placeholder="商品分类名"
      />
      <van-field
        v-model="form.num"
        type="number"
        required
        clearable
        name="排序数值"
        label="排序数值："
        placeholder="越大越靠前"
      />
      <div class="btn_warp">
        <van-button class="btn" round @click="onSubmit">保存</van-button>
        <van-button v-show="isShowDeteleBtn" class="btn detele" round @click="deleteGoods">删除</van-button>
      </div>
    </div>
  </van-cell-group>
</template>
<script>
export default {
  props: {
    isShowDeteleBtn: {
      type: Boolean,
      default: false
    },
    editForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // editForm: JSON.parse(window.sessionStorage.getItem('siderForm'))
      //   ? JSON.parse(window.sessionStorage.getItem('siderForm'))
      //   : {},
      form: {
        classifyName: '',
        num: ''
      }
    }
  },
  watch: {
    editForm: {
      handler() {
        console.log('111')
      },
      deep: true
    }
  },
  // created() {
  //   if (this.editForm) {
  //     this.form.classifyName = editForm.categoryName
  //     this.form.num = editForm.sort
  //   }
  // },
  methods: {
    onSubmit() {
      if (this.form.classifyName || this.form.num) {
        return this.$toast.fail('请填写相应信息！')
      }
      this.$emit('onSubmit', this.form)
      this.form.classifyName = ''
      this.form.num = ''
    },
    deleteGoods() {
      this.$emit('deleteCategory', this.form)
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
