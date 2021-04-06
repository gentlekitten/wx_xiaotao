<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="图文消息群发" is-arrow isBackUp />
    <div class="tip">
      每个月所有站长拥有
      <span>1</span>次发送机会,该消息是发送到公众号的内容
    </div>
    <van-form @submit="formSubmit">
      <van-field
        v-model="form.title"
        label="标题："
        required
        clearable
        placeholder="填写标题"
        :rules="[{ required: true}]"
      />
      <van-field class="uploaderImg" required label="图片：">
        <template #input>
          <van-uploader v-model="form.uploaderImg" :max-count="1" :after-read="uploading" />
        </template>
      </van-field>
      <van-field
        class="input"
        v-model="form.lable"
        rows="2"
        autosize
        label="摘要选填："
        type="textarea"
        maxlength="100"
        clearable
        placeholder="仅在发送图文消息为单条时显示"
        show-word-limit
      />
      <van-field
        v-model="form.author"
        label="作者："
        clearable
        placeholder="填写作者"
      />
      <div class="target">
        <div class="text">留言要求：</div>
        <van-dropdown-menu active-color="#f2af49">
          <van-dropdown-item
            v-model="form.leaveMessage"
            :options="leaveMessageActions"
            @change="leaveMessageSelect"
          />
        </van-dropdown-menu>
      </div>
      <quill-editor class="quill_edditor" v-model="form.content"></quill-editor>
      <div class="save_btn_warp">
        <van-button class="save_btn" round native-type="formSubmit">发送</van-button>
      </div>
    </van-form>
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
      leaveMessageActions: [
        { text: '所有人可留言', value: 0 },
        { text: '仅关注者可以留言', value: 1 },
        { text: '关闭留言', value: 2 }
      ],
      form: {
        title: '',
        lable: '',
        author: '',
        content: '',
        leaveMessage: 0,
        uploaderImg: []
      }
    }
  },
  methods: {
    // 处理上传图片
    uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'done'
      }, 1000)
    },
    leaveMessageSelect(value) {},
    formSubmit() {}
  }
}
</script>
<style lang="less" scoped>
.tip {
  width: 100%;
  height: 2rem;
  font-size: 0.8rem;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: @priceColor;
  }
}
.input {
  height: 9rem;
}
.uploaderImg {
  height: 6rem;
}
.target {
  display: flex;
  background-color: #fff;
  padding: 0.5rem;
  align-items: center;
  .text {
    margin-right: 1rem;
    font-size: 0.8rem;
  }
}
.quill_edditor {
  background-color: #fff;
  margin-top: 1rem;
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
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
}
</style>
