<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="站内消息群发" is-arrow isBackUp />
    <div class="content_warp">
      <div class="content">
        <div class="target">
          <div class="text">群发目标：</div>
          <van-dropdown-menu active-color="#f2af49">
            <van-dropdown-item
              v-model="form.chatTarget"
              :options="chatTargetActions"
              @change="chatTargetSelect"
            />
          </van-dropdown-menu>
        </div>
        <van-field
          class="input"
          v-model="form.message"
          rows="2"
          autosize
          label="群发内容："
          required
          type="textarea"
          maxlength="300"
          clearable
          placeholder="请输入群发内容"
          show-word-limit
        />
        <van-field class="uploaderImg" label="群发图片（限一张）：">
          <template #input>
            <van-uploader v-model="form.uploaderImg" :max-count="1" :after-read="uploading" />
          </template>
        </van-field>
        <van-field class="link_input" v-model="form.link" label="链接：" placeholder="发送链接给用户" />
        <div class="save_btn_warp">
          <van-button class="save_btn" @click="sendChat" round>发送</van-button>
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
      chatTargetShowPopover: false,
      form: {
        chatTarget: 0,
        message: '',
        link: '',
        uploaderImg: []
      },
      chatTargetActions: [{ text: '全部用户', value: 0 }]
    }
  },
  methods: {
    chatTargetSelect(value) {},
    // 处理上传图片
    uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'done'
      }, 1000)
    },
    sendChat() {
      if (this.form.message === '') {
        this.$toast.fail('请填写群发内容！')
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.popover {
  width: 100%;
}
.content_warp {
  box-sizing: border-box;
  .content {
    .target {
      display: flex;
      background-color: #fff;
      padding: 0.5rem;
      align-items: center;
      .text {
        font-weight: 900;
        margin-right: 1rem;
      }
    }
  }
}
.link_input {
  height: 3rem !important;
}
.save_btn_warp {
  display: flex;
  justify-content: center;
  .save_btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
    font-size: 0.9rem;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
.van-cell {
  height: 20rem;
}
.uploaderImg {
  height: 6rem !important;
}
::v-deep .van-field__body {
  height: 18rem;
}
::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
</style>
