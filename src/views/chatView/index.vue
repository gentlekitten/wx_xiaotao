<template>
  <div class="home" id="content">
    <chat-view
      :chart-list="chartList"
      @imagePreview="imagePreview"
      @clickAdd="clickAdd"
      @sendInfo="sendInfo"
    />
    <van-uploader v-show="false" v-model="chartImgList" ref="uploader" />
  </div>
</template>
<script>
import { ImagePreview } from 'vant'

import ChatView from '@/components/common/ChatView.vue'

import time from '@/assets/js/time.js'

export default {
  components: {
    ChatView
  },
  data() {
    return {
      //   chartValue: '',
      chartImgList: [],
      chartList: []
    }
  },
  watch: {
    chartImgList() {
      const chartObj = {
        isMe: true,
        userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        text: this.chartValue,
        img: this.chartImgList[this.chartImgList.length - 1].content,
        data: new Date()
      }
      this.chartList.push(chartObj)
    }
  },
  created() {
    //   获取聊天列表
    this.getChartList()
  },
  methods: {
    //   预览图片
    imagePreview(item) {
      const imgItem = []
      const imgList = []
      this.chartList.forEach(item => {
        if (item.img) {
          imgItem.push(item)
          imgList.push(item.img)
        }
      })
      const index = imgItem.findIndex(i => {
        return i.data === item.data
      })
      ImagePreview({
        images: imgList,
        startPosition: index
      })
    },
    //   点击加号发送图片
    clickAdd() {
      this.$refs.uploader.chooseFile()
    },
    // 发送消息
    sendInfo(chartValue) {
      const nowTime = new Date().getTime()
      const chartObj = {
        isMe: true,
        userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        text: chartValue,
        // img: this.chartImgList[0],
        data: nowTime,
        gsTime: time.gettime.getChatTime(
          nowTime,
          this.chartList[this.chartList.length - 1].data
        )
      }
      this.chartList.push(chartObj)
    },
    getChartList() {
      const arr = [
        {
          isMe: false,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '',
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          data: '1606014244'
        },
        {
          isMe: true,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          img: '',
          data: '1611399605'
        },
        {
          isMe: false,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '',
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          data: '1611399610'
        },
        {
          isMe: false,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          img: '',
          data: '1611499600'
        },
        {
          isMe: false,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '',
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          data: '1611599600'
        },
        {
          isMe: true,
          userImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          img: '',
          data: '1611313444'
        }
      ]
      //   处理消息时间差
      for (let i = 0; i < arr.length; i++) {
        arr[i].gsTime = time.gettime.getChatTime(
          arr[i].data,
          i > 0 ? arr[i - 1].data : 0
        )
      }
      this.chartList = arr
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  //   background-color: #fff;
  box-sizing: border-box;
  //   .chart_list_warp {
  //     box-sizing: border-box;
  //     color: #fff;
  //     letter-spacing: 1px;
  //     padding-bottom: 4rem;
  //   }
}
</style>
