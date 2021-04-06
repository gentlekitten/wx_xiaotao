<template>
  <div>
    <div class="shopping_warp">
      <div class="shopping">
        <div
          class="shopping_item"
          v-for="item in orderList"
          :key="item.id"
          @click="toOrderDetails(item)"
        >
          <div class="status">待受理</div>
          <div class="content">
            <div class="img_warp">
              <img class="img" :src="item.img" />
            </div>
            <div class="content_top_warp">
              <div class="content_top">
                <div class="name">{{ item.name }}</div>
              </div>
              <div class="price_num">
                <div class="price">￥{{ item.price }}</div>
                <div class="num">×{{ item.num }}</div>
              </div>
            </div>
          </div>
          <div class="price_warp">
            <span>总价：￥{{ item.totalPrice }}</span>
            <div class="price">实际付款：￥{{ item.realPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    orderList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    toOrderDetails() {
      this.$emit('toOrderDetails')
    }
  }
}
</script>
<style lang="less" scoped>
.shopping_warp {
  padding: 0 1rem;
  margin-bottom: 5rem;
  .shopping {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    border: 1px solid #f7f7f7;
    margin: 1rem 0;
    .shopping_item {
      .status {
        color: #ff623e;
        text-align: right;
      }
      .content {
        display: flex;
        margin: 1rem 0;
        .img_warp {
          flex: 2;
          .img {
            width: 5rem;
            height: 5rem;
            border-radius: 0.5rem;
            margin-right: 1rem;
          }
        }
        .content_top_warp {
          flex: 5;
          .content_top {
            display: flex;
            .name {
              line-height: 1.5rem;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
          .price_num {
            display: flex;
            margin: 0.5rem 0;
            align-items: center;
            .num {
              color: #999;
              margin-left: 0.5rem;
            }
          }
        }
      }
      .price_warp {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.5rem;
        align-items: center;
        span {
          color: #999;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
