<template>
  <div>
    <self-nav-bar class="nav_bar_bg" :backTo="backTo">
      <template v-slot:left>
        <van-icon class="icon" name="arrow-left" size="1rem" />
      </template>
      <template v-slot:center>
        <van-search
          class="search"
          v-model="searchValue"
          background="#fff"
          clearable
          shape="round"
          :autofocus="autofocus"
          placeholder="请输入搜索关键词"
        />
      </template>
      <template v-slot:right>
        <van-button class="search_btn" round @click="searchConfirm">搜索</van-button>
      </template>
    </self-nav-bar>
  </div>
</template>
<script>
import SelfNavBar from '@/components/common/SelfNavBar.vue'

export default {
  components: {
    SelfNavBar
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    backTo: {
      type: String,
      default:''
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  watch: {
    tabIndex() {
      this.searchValue = ''
    }
  },
  methods: {
    searchConfirm() {
      if (this.searchValue) {
        window.sessionStorage.setItem('indexSearchValue', this.searchValue)
        this.$emit('searchConfirm', this.searchValue)
        return false
      }
      this.$toast.fail('请输入搜索内容')
    }
  }
}
</script>
<style lang="less" scoped>
.nav_bar_bg {
  background-color: #fff;
}
.icon {
  color: #999;
}
.search {
  width: 100%;
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
</style>