<template>
  <div>
    <div
      class="content animated fadeInLeft"
      v-for="item in infoList"
      :key="item.id"
    >
      <div class="user_info">
        <img :src="item.customerInfo.headimgurl" />
        <i
          class="iconfont icon"
          :class="[item.customerInfo.sex === 0 ? 'icon-nan nan' : 'icon-nv nv']"
        ></i>
        <div class="name">{{ item.customerInfo.nickname }}</div>
      </div>
      <div class="info" @click="toInfoDetailsView(item)">
        <div class="title_warp">
          <div class="title">{{ item.title }}</div>
          <div v-if="item.price" class="price">{{ item.price }}</div>
          <div v-if="tabIndex === 2" class="btn_warp">
            <van-button class="btn" round @click.stop="showOverlay(item)"
              >管理</van-button
            >
          </div>
        </div>
        <div class="value">{{ item.content }}</div>
        <div class="image">
          <img
            v-for="(c, index) in item.siteJobPics"
            :key="index + c"
            :src="imgBaseUrl + c.picAddress"
          />
        </div>
        <div class="time">{{ item.updateTime }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    infoList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      tabIndex: Number(sessionStorage.getItem('tabActiveIndexPartTime'))
        ? Number(sessionStorage.getItem('tabActiveIndexPartTime'))
        : 0,
    }
  },
  methods: {
    showOverlay(item) {
      this.$emit('showOverlay', item)
    },
    toInfoDetailsView(item) {
      this.$emit('toInfoDetailsView', item)
    },
  },
}
</script>
<style lang="less" scoped>
.content {
  padding: 1rem 1rem 1rem 0;
  background-color: #fff;
  display: flex;
  line-height: 1.5rem;
  position: relative;
  margin: 0.8rem 0;
  .user_info {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    }
    .nan {
      background-color: #2248dd;
    }
    .nv {
      background-color: #ee1169;
    }
    .name {
      color: #999;
      font-size: 0.78rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      margin-left: 0.5rem;
    }
  }
  .info {
    flex: 6;
    .title_warp {
      display: flex;
      .title {
        font-weight: 900;
        width: 85%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .price {
        font-weight: 900;
        color: @priceColor;
        margin: 0 0.5rem;
      }
      .btn_warp {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.2rem;
        .btn {
          width: 4rem;
          height: 1.5rem;
          font-size: 0.8rem;
          color: #997a00;
          background-color: #ffe788;
          border: 1px solid #ffe788;
        }
      }
    }

    .value {
      font-size: 0.9rem;
      color: #999;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
    .image {
      display: flex;
      img {
        width: 3rem;
        height: 3rem;
        margin-right: 0.2rem;
      }
    }
    .time {
      font-size: 0.8rem;
      color: #ccc;
      text-align: right;
    }
  }
}
</style>
