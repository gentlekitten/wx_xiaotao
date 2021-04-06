<template>
  <div>
    <!-- 顶部 navbar -->
    <top-search autofocus @searchConfirm="searchConfirm" />
    <div style="height: 2.6rem"></div>
    <div class="tip">若想搜索商品相关的内容，请返回，到商城中搜索</div>
    <template>
      <div class="search_item">
        <div class="text">热门搜索</div>
        <i class="line" />
        <div class="content">
          <template v-if="hotList.length > 0">
            <van-button class="btn" v-for="(item, index) in hotList" :key="item + index">{{ item }}</van-button>
          </template>
        </div>
      </div>
      <div class="search_item">
        <div class="text">历史搜索</div>
        <i class="line" />
        <div class="content">
          <template v-if="historyList.length > 0">
            <van-button
              class="btn"
              v-for="(item, index) in historyList"
              :key="item + index"
              @click="toSearch(item)"
            >{{ item }}</van-button>
          </template>
        </div>
        <van-icon class="icon" name="cross" size="1.5rem" @click="clearHistorySearch" />
      </div>
    </template>
  </div>
</template>
<script>
import TopSearch from '@/components/shoping/TopSearch.vue'

export default {
  components: {
    TopSearch
  },
  data() {
    return {
      hotList: [],
      historyList: []
    }
  },
  methods: {
    searchConfirm(value) {
      this.historyList = this.historyList.filter(i => {
        return i !== value
      })
      this.historyList.push(value)
      this.isSearch = true
      this.$router.push('/searchReslut?value=' + value)
    },
    // 清空历史搜索
    clearHistorySearch() {
      this.historyList = []
    },
    // 点击热门或历史搜索
    toSearch() {}
  }
}
</script>
<style lang="less" scoped>
.search_item {
  padding: 1rem;
  position: relative;
  .text {
    font-size: 1rem;
    color: #666;
  }
  .line {
    display: block;
    height: 1px;
    background-color: #ccc;
    margin: 1rem 0;
  }
  .btn {
    margin-right: 1rem;
    height: 2.5rem;
  }
  .icon {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    background-color: #999;
    border-radius: 50%;
    color: #fff;
  }
}
.tip {
  width: 100%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  font-size: 0.8rem;
}
</style>
