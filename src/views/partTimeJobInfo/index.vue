<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="兼职信息" is-arrow backTo="/index" />
    <div class="top_warp">
      <div class="title">昆明冶金高等专科学校安宁校区兼职信息墙</div>
      <div class="info_num">{{ infoTotalNum }}条兼职信息</div>
    </div>
    <tabs
      :tab-list="tabsList"
      :sticky="true"
      tabsIndexName="tabActiveIndexPartTime"
      @clickTab="clickTab"
    >
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
      <div v-if="infoList.length > 0" class="content_warp">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="哼，我也是有底线的~"
          :immediate-check="false"
          @load="infoOnLoad"
        >
          <info-list
            :info-list="infoList"
            @showOverlay="handleMyInfo"
            @toInfoDetailsView="toInfoDetailsView"
          />
        </van-list>
      </div>
      <van-empty v-else description="没有该消息哦~" />
    </tabs>
    <div class="add_info" @click="toAddInfoView">发布</div>
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <div class="wrapper">
        <div class="content">
          <van-button class="btn" round type="primary" @click="updateMyInfo">修改</van-button>
          <van-button class="btn" round type="danger" @click="deleteMyInfo">删除</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'
import { Dialog } from 'vant'

import NavBar from '@/components/common/NavBar.vue'
import Tabs from '@/components/common/Tabs.vue'

import InfoList from '@/components/partTimeJobInfo/InfoList.vue'

