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
      <van-button class="search_btn" round @click="searchConfirm"
        >搜索</van-button
      >
    </div>
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      tabsIndexName="tabActiveOrderPeopleOrder"
      @clickTab="clickTab"
    >
      <van-list
        v-if="myTaskList.length > 0"
        v-model="loading"
        :finished="finished"
        finished-text="哼，我也是有底线的~"
        :immediate-check="false"
        :offset="0"
        @load="ListLoading"
      >
        <tast-list :taskList="myTaskList" @clickTast="sendTaskInfo" />
      </van-list>
      <van-empty v-else description="暂无该内容哦~" />
    </tabs>
  </div>
</template>
<script>
import Tabs from '@/components/common/Tabs.vue'

import { getData } from '@/api/api.js'

import TastList from '@/components/orderPeople/TastList.vue'

export default {
  components: {
    Tabs,
    TastList,
  },
  data() {
    return {
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      searchValue: '',
      isSearch: false,
      loading: false,
      finished: false,
      pageIndex: 0,
      searchPageIndex: 1,
      tabindex: Number(sessionStorage.getItem('tabActiveOrderPeopleOrder'))
        ? Number(sessionStorage.getItem('tabActiveOrderPeopleOrder'))
        : 0,
      tabsList: [
        {
          title: '全部单',
        },
        {
          title: '已接单',
        },
        {
          title: '已完成',
        },
      ],
      myTaskList: [],
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    // 获取任务列表
    async getTaskList() {
      let data = {
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      let url = null
      if (this.tabindex === 1 || this.tabindex === 2) {
        data.state = this.tabindex + 1
        url = '/site/delivery/order/state/detail'
      } else {
        data = {
          pageIndex: this.pageIndex,
          pageLimit: 10,
        }
        url = '/site/delivery/order/receive/detail'
      }
      const res = await getData(url, data, {
        showLoading: true,
      })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        this.myTaskList.push(...res.data.deliveryOrder)
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    ListLoading() {
      if (this.isSearch) {
        this.onloadSearchList()
        return false
      }
      this.myTaskList.length > 0 && this.getTaskList()
    },
    // 加载搜索上拉数据
    async onloadSearchList() {
      const data = {
        title: this.searchValue,
        pageIndex: this.searchPageIndex,
        pageLimit: 10,
      }
      const res = await getData('/site/delivery/order/title/search', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.myTaskList = [...this.myTaskList, ...res.data.deliveryOrder]
        this.searchPageIndex += 1
        if (this.searchPageIndex * 10 >= res.data.jobNumber) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 点击搜索
    async searchConfirm() {
      if (!this.searchValue) {
        return this.$toast.fail('搜索内容不能为空哦！')
      }
      const data = {
        title: this.searchValue,
        pageIndex: 0,
        pageLimit: 10,
      }
      const res = await getData('/site/delivery/order/title/search', data, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        if (this.tabindex === 1 || this.tabindex === 2) {
          this.myTaskList = res.data.deliveryOrder.filter((e) => {
            return e.state === this.tabindex + 1
          })
          return false
        }
        this.myTaskList = res.data.deliveryOrder
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 切换tab
    clickTab(index) {
      this.tabindex = index
      this.pageIndex = 0
      this.searchPageIndex = 1
      this.finished = false
      this.isSearch = false
      this.myTaskList = []
      this.getTaskList()
    },
    sendTaskInfo(id) {
      this.$router.push(`/orderPeople/sendTaskInfoView?id=${id}`)
    },
  },
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
