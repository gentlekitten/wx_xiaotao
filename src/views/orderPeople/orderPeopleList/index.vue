<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="本站全部领跑者" is-arrow isBackUp>
      <template v-slot:right_icon>
        <van-icon name="plus" size="1.5rem" @click="toRegist" />
      </template>
    </nav-bar>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="当前接单中的领跑者" name="1">
        <div class="user_list">
          <div v-for="(item, index) in orderPeopleList" :key="item.id + index">
            <div v-if="item.state === 1" class="user_warp">
              <div class="user_img">
                <img :src="item.customerInfo.headimgurl" @click="clickUserImg" />
                <i
                  class="iconfont icon"
                  :class="[ item.sex === 0 ? 'icon-nan nan' : 'icon-nv nv' ]"
                />
              </div>
              <div class="username">{{ item.customerName }}</div>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="当前休息中的领跑者" name="2">
        <div class="user_list">
          <div v-for="(item, index) in orderPeopleList" :key="item.id + index">
            <div v-if="item.state === 3" class="user_warp">
              <div class="user_img">
                <img :src="item.customerInfo.headimgurl" />
                <i
                  class="iconfont icon"
                  :class="[ item.sex === 0 ? 'icon-nan nan' : 'icon-nv nv' ]"
                />
              </div>
              <div class="username">{{ item.customerName }}</div>
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="tip">
      提交申请认证成为零跑者
      <br />校内兼职接单赚零钱
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
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      activeNames: '1',
      popupIsShow: false,
      orderPeopleList: []
    }
  },
  created() {
    this.getOrderPelpleList()
  },
  methods: {
    // 获取领跑者列表
    async getOrderPelpleList() {
      const res = await getData(
        '/site/delivery/person/state/find',
        {
          siteId: this.siteId
        },
        { showLoading: false }
      )
      console.log(res)
      if (res.code === '0') {
        this.orderPeopleList = res.data
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toRegist() {
      this.$router.push('/orderPeople/registerOrderPeople')
    },
    clickUserImg() {
      this.$router.push('/chatView')
    }
  }
}
</script>
<style lang="less" scoped>
.user_list {
  padding: 1rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .user_warp {
    width: 15%;
    height: 5rem;
    margin: 0 1.5rem 1rem 0;
    .user_img {
      position: relative;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .icon {
        width: 1.3rem;
        height: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: -3rem;
        border-radius: 50%;
        opacity: 0.8;
      }
      .nan {
        background-color: #2248dd;
      }
      .nv {
        background-color: #ee1169;
      }
    }
    .username {
      width: 3rem;
      text-align: center;
    }
  }
}
.tip {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  background-color: #fff;
  margin-top: 3rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
}
::v-deep .van-cell__title {
  font-size: 0.8rem;
  font-weight: 900;
}
</style>
