<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="哼，我也是有底线的~"
      :immediate-check="false"
      :offset="0"
      @load="onLoadData"
    >
      <div
        class="comment"
        v-for="(item, index) in commentList"
        :key="index + item.id"
      >
        <div class="top">
          <img class="user_img" :src="imgBaseUrl + item.customerAvatar" />
          <div class="right">
            <div class="user_name">{{ item.customerNickname }}</div>
            <div class="shop_info">
              <div class="comment_time">{{ item.createTime }}</div>
              <div class="fenge">|</div>
              <div class="shop_type">{{ item.productName }}</div>
            </div>
          </div>
          <van-rate
            class="rate"
            v-model="item.commentScore"
            size="1rem"
            color="#f2af49"
            void-icon="star"
            void-color="#eee"
            readonly
          />
        </div>
        <div class="comment_info">
          <div class="text">{{ item.content }}</div>
          <div class="comment_img">
            <template v-if="item.productCommentPics.length > 0">
              <img
                :class="[
                  item.productCommentPics.length === 1 ? 'onlyImg' : 'img',
                ]"
                v-for="(items, indexs) in item.productCommentPics"
                :key="items.id"
                v-lazy="imgBaseUrl + items.picAddress"
                @click="clickCommnetImg(item.productCommentPics, indexs)"
              />
            </template>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    clickCommnetImg(itemImgs, indexs) {
      this.$emit('clickCommnetImg', itemImgs, indexs)
    },
    onLoadData() {
      this.$emit('onLoadData')
    },
  },
}
</script>
<style lang="less" scoped>
.comment {
  padding: 1rem;
  background-color: #fff;
  width: 100%;
  font-size: 0.8rem;
  box-sizing: border-box;
  .top {
    display: flex;
    height: 2rem;
    .user_img {
      flex: 1;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.8rem;
    }
    .right {
      flex: 3;
      .user_name {
        font-size: 1rem;
      }
      .shop_info {
        display: flex;
        color: #999;
        font-size: 0.7rem;
        margin: 0.3rem 0;
        .comment_time {
        }
        .fenge {
          margin: 0 0.3rem;
        }
      }
    }
  }
  .rate {
    margin-right: 2rem;
    flex: 7;
  }
  .comment_info {
    width: 100%;
    .text {
      margin: 0.8rem 0;
      width: 95vw;
      line-height: 1.5rem;
      letter-spacing: 1px;
    }
    .comment_img {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .img {
        flex: 1;
        width: 28%;
        height: 6rem;
        margin: 0 1rem 1rem 0;
      }
      .onlyImg {
        width: 10rem;
        height: 10rem;
        margin: 0 1rem 1rem 0;
      }
    }
  }
}
</style>
