<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="小明" is-arrow isBackUp />
    <div class="chart_list_warp" ref="obtain">
      <div v-for="(item, index) in chartList" :key="item.data + index">
        <div v-if="item.gsTime" class="gs_time">{{ item.gsTime }}</div>
        <div v-if="!item.isMe" class="other_chart">
          <img class="user_img" :src="item.userImg" />
          <div v-if="item.text" class="chart">{{ item.text }}</div>
          <van-image
            v-if="item.img"
            class="image"
            fit="contain"
            lazy-load
            :src="item.img"
            @click="imagePreview(item)"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div style="clear: both;"></div>
        <div v-if="item.isMe" class="my_chart">
          <div v-if="item.text" class="chart">{{ item.text }}</div>
          <van-image
            v-if="item.img"
            class="image"
            fit="contain"
            lazy-load
            :src="item.img"
            @click="imagePreview(item)"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <img class="user_img" :src="item.userImg" />
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <van-cell-group class="input_warp">
      <van-field
        class="input"
        v-model="chartValue"
        rows="1"
        type="textarea"
        autosize
        autofocus
        placeholder="请输入聊天内容"
      />
      <van-button
        v-if="chartValue"
        class="btn"
        size="small"
        type="primary"
        @click="sendInfo(chartValue)"
      >发送</van-button>
      <van-icon v-else name="add-o" size="1.5rem" @click="clickAdd" />
    </van-cell-group>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  props: {
    chartList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      chartValue: ''
    }
  },
  watch: {
    // 监听聊天列表
    chartList() {
      this.$nextTick(() => {
        const height = this.$refs.obtain.offsetHeight
        if (height > 636) {
          const newHeight = height - 636
          document.body.scrollTop = document.documentElement.scrollTop = newHeight
        }
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollx, true)
    const height = this.$refs.obtain.offsetHeight
    if (height > 636) {
      const newHeight = height - 636
      document.body.scrollTop = document.documentElement.scrollTop = newHeight
    }
  },
  methods: {
    imagePreview(item) {
      this.$emit('imagePreview', item)
    },
    sendInfo(chartValue) {
      this.$emit('sendInfo', chartValue)
      this.chartValue = ''
    },
    clickAdd() {
      this.$emit('clickAdd')
    }
  }
}
</script>
<style lang="less" scoped>
.input_warp {
  box-sizing: border-box;
  width: 100%;
  height: 3.5rem;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0 1rem 0 0.5rem;
  display: flex;
  align-items: center;
  .input {
    flex: 5;
    background-color: #f7f7f7;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
  .btn {
    flex: 1;
    height: 2rem;
    font-size: 0.8rem;
  }
}
.image {
  width: 10rem;
  height: 12rem;
}
.chart_list_warp {
  box-sizing: border-box;
  color: #fff;
  letter-spacing: 1px;
  padding-bottom: 4rem;
  .gs_time {
    color: #000;
    text-align: center;
    font-size: 0.78rem;
  }
  .other_chart {
    display: flex;
    margin: 0.6rem 1rem;
    float: left;
    .user_img {
      margin-right: 1rem;
    }
    .chart {
      position: relative;
      padding: 0.5rem;
      box-sizing: content-box;
      background-color: cadetblue;
      border-radius: 0.5rem;
      max-width: 16rem;
      min-width: 1rem;
    }
    .chart::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      right: 98%;
      top: 0.3rem;
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      border-right: 0.8rem solid cadetblue;
    }
  }
  .my_chart {
    display: flex;
    margin: 0.6rem 1rem;
    float: right;
    .user_img {
      margin-left: 1rem;
    }
    .chart {
      position: relative;
      padding: 0.5rem;
      box-sizing: content-box;
      background-color: cadetblue;
      border-radius: 0.5rem;
      max-width: 16rem;
      min-width: 1rem;
    }
    .chart::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      left: 98%;
      top: 0.3rem;
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      border-left: 0.8rem solid cadetblue;
    }
  }
  .user_img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
}

::v-deep .van-image__img {
  border-radius: 0.5rem;
}
</style>
