<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="领跑者申请详细信息" is-arrow isBackUp />
    <div class="content_warp">
      <div class="content">
        <van-cell title="姓名：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.customerName }}</div>
          </template>
        </van-cell>
        <van-cell title="性别：">
          <template #default>
            <div class="info">
              {{ orderPeopleDetails.sex === 0 ? '男' : '女' }}
            </div>
          </template>
        </van-cell>
        <van-cell title="身份证：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.idNumber }}</div>
          </template>
        </van-cell>
        <van-cell title="楼栋：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.apartment }}</div>
          </template>
        </van-cell>
        <van-cell title="学历：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.qualification }}</div>
          </template>
        </van-cell>
        <van-cell title="年级：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.grade }}</div>
          </template>
        </van-cell>
        <van-cell title="学号：">
          <template #default>
            <div class="info">{{ orderPeopleDetails.studentNumber }}</div>
          </template>
        </van-cell>
        <van-cell title="手机号：">
          <template #default>
            <div class="phone" @click="toPhone(orderPeopleDetails.phone)">
              {{ orderPeopleDetails.phone }}
            </div>
          </template>
        </van-cell>
        <van-cell class="img_warp" title="证照：">
          <template #default>
            <img
              v-for="(item, index) in orderPeopleDetails.deliveryPersonPics"
              :key="item.id"
              :src="imgBaseUrl + item.picAddress"
              @click="
                imagePreview(orderPeopleDetails.deliveryPersonPics, index)
              "
            />
          </template>
        </van-cell>
        <div v-if="state === '2'" class="btn_warp">
          <van-button class="btn" type="primary" round @click="handleClick(1)"
            >同意</van-button
          >
          <van-button class="btn refuse" round @click="handleClick(0)"
            >拒绝</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      id: 0,
      state: 0,
      orderPeopleDetails: {},
    }
  },
  created() {
    this.id = this.$route.query.id
    this.state = this.$route.query.state
    this.getOrderPeopleDetails()
  },
  methods: {
    // 获取信息
    async getOrderPeopleDetails() {
      const res = await getData(
        '/site/delivery/person/info/find',
        { id: this.id },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.orderPeopleDetails = res.data
        return false
      }
      this.$handleCode.handleCode(res)
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
    toPhone(phone) {
      window.location.href = 'tel:' + phone
    },
    // 处理点击按钮
    async handleClick(state) {
      const data = {
        id: this.id,
        state,
      }
      const res = await getData('/site/delivery/person/state/update', data, {
        showLoading: true,
      })
      if (res.code === '0') {
        this.$toast.success('操作成功！')
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
.content_warp {
  .content {
    .img_warp {
      height: 6rem;
      img {
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
      }
    }
  }
  .phone {
    color: cadetblue;
  }
}
.btn_warp {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  .btn {
    margin: 0 0 4rem 0;
    width: 8rem;
    height: 2.8rem;
  }
  .refuse {
    color: @priceColor;
    border: 1px solid @priceColor;
    background-color: #fff;
  }
}
.van-cell__title {
  font-size: 1rem;
  font-weight: 900;
}
.van-cell__value {
  text-align: left;
  margin-left: -14rem;
  font-size: 0.8rem;
}
</style>
