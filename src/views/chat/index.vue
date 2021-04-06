<template>
  <div>
    <div class="top">
      <div class="left">
        <span>消息</span>
        （{{ getChatTotalNum }}）
      </div>
      <div class="right" @click="removeUnread">
        <van-icon name="delete-o" size="1rem" />清除未读
      </div>
    </div>
    <chat-list
      :chat-list="chatList"
      @toChatView="toChatView"
      @topChatItem="topChatItem"
      @closeTopChatItem="closeTopChatItem"
      @deleteChatItem="deleteChatItem"
    />
  </div>
</template>
<script>
import ChatList from '@/components/chat/ChatList.vue'

export default {
  components: {
    ChatList
  },
  data() {
    return {
      chatList: []
    }
  },
  computed: {
    getChatTotalNum() {
      let total = 0
      this.chatList.forEach(i => {
        total = total + i.noReadNum
      })
      return total
    }
  },
  created() {
    this.getChatList()
  },
  methods: {
    getChatList() {
      const arr = [
        {
          id: 0,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 10,
          isTop: false
        },
        {
          id: 1,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 20,
          isTop: false
        },
        {
          id: 2,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '11:00',
          noReadNum: 0,
          isTop: true
        },
        {
          id: 3,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 15,
          isTop: false
        },
        {
          id: 4,
          userImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          userName: '哈哈哈哈',
          text: '嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿额黑嘿嘿嘿嘿额黑',
          time: '10:00',
          noReadNum: 100,
          isTop: false
        }
      ]
      arr.sort((a, b) => b.isTop - a.isTop)
      console.log(arr)
      this.chatList = arr
    },
    // 清除未读操作
    removeUnread() {
      this.chatList.forEach(i => {
        i.noReadNum = 0
      })
    },
    toChatView(item) {
      this.$router.push('/chatView')
    },
    // 删除消息
    deleteChatItem(index) {
      this.chatList = this.chatList.filter(i => {
        return i.id !== index
      })
    },
    // 置顶消息
    topChatItem(item) {
      const index = this.chatList.findIndex(i => {
        return i.id === item.id
      })
      this.chatList.splice(index, 1)
      item.isTop = true
      this.chatList.unshift(item)
    },
    // 取消置顶
    closeTopChatItem(item) {
      const index = this.chatList.findIndex(i => {
        return i.id === item.id
      })
      this.chatList.splice(index, 1)
      const topChatList = this.chatList.filter(i => {
        return i.isTop === true
      })
      item.isTop = false
      this.chatList.splice(topChatList.length, 0, item)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  height: 3rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .left {
    font-weight: 900;
    span {
      font-size: 1.5rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
