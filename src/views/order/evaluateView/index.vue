<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="发表评价" is-arrow isBackUp>
      <template v-slot:right_icon>
        <div class="send" @click="sendEvaluate">发布</div>
      </template>
    </nav-bar>
    <div class="content_warp">
      <div class="content">
        <div class="top_shop">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <div class="info">
            <div class="name">哈哈</div>
            <div class="type">颜色:黑色;尺码:40</div>
          </div>
        </div>
        <div class="evaluate">
          <van-field
            class="textarea"
            v-model="form.evaluate"
            rows="2"
            autosize
            clearable
            type="textarea"
            maxlength="200"
            placeholder="从多个角度评价宝贝，可以帮助更多想买的人"
            show-word-limit
          />
          <van-field class="uploaderImg" label="附图(最多5张)：">
            <template #input>
              <van-uploader
                v-model="form.uploaderImg"
                multiple
                :max-count="5"
                :max-size="2048 * 1024"
                @oversize="handleImgLarge"
                :after-read="uploading"
              />
            </template>
          </van-field>
        </div>
      </div>
      <div class="evaluate_rate">
        <div class="name">店铺名字</div>
        <div class="rate_warp">
          服务态度
          <van-rate
            class="rate"
            v-model="form.attitude"
            size="1.2rem"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="rate_warp">
          产品品质
          <van-rate
            class="rate"
            v-model="form.quality"
            size="1.2rem"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="rate_warp">
          送达速度
          <van-rate
            class="rate"
            v-model="form.speed"
            size="1.2rem"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        evaluate: '',
        attitude: 0,
        quality: 0,
        speed: 0
      }
    }
  },
  methods: {
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过2M')
    },
    // 处理上传图片
    uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'done'
      }, 1000)
    },
    sendEvaluate() {
      const form = this.form
      if (form.attitude < 1 || form.quality < 1 || form.speed < 1) {
        this.$toast.fail('评分不能为空')
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
.send {
  color: @themeColor;
  font-weight: 900;
}
.content_warp {
  padding: 0.8rem;
  box-sizing: border-box;
  .content {
    background-color: #fff;
    border-radius: 0.5rem;
    .top_shop {
      padding: 0.8rem;
      display: flex;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
      }
      .info {
        margin-left: 1rem;
        font-size: 0.95rem;
        line-height: 1.5rem;
        .name {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .type {
          color: #999;
          font-size: 0.8rem;
        }
      }
    }
    .textarea {
      height: 10rem;
    }
    .uploaderImg {
      height: 10rem !important;
      border-radius: 0.5rem;
    }
  }
  .evaluate_rate {
    margin-top: 1rem;
    padding: 0.8rem;
    background-color: #fff;
    border-radius: 0.5rem;
    .name {
      color: #999;
      font-size: 0.9rem;
    }
    .rate_warp {
      margin-top: 1rem;
      color: #666;
      font-weight: 900;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      //   line-height: 1.5rem;
      .rate {
        margin-left: 1rem;
      }
    }
  }
}
</style>