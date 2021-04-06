<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="意见反馈详细信息" is-arrow isBackUp />
    <van-cell class="value_cell" title="反馈内容：">
      <template #default>
        <div class="value">{{ feedBackDetails.msg }}</div>
      </template>
    </van-cell>
    <van-cell title="邮箱：">
      <template #default>
        <div class="value">{{ feedBackDetails.email }}</div>
      </template>
    </van-cell>
    <div v-if="state === '0'" class="btn_warp">
      <van-button class="btn" type="primary" round @click="handleConsent">我已知悉</van-button>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: 0,
      state: 2,
      feedBackDetails: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    this.state = this.$route.query.state
    this.getFeedBackDetails()
  },
  methods: {
    async getFeedBackDetails() {
      const res = await getData(
        '/site/opinion/id/find',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return (this.feedBackDetails = res.data)
      }
      return this.$toast.fail(res.msg)
    },
    async handleConsent() {
      const res = await getData(
        '/site/opinion/id/update',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('操作成功！')
        return this.$router.go(-1)
      }
      return this.$toast.fail(res.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.value_cell {
  height: 10rem;
}
.btn_warp {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  .btn {
    margin: 0 0 4rem 0;
    width: @buttonWidth;
    height: 2.8rem;
  }
}
.van-cell__title {
  font-size: 1rem;
  font-weight: 900;
}
.van-cell__value {
  text-align: left;
  margin-left: -12rem;
  font-size: 0.8rem;
}
</style>