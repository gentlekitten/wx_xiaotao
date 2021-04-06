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
    </div>
    <tabs :tab-list="tabsList" :sticky="true" tabsIndexName="tabActiveOrderPeopleOrder">
      <snack-order-list :order-list="orderList" @toOrderDetails="toOrderDetails" />
    </tabs>
  </div>
</template>
<script>
import Tabs from '@/components/common/Tabs.vue'

import SnackOrderList from '@/components/manage/snackShopOrder/SnackOrderList.vue'

export default {
  components: {
    Tabs,
    SnackOrderList
  },
  data() {
    return {
      searchValue: '',
      tabsList: [
        {
          title: '全部单'
        },
        {
          title: '待受理'
        },
        {
          title: '已受理'
        },
        {
          title: '已完成'
        }
      ],
      orderList: [
        {
          id: 0,
          status: 200,
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name:
            '卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣卫衣',
          price: '9.9',
          num: '1',
          totalPrice: '9.9',
          realPrice: '9.9'
        }
      ]
    }
  },
  methods: {
    searchConfirm() {},
    toOrderDetails() {
      this.$router.push('/orderDetailsOfManage')
    }
  }
}
</script>
<style lang="less" scoped>
.search_warp {
  display: flex;
  padding: 0 1rem;
  background-color: #fff;
  align-items: center;
  .search {
    width: 80%;
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
}
</style>
