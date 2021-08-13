<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="信息详情" is-arrow isBackUp />
    <div class="content_warp">
      <div class="title">{{ infoDetailsObj.title }}</div>
      <div class="price">￥{{ infoDetailsObj.price }}</div>
      <div class="content">{{ infoDetailsObj.content }}</div>
      <div
        class="image_list"
        v-for="(item, index) in infoDetailsObj.siteJobPics"
        :key="index + item.id"
        @click="imagePreview(infoDetailsObj.siteJobPics, index)"
      >
        <img :src="imgBaseUrl + item.picAddress" />
      </div>
      <div class="tip">联系时请说明在小淘校园上看到的。</div>
      <div class="time">{{ infoDetailsObj.updateTime }}</div>
      <div v-if="infoDetailsObj.state === 2" class="status">已结束</div>
      <div class="user_info">
        <div class="images">
          <img :src="infoDetailsObj.customerInfo.headimgurl" />
          <i
            class="iconfont icon"
            :class="[
              infoDetailsObj.customerInfo.sex === 0
                ? 'icon-nan nan'
                : 'icon-nv nv',
            ]"
          />
        </div>
        <div class="info">
          <div class="name">{{ infoDetailsObj.customerInfo.nickname }}</div>
          <div class="lable">
            总发布
            <span>{{ infoDetailsObj.customerInfo.infoNumber }}</span
            >条信息，可信度评估
            <span>*</span>
          </div>
          <div class="phone" @click="toPhone">
            <van-icon name="phone-o" size="1.4rem" />
            {{ infoDetailsObj.phone }}
          </div>
          <div v-if="infoDetailsObj.qq" class="qq">
            <i class="iconfont icon-qq icon" />
            {{ infoDetailsObj.qq }}
          </div>
        </div>
      </div>
    </div>
    <div class="add_info" @click="toAddInfoView">发布</div>
    <div class="rules">《免责声明》</div>
    <div class="bottom_bar">
      <van-button class="btn" round @click="toChatView">在线聊</van-button>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      infoDetailsObj: {},
    }
  },
  created() {
    this.getInfoDetailsObj()
  },
  methods: {
    getInfoDetailsObj() {
      const item = JSON.parse(sessionStorage.getItem('partTimeDetailInfoObj'))
      this.infoDetailsObj = item
    },
    // 预览图片
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
    // 拨打电话
    toPhone() {
      const phoneNum = infoDetailsObj.phone
      window.location.href = 'tel:' + phoneNum
    },
    toChatView() {
      this.$router.push('/chatView')
    },
    toAddInfoView() {
      this.$router.push('/partTimeJobInfo/addInfo')
    },
    beforeDestroy() {
      sessionStorage.removeItem('partTimeDetailInfoObj')
    },
  },
}
</script>
<style lang="less" scoped>
.content_warp {
  margin-top: 0.8rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2rem 1rem 1rem 1rem;
  position: relative;
  .title {
    font-weight: 900;
    font-size: 1.5rem;
  }
  .price {
    font-weight: 900;
    color: @priceColor;
    margin: 1rem 0;
  }
  .content {
    line-height: 2rem;
    letter-spacing: 0.1rem;
    text-indent: 2rem;
    margin-bottom: 1rem;
  }
  .image_list {
    img {
      width: 100%;
    }
  }
  .status {
    color: @priceColor;
    position: absolute;
    top: 1rem;
    right: 1rem;
    transform: rotate(10deg);
    font-size: 2rem;
    font-weight: 900;
  }
  .tip {
    font-size: 0.9rem;
    color: #999;
    height: 2rem;
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
  .time {
    text-align: right;
    color: #ccc;
    font-size: 0.8rem;
    height: 2rem;
  }
  .user_info {
    position: relative;
    display: flex;
    align-items: center;
    // height: 7rem;
    padding-top: 0.8rem;
    border-top: 2px solid #eee;
    .images {
      flex: 1.2;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .icon {
        width: 1rem;
        height: 1rem;
        display: flex;
        font-size: 0.8rem;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin: 0.2rem 0;
        position: absolute;
        top: 4rem;
        left: 2.2rem;
      }
      .nan {
        background-color: #2248dd;
      }
      .nv {
        background-color: #ee1169;
      }
    }
    .info {
      flex: 6;
      line-height: 1.5rem;
      .name {
        font-weight: 900;
      }
      .lable {
        color: #999;
        font-size: 0.8rem;
      }
      .lable span:nth-child(1) {
        color: @priceColor;
      }
      .lable span:nth-child(2) {
        color: cadetblue;
      }
      .phone {
        color: cadetblue;
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
      }
      .qq {
        color: cadetblue;
        .icon {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
.add_info {
  position: fixed;
  bottom: 4rem;
  left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  font-size: 0.8rem;
  background-color: #21b668;
  border-radius: 50%;
  color: #fff;
  opacity: 0.7;
}
.rules {
  color: cadetblue;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 2rem;
  height: 8rem;
}
.bottom_bar {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  height: 3rem;
  width: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn {
    width: 5rem;
    height: 1.8rem;
    font-size: 0.8rem;
    color: #997a00;
    background-color: #ffe788;
    border: 1px solid #ffe788;
    margin-right: 2rem;
  }
}
</style>
