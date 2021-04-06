<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="分类设置" is-arrow isBackUp />
    <div class="select_warp">
      <div class="title">选择分类</div>
      <div class="item_warp">
        <van-radio-group v-model="form.radioValue" @change="radioChange">
          <van-radio class="item" v-for="item in radioList" :key="item.name" :name="item.name">衣服</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="add_warp">
      <div class="title">新增分类</div>
      <div class="item_warp">
        <van-cell-group>
          <van-field v-model="form.classifyName" label="分类名称" placeholder="类别名称" />
          <van-field v-model.number="form.num" label="排序数值" placeholder="越大越靠前" />
        </van-cell-group>
      </div>
    </div>
    <div class="submit_btn">
      <van-button class="btn" round @click="saveClassify">保存新增分类</van-button>
    </div>
  </div>
</template>
<script>
import { upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        radioValue: '',
        classifyName: '',
        num: ''
      },
      radioList: [
        {
          name: 6,
          text: '纸'
        }
      ]
    }
  },
  computed: {
    getCategoryId() {
      return this.$store.getters.categoryId
    }
  },
  mounted() {
    // this.form.radioValue = this.getCategoryId
  },
  methods: {
    radioChange() {
      this.$store.commit('addGoods/CATEGORY_ID', this.form.radioValue)
      sessionStorage.setItem(
        'addGoods',
        JSON.stringify(this.$store.state.addGoods)
      )
      this.$router.go(-1)
    },
    async saveClassify() {
      const data = {
        categoryName: this.form.classifyName,
        sort: this.form.num,
        shopId: 23
      }
      const res = await upData('/product/category/add', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('添加成功！')
        return false
      }
      return this.$toast.fail(res.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.select_warp {
  box-sizing: border-box;
  .title {
    padding: 0.8rem;
    font-weight: 900;
  }
  .item_warp {
    background-color: #fff;
    .item {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
  }
}
.add_warp {
  box-sizing: border-box;
  .title {
    padding: 0.8rem;
    font-weight: 900;
  }
}
.submit_btn {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  .btn {
    width: @buttonWidth;
    height: 2.8rem;
    color: #997a00;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>
