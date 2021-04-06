<template>
  <div>
    <van-cell
      class="cell_warp animated fadeInLeft"
      v-for="(item, index) in taskList"
      :key="item.id + index"
    >
      <div class="cell">
        <div class="left" v-if="item.customerInfo">
          <img v-lazy="item.customerInfo.headimgurl" @click="clickUserImg" />
        </div>
        <div class="center" @click="clickTast(item.id)">
          <div class="title">{{ item.title }}</div>
          <div class="require">
            <div class="require_warp">
              <div class="sex">{{ item.sex === 0 ? '性别不限' : item.sex === 1 ? '只限男性' : '只限女性' }}</div>
              <div class="time">{{ item.beforeTime }}</div>
            </div>
            <div class="price">￥{{ item.price }}</div>
          </div>
        </div>
        <div class="right">
          <div class="status">
            <div v-if="item.state === 3">完成并确认</div>
            <div v-else-if="item.state === 2">已确认</div>
            <div v-else-if="item.state === 0" class="red">待支付</div>
            <div v-else class="red">待接单</div>
          </div>
          <van-button v-if="item.state === 0" class="btn" type="warning">去支付</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  props: {
    taskList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    clickTast(id) {
      this.$emit('clickTast', id)
    },
    clickUserImg() {
      this.$router.push('/chartView')
    }
  }
}
</script>
<style lang="less" scoped>
.cell_warp {
  width: 100%;
  height: 6rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  .cell {
    display: flex;
    font-size: 0.8rem;
    box-sizing: border-box;
    .left {
      flex: 1;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    .center {
      flex: 5;
      margin: 0 1rem;
      .title {
        font-weight: 900;
      }
      .require {
        .require_warp {
          display: flex;
          .sex {
            color: @themeColor;
            margin-right: 1rem;
          }
        }
        .price {
          color: red;
        }
      }
    }
    .right {
      flex: 1.5;
      margin-top: 0.5rem;
      color: cadetblue;
      .status {
        transform: rotate(15deg);
        margin-bottom: 1rem;
        .red {
          color: red;
        }
      }
      .btn {
        width: 4.5rem;
        height: 1.8rem;
        font-size: 0.7rem;
        padding: 0;
      }
    }
  }
}
</style>
