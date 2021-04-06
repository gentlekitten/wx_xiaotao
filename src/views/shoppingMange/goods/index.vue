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
      <top-popup
        :isShowDeteleBtn="isShowDeteleBtn"
        @onSubmit="saveAlassify"
        @deleteGoods="deleteGoods"
      />
    </van-popup>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

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
      searchValue: '',
      isEdit: false,
      topPopupIsShow: false,
      //   弹出层删除按钮
      isShowDeteleBtn: false,
      sidebarActiveKey: 0,
      sidebarList: [
        {
          title: '全部分类'
        },
        {
          title: '优惠商品'
        },
        {
          title: '休闲零食'
        },
        {
          title: '辣条'
        },
        {
          title: '饮料类'
        },
        {
          title: '泡面'
        },
        {
          title: '香烟类'
        },
        {
          title: '香烟类'
        },
        {
          title: '饮料类'
        },
        {
          title: '泡面'
        },
        {
          title: '香烟类'
        },
        {
          title: '香烟类'
        }
      ],
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const res = await getData(
        '/product/list',
        { id: 23 },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.goodsList = res.data
        return false
      }
      return this.$toast.fail(res.msg)
    },
    searchConfirm() {},
    clickEditBtn() {
      this.isEdit = !this.isEdit
    },
    // 保存分类
    saveAlassify(form) {},
    // 删除分类
    async deleteGoods() {
      const res = await getData(
        '/product/category/delete',
        { id: 1 },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$router.go(0)
        return false
      }
      return this.$toast.fail(res.msg)
    },
    editGoodsName() {
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
            { id: item.id, shopId: 23 },
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
::v-deep .van-sidebar {
  width: 100% !important;
}
</style>
