<template>
  <div>
    <div class="comment" v-for="(item, index) in commentList" :key="index + item.user_name">
      <div class="top">
        <img class="user_img" :src="item.user_img" />
        <div class="right">
          <div class="user_name">{{ item.user_name }}</div>
          <div class="shop_info">
            <div class="comment_time">{{ item.comment_time }}</div>
            <div class="fenge">|</div>
            <div class="shop_type">{{ item.shop_type }}</div>
          </div>
        </div>
        <van-rate
          class="rate"
          v-model="item.commentNum"
          size="1rem"
          color="#f2af49"
          void-icon="star"
          void-color="#eee"
          readonly
        />
      </div>
      <div class="comment_info">
        <div class="text">{{ item.comment_text }}</div>
        <div class="comment_img">
          <template v-if="item.comment_img.length > 0 || item.comment_video.length > 0">
            <img
              :class="[(item.comment_img.length + item.comment_video.length) === 1 ? 'onlyImg' : 'img']"
              v-for="(items, indexs) in item.comment_img"
              :key="indexs"
              v-lazy="items"
              @click="clickCommnetImg(item.comment_img, indexs)"
            />
            <img
              :class="[(item.comment_img.length + item.comment_video.length) === 1 ? 'onlyImg' : 'img']"
              :src="item.comment_video"
              v-if="item.comment_video.length > 0"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    clickCommnetImg(itemImgs, indexs) {
      this.$emit('clickCommnetImg', itemImgs, indexs)
    }
  }
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
