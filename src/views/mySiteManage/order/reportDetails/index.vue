<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="'举报' + reportDetails.shopInfo" is-arrow isBackUp />
    <van-cell class="lable_cell" title="描述：">
      <template #default>
        <div class="lable">{{ reportDetails.msg }}</div>
      </template>
    </van-cell>
    <van-cell title="手机号：">
      <template #default>
        <div class="phone" @click="toPhone(reportDetails.phone)">
          {{ reportDetails.phone }}
        </div>
      </template>
    </van-cell>
    <div class="img_warp">
      <div class="title">证据图片：</div>
      <div class="img">
        <img
          v-for="(item, index) in reportDetails.reportPics"
          :key="item.id"
          :src="imgBaseUrl + item.picAddress"
          @click="imagePreview(reportDetails.reportPics, index)"
        />
      </div>
    </div>
    <div v-if="state === '0'" class="btn_warp">
      <van-button class="btn" type="primary" round @click="handleConsent"
        >我已知悉</van-button
      >
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      id: 0,
      state: 1,
      reportDetails: {},
    }
  },
  created() {
    this.id = this.$route.query.id
    this.state = this.$route.query.state
    this.getReportDetails()
  },
  methods: {
    async getReportDetails() {
      const res = await getData(
        '/site/report/id/find',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        return (this.reportDetails = res.data)
      }
      return this.$toast.fail(res.msg)
    },
    imagePreview(item, index) {
      const imgUrlList = []
      item.forEach((e) => {
        imgUrlList.push(this.imgBaseUrl + e.picAddress)
      })
      ImagePreview({
        images: imgUrlList,
        startPosition: index,
      })
    },
    // 处理拨打电话事件
    toPhone(phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    async handleConsent() {
      const res = await getData(
        '/site/report/id/update',
        { id: this.id },
        { showLoading: true }
      )
      if (res.code === '0') {
        this.$toast.success('操作成功！')
        this.$router.go(-1)
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
.img_warp {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  .title {
    width: 21%;
    font-size: 1rem;
    font-weight: 900;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .img {
    width: 79%;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
}
.btn_warp {
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;
  .btn {
    margin: 0 0 4rem 0;
    width: @buttonWidth;
    height: 2.8rem;
  }
}
.lable_cell {
  height: 10rem;
  .lable {
    height: 100%;
  }
}
.phone {
  color: cadetblue;
}
.van-cell__title {
  font-size: 1rem;
  font-weight: 900;
}
.van-cell__value {
  text-align: left;
  margin-left: -14rem;
  font-size: 0.9rem;
}
</style>
