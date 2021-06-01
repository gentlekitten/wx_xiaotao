<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="零食铺楼栋配置" is-arrow isBackUp />
    <div class="tip">
      本设置是用来添加
      <span>零食铺</span>&nbsp;楼栋
      <br />（推荐名字：**栋零食铺）
    </div>
    <van-field v-model="form.apartmentName" center clearable label="楼栋名" placeholder="请输入零食铺楼栋名">
      <template #button>
        <van-button class="add_btn" size="small" type="primary" round @click="addSnackShopName">添加</van-button>
      </template>
    </van-field>
    <div class="express_list_warp">
      <div class="express">
        <div class="title">当前你所添加的零食铺楼栋</div>
        <template v-if="snackShopList.length > 0">
          <div class="list" v-for="item in snackShopList" :key="item.id">
            {{ item.name }}
            <van-button class="dele_btn" round @click="deleteSnackShopName(item)">删除</van-button>
          </div>
        </template>
        <van-empty v-else description="还没有添加零食铺楼栋哦~" />
      </div>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        apartmentName: '',
        siteId: JSON.parse(window.sessionStorage.getItem('mySiteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('mySiteInfo')).id
          : 0
      },
      snackShopList: []
    }
  },
  created() {
    this.getSnackShopList()
  },
  methods: {
    // 获取零食铺楼栋
    async getSnackShopList() {
      const res = await getData(
        '/shop/snack/apart/find',
        { siteId: this.form.siteId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        res.data.forEach(e => {
          this.snackShopList.push({
            name: e.apartmentName,
            id: e.id,
            shopState: e.shopState
          })
        })
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 添加零食铺楼栋
    async addSnackShopName() {
      if (!this.form.apartmentName) {
        return this.$toast.fail('请填写楼栋名！')
      }
      const res = await upData('/site/apart/add', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.form.apartmentName = ''
        this.snackShopList.push({
          id: res.data.id,
          name: res.data.apartmentName
        })
        return this.$toast.success('添加成功！')
      }
      this.$handleCode.handleCode(res)
    },
    // 删除零食铺楼栋
    async deleteSnackShopName(item) {
      if (item.shopState === 0 || item.shopState === '') {
        return this.$toast.fail('当前店铺楼栋正在被占用，不能删除！')
      }
      const res = await upData(
        '/site/apart/delete',
        { id: item.id, siteId: this.form.siteId },
        {
          showLoading: true
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('删除成功！')
        return this.getSnackShopList()
      }
      this.$handleCode.handleCode(res)
    }
  }
}
</script>
<style lang="less" scoped>
.tip {
  text-align: center;
  margin: 1rem 0;
  line-height: 1.5rem;
  color: #999;
  font-size: 0.8rem;
  span {
    color: cadetblue;
  }
}
.add_btn {
  height: 1.8rem;
  width: 3.5rem;
  font-size: 0.8rem;
  color: #997a00;
  background-color: #ffe788;
  border: 1px solid #ffe788;
}
.express_list_warp {
  margin-top: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  .express {
    .title {
      font-weight: 900;
      text-align: center;
    }
    .list {
      color: #999;
      height: 2.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.5rem;
      .dele_btn {
        height: 1.8rem;
        font-size: 0.8rem;
      }
    }
    .list:nth-child(odd) {
      background-color: #fdf5e6;
    }
  }
}
</style>