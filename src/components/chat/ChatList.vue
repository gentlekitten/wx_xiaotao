<template>
  <div class="chat_warp">
    <van-swipe-cell
      class="swiper_cell"
      v-for="(item) in chatList"
      :key="item.id"
      :right-width="item.isTop ? 195 : 154"
    >
      <div class="chat_list" :class="{'top_chat' : item.isTop}" @click="toChatView(item)">
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
      <template #right>
        <van-button v-if="!item.isTop" square text="置顶" class="button" @click="topChatItem(item)" />
        <van-button v-else square text="取消置顶" class="button" @click="closeTopChatItem(item)" />
        <van-button square text="删除" type="danger" class="button" @click="deleteChatItem(item.id)" />
      </template>
    </van-swipe-cell>
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
    },
    topChatItem(item) {
      this.$emit('topChatItem', item)
    },
    closeTopChatItem(item) {
      this.$emit('closeTopChatItem', item)
    },
    deleteChatItem(item) {
      this.$emit('deleteChatItem', item)
    }
  }
}
</script>
<style lang="less" scoped>
.chat_warp {
  .top_chat {
    background-color: #f7f7f7 !important;
  }
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
