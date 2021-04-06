<template>
  <div class="chat_warp">
    <div v-for="(item) in chatList" :key="item.id">
      <div class="chat_list" @click="toChatView(item)">
        <img :src="item.userImg" />
        <div class="content">
          <div class="title">{{ item.userName }}</div>
          <div class="lable">{{ item.text }}</div>
        </div>
        <div class="right">
          <div class="time">{{ item.time }}</div>
          <van-badge v-show="item.noReadNum > 0" class="badeg" :content="item.noReadNum" max="99" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    chatList: {
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
    toChatView(item) {
      this.$emit('toChatView', item)
    }
  }
}
</script>
<style lang="less" scoped>
.chat_warp {
  .chat_list {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 5rem;
    background-color: #fff;
    padding: 0 1rem;
    align-items: center;
    border-bottom: 1px solid #eee;
    img {
      flex: 1;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .content {
      margin-left: 1rem;
      flex: 5;
      .title {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .lable {
        color: #ccc;
        font-size: 0.8rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    .right {
      flex: 0.5;
      margin-left: 0.5rem;
      color: #999;
      font-size: 0.8rem;
      .badeg {
        width: 1.4rem;
        height: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff6600;
        margin: 0.5rem 0 0 0.5rem;
      }
    }
  }
  .button {
    height: 100%;
  }
}
</style>