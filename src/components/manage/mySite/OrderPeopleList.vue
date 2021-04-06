<template>
  <div>
    <van-cell
      class="cell_warp animated fadeInLeft"
      v-for="(item, index) in orderPeopleList"
      :key="item.id + index"
    >
      <div class="cell">
        <div class="left">
          <img v-lazy="item.customerInfo.headimgurl" @click="clickUserImg" />
        </div>
        <div class="center" @click="clickTast(item)">
          <div class="title">{{ item.customerName }}</div>
          <div class="require">
            <div class="require_warp">
              <div
                class="sex"
                :class="[item.sex === 0 ? 'nan' : 'nv']"
              >{{ item.sex === 0 ? '男' : '女' }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="status">
            <div v-if="item.state === 1 || item.state === 3">已通过</div>
            <div v-else-if="item.state === 2" class="red">未审核</div>
            <div v-else class="gray">未通过</div>
          </div>
        </div>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  props: {
    orderPeopleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    clickTast(item) {
      this.$router.push(
        `/mySiteManage/order/orderPeopleDetails?id=${item.id}&state=${item.state}`
      )
    },
    clickUserImg() {
      this.$router.push('/chatView')
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
        font-size: 1rem;
      }
      .require {
        margin-top: 0.5rem;
        .require_warp {
          display: flex;
          .sex {
            color: @themeColor;
            margin-right: 1rem;
          }
          .nan {
            color: #4e6de4;
          }
          .nv {
            color: #f14187;
          }
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
        .gray {
          color: #999;
        }
      }
      .btn {
        width: 4.5rem;
        height: 1.8rem;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