export default {
  components: {
    NavBar,
    Tabs,
    InfoList
  },
  data() {
    return {
      searchValue: '',
      overlayIsShow: false,
      loading: false,
      finished: false,
      infoTotalNum: 0,
      // 起始数据
      pageIndex: 0,
      // 请求数据量
      pageLimit: 5,
      // 搜索起始数据
      searchPageIndex: 1,
      //  我的信息起始数据
      myInfoPageIndex: 0,
      searchNum: 0,
      isSearch: false,
      tabIndex: Number(sessionStorage.getItem('tabActiveIndexPartTime'))
        ? Number(sessionStorage.getItem('tabActiveIndexPartTime'))
        : 0,
      tabsList: [
        {
          title: '本校'
        },
        {
          title: '同城'
        },
        {
          title: '我的'
        }
      ],
      infoList: [
        // {
        //   id: 0,
        //   img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        //   sex: 0,
        //   name: '哈哈哈哈',
        //   title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        //   price: '100',
        //   value:
        //     '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        //   img_list: [
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg'
        //   ],
        //   time: '12-08 13:00'
        // },
        // {
        //   id: 1,
        //   img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        //   sex: 1,
        //   name: '哈哈哈哈',
        //   title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        //   price: '100',
        //   value:
        //     '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        //   img_list: [
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg',
        //     'https://img01.yzcdn.cn/vant/cat.jpeg'
        //   ],
        //   time: '12-08 13:00'
        // }
      ]
    }
  },
  created() {
    this.getInfoTotalNum()
    this.getInfoList()
  },
  methods: {
    async getInfoTotalNum() {
      const { data: res } = await getData('/site/job/info/num')
      this.infoTotalNum = res.jobNumber
    },
    async getInfoList() {
      if (this.tabIndex === 2) {
        const data = {
          pageIndex: this.myInfoPageIndex,
          pageLimit: 10
        }
        const res = await getData('/site/job/info/find/customer', data, {
          showLoading: true
        })
        if (res.code === '0') {
          this.infoList = res.data.jobInfo
          this.pageIndex += this.infoList.length
          console.log(res)
          return false
        }
        return this.$toast.fail(res.msg)
      }
      // console.log(this.pageIndex)

      const data = {
        siteId: 1,
        category: this.tabIndex,
        pageIndex: this.pageIndex,
        pageLimit: this.pageLimit
      }
      // console.log(totalNum)

      const res = await getData('/site/job/info/find', data, {
        showLoading: true
      })
      console.log(res)

      this.loading = false
      if (res.code === '0') {
        this.infoList = [...this.infoList, ...res.data.jobInfo]
        this.pageIndex += 1
        if (this.pageIndex * this.pageLimit >= res.data.jobNumber) {
          this.finished = true
        }
        return false
      }
      return this.$toast.fail(res.msg)
    },
    async infoOnLoad() {
      if (this.isSearch) {
        this.onloadSearchList()
        return false
      }
      this.getInfoList()
    },
    toInfoDetailsView(item) {
      sessionStorage.setItem('partTimeDetailInfoObj', JSON.stringify(item))
      this.$router.push('/partTimeJobInfo/partTimeJobInfoDetails')
    },
    // 加载搜索上拉数据
    async onloadSearchList() {
      const data = {
        title: this.searchValue,
        category: this.tabIndex,
        pageIndex: this.searchPageIndex,
        pageLimit: 10
      }
      const res = await getData('/site/job/info/search', data, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.infoList = [...this.infoList, ...res.data.jobInfo]
        this.searchPageIndex += 1
        if (this.searchPageIndex * 5 >= res.data.jobNumber) {
          this.finished = true
        }
        return false
      }
      return this.$toast.fail(res.msg)
    },
    // 点击搜索
    async searchConfirm() {
      this.isSearch = true
      if (this.searchValue) {
        const data = {
          title: this.searchValue,
          category: this.tabIndex,
          pageIndex: 0,
          pageLimit: 10
        }
        const res = await getData('/site/job/info/search', data, {
          showLoading: true
        })
        console.log(res)
        if (res.code === '0') {
          this.infoList = [...res.data.jobInfo]
          console.log(this.infoList)

          return false
        }
        return this.$toast.fail(res.msg)
      }
      this.$toast.fail('请输入搜索内容')
    },
    handleMyInfo(item) {
      this.overlayIsShow = true
      sessionStorage.setItem('partTimeObj', JSON.stringify(item))
    },
    toAddInfoView() {
      this.$router.push('/partTimeJobInfo/addInfo')
    },
    updateMyInfo() {
      this.$router.push(`/partTimeJobInfo/addInfo?type=${1}`)
    },
    // 点击tabs
    clickTab(name) {
      this.infoList = []
      this.pageIndex = 0
      this.searchPageIndex = 1
      this.finished = false
      this.isSearch = false
      this.searchValue = ''
      this.tabIndex = name
      this.getInfoList()
    },
    deleteMyInfo() {
      Dialog.confirm({
        message: '确认删除该信息吗？'
      })
        .then(async () => {
          const data = {
            id: 2
          }
          const res = await getData('/site/job/info/delete', data, {
            showLoading: true
          })
          console.log(res)
          if (res.code === '0') {
            return this.$toast.success('删除成功！')
          }
          return this.$toast.fail(res.msg)
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.top_warp {
  padding: 1rem;
  box-sizing: border-box;
  background-image: url('https://img01.yzcdn.cn/vant/cat.jpeg');
  width: 100%;
  height: 10rem;
  text-align: center;
  color: #fff;
  line-height: 2rem;
  .title {
    margin-top: 2rem;
    font-weight: 900;
  }
  .info_num {
    font-size: 0.8rem;
    margin-top: 1rem;
  }
}
.search_warp {
  display: flex;
  margin-top: 0.8rem;
  padding: 0.8rem 1rem;
  justify-content: space-between;
  background-color: #fff;
  .search {
    width: 75%;
    margin-right: -1rem;
    border-radius: 5rem;
    border: 2px solid @themeColor;
    .van-cell {
      height: 2rem;
    }
  }
  .search_btn {
    width: 5rem;
    height: 2rem;
    background-color: @themeColor;
    color: #fff;
  }
}
.content_warp {
  box-sizing: border-box;
  position: relative;
}
.add_info {
  position: fixed;
  bottom: 2rem;
  left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: #21b668;
  border-radius: 50%;
  color: #fff;
  opacity: 0.8;
}
.wrapper {
  display: flex;
  margin-top: 5rem;
  justify-content: center;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 60%;
    height: 13rem;
    background-color: #fff;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    .btn {
      width: 8rem;
      height: 2.5rem;
    }
  }
}
</style>