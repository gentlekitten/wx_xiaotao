<template>
  <div>
    <div class="search_warp">
      <van-search
        class="search"
        v-model="searchValue"
        background="#fff"
        clearable
        shape="round"
        placeholder="请输入搜索关键词"
      />
      <van-button class="search_btn" round @click="searchConfirm">搜索</van-button>
      <van-icon class="edit_icon" name="edit" color="#f2af49" size="1.5rem" @click="clickEditBtn" />
    </div>
    <div v-show="isEdit" class="btn_warp animated fadeIn">
      <van-button class="btn" round @click="addGoods">新增商品</van-button>
      <van-button class="btn" round @click="topPopupIsShow = true">新增分类</van-button>
    </div>
    <div class="content" :class="{'is_edit': isEdit}">
      <!-- 左侧侧边栏 -->
      <sidebar
        class="sidebar"
        :is-edit="isEdit"
        :sidebar-list="sidebarList"
        @editGoodsName="editGoodsName"
        @sidebarChange="sidebarChange"
      />
      <div class="right_warp">
        <goods-list
          v-for="items in goodsList"
          :key="items.id"
          :is-edit="isEdit"
          :goods-list="items.productInfos"
          @toEditGoods="toEditGoods"
          @deleteGoods="deleteGoods"
        />
      </div>
    </div>
    <!-- 弹出框 -->
    <van-popup
      class="popup"
      v-model="topPopupIsShow"
      closeable
      round
      position="top"
      @closed="isShowDeteleBtn = false"
    >
      <van-cell-group>
        <div class="form">
          <van-field
            v-model="form.categoryName"
            name="分类名称"
            label="分类名称："
            required
            clearable
            placeholder="商品分类名"
          />
          <van-field
            v-model="form.sort"
            type="number"
            required
            clearable
            name="排序数值"
            label="排序数值："
            placeholder="越大越靠前"
          />
          <div class="popup_btn_warp">
            <van-button class="btn" round @click="saveAlassify">保存</van-button>
            <van-button v-show="isShowDeteleBtn" class="btn detele" round @click="deleteCategory">删除</van-button>
          </div>
        </div>
      </van-cell-group>
      <!-- <top-popup
        :edit-form="form"
        :isShowDeteleBtn="isShowDeteleBtn"
        @onSubmit="saveAlassify"
        @deleteGoods="deleteCategory"
      />-->
    </van-popup>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import Sidebar from '@/components/manage/Sidebar.vue'
import TopPopup from '@/components/manage/TopPopup.vue'

import GoodsList from '@/components/manage/goods/GoodsList.vue'

export default {
  components: {
    Sidebar,
    TopPopup,
    GoodsList
  },
  data() {
    return {
      shopId: '',
      // 分类添加表单
      form: {
        categoryName: '',
        sort: ''
      },
      searchValue: '',
      isEdit: false,
      topPopupIsShow: false,
      //   弹出层删除按钮
      isShowDeteleBtn: false,
      sidebarActiveKey: 0,
      sidebarList: [],
      goodsList: [],
      goodsListCopy: []
    }
  },
  created() {
    this.shopId = window.sessionStorage.getItem('shopId')
    this.getGoodsList()
    this.getCategoryList()
  },
  watch: {
    topPopupIsShow() {
      if (!this.topPopupIsShow) {
        // 清空输入框
        this.form.categoryName = ''
        this.form.sort = ''
      }
    }
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const res = await getData(
        '/product/list',
        { id: this.shopId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        // res.data.forEach(e => {

        // })
        this.goodsList = res.data
        this.goodsListCopy = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取分类
    async getCategoryList() {
      const res = await getData(
        '/product/category/find',
        {
          shopId: this.shopId
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.sidebarList = res.data
        this.sidebarList.sort(this.handleSort)
        this.sidebarList.unshift({ categoryName: '全部分类', id: -19 })
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理侧边栏排序和商品排序
    handleSort(a, b) {
      return b.sort - a.sort
    },
    // 侧边栏改变
    sidebarChange(index) {
      this.goodsList = this.goodsListCopy
      const id = this.sidebarList[index].id
      // 判断是否是全部分类
      if (id === -19) {
        return false
      }
      this.goodsList = this.goodsList.filter(e => {
        return e.id === id
      })
    },
    searchConfirm() {},
    clickEditBtn() {
      this.isEdit = !this.isEdit
    },
    // 新增或保存分类
    async saveAlassify() {
      const form = this.form
      if (!form.categoryName || !form.sort) {
        return this.$toast.fail('请填写相应信息！')
      }
      let url = ''
      let data = {}
      if (this.isShowDeteleBtn) {
        url = '/product/category/update'
        data = {
          id: form.id,
          categoryName: form.categoryName,
          sort: form.sort,
          shopId: this.shopId
        }
      } else {
        url = '/product/category/add'
        data = {
          categoryName: form.categoryName,
          sort: form.sort,
          shopId: this.shopId
        }
      }
      const res = await upData(url, data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.getCategoryList()
        this.topPopupIsShow = !this.topPopupIsShow
        this.form.categoryName = ''
        this.form.sort = ''
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 删除分类
    async deleteCategory() {
      const data = {
        id: this.form.id,
        shopId: this.shopId
      }
      const res = await getData('/product/category/delete', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.topPopupIsShow = !this.topPopupIsShow
        this.getCategoryList()
        return false
      }
      this.$handleCode.handleCode(res)
    },
    editGoodsName(item) {
      this.form = this._.cloneDeep(item)
      this.topPopupIsShow = true
      this.isShowDeteleBtn = true
    },
    // 删除商品
    deleteGoods(item) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '请确保该商品库存数量为0，是否确认删除？'
        })
        .then(async () => {
          const res = await getData(
            '/product/delete',
            { id: item.id, shopId: this.shopId },
            { showLoading: true }
          )
          console.log(res)
          if (res.code === '0') {
            this.$router.go(0)
            return false
          }
          return this.$toast.fail(res.msg)
        })
        .catch(() => {
          // on cancel
        })
    },
    addGoods() {
      this.$router.push(`/shoppingMange/addGoods?type=add`)
    },
    toEditGoods() {
      this.$router.push(`/shoppingMange/addGoods?type=edit`)
    }
  }
}
</script>
<style lang="less" scoped>
.popup {
  height: 10rem;
}
.search_warp {
  display: flex;
  padding: 0 1rem;
  background-color: #fff;
  align-items: center;
  .search {
    width: 65%;
    height: 3.5rem;
    margin-right: 1rem;
    .van-cell {
      height: 2rem;
    }
    .van-search__content {
      border: 2px solid @themeColor;
    }
  }
  .search_btn {
    width: 5rem;
    height: 2rem;
    background-color: @themeColor;
    color: #fff;
  }
  .edit_icon {
    margin-left: 1rem;
  }
}
.btn_warp {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
  background-color: #eee;
  .btn {
    width: 6rem;
    height: 2rem;
    font-size: 0.8rem;
  }
}
.is_edit {
  top: 10.4rem !important;
}
.content {
  overflow: hidden;
  position: fixed;
  top: 6.3rem;
  bottom: 0;
  left: 0;
  right: 0;
  .sidebar {
    float: left;
    overflow: auto;
    height: 100%;
    width: 25%;
  }
  .right_warp {
    float: left;
    overflow: auto;
    height: 100%;
    width: 75%;
    background-color: #fff;
    box-sizing: border-box;
    overflow: scroll;
    padding-bottom: 5rem;
  }
}
.form {
  padding: 1rem;
  .popup_btn_warp {
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
::v-deep .van-sidebar {
  width: 100% !important;
}
</style>
