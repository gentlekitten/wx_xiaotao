<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar :title="navTitle" is-arrow isBackUp />
    <van-form @submit="formSubmit">
      <van-field label="栏目：" required>
        <template #input>
          <van-radio-group v-model="form.category" direction="horizontal">
            <van-radio :name="0">本校</van-radio>
            <van-radio :name="1">同城</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="form.title"
        label="标题："
        required
        clearable
        placeholder="简明扼要"
        :rules="[{ required: true}]"
      />
      <van-field
        v-model.number="form.price"
        label="价格："
        type="number"
        clearable
        placeholder="如无可不填(单位元)"
      />
      <van-field
        v-model="form.phone"
        label="电话："
        type="number"
        clearable
        right-icon="arrow-down"
        placeholder="填写电话号码"
        required
        :rules="[{ validator, message: '手机号码格式错误'  }]"
      >
        <template #right-icon>
          <div class="more" @click="isShowQQ = !isShowQQ">
            更多
            <van-icon v-if="!isShowQQ" name="arrow-down" />
            <van-icon v-else name="arrow-up" />
          </div>
        </template>
      </van-field>
      <van-field
        v-show="isShowQQ"
        v-model="form.qq"
        class="animated fadeInDown"
        label="QQ："
        type="number"
        clearable
        placeholder="填写QQ号码"
      />
      <van-field
        v-model.number="form.effectiveTime"
        label="有效："
        type="number"
        clearable
        required
        placeholder="有效时间单位天）"
        :rules="[{ required: true}]"
      />
      <van-field
        class="textarea"
        v-model="form.content"
        rows="2"
        autosize
        required
        clearable
        label="内容："
        type="textarea"
        maxlength="300"
        placeholder="请输入内容"
        show-word-limit
        :rules="[{ required: true}]"
      />
      <van-field v-if="type === 'add'" class="uploaderImg" label="附图(最多5张)：">
        <template #input>
          <van-uploader
            v-model="uploaderImg"
            :max-count="5"
            :after-read="uploading"
            @delete="deleteImg"
          />
        </template>
      </van-field>
      <div class="btn_warp">
        <van-button v-if="type === 'add'" class="btn" round native-type="formSubmit">提交发布</van-button>
        <van-button v-else class="btn" round native-type="formSubmit">更新信息</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { upData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      isShowQQ: false,
      uploaderImg: [],
      // 判断是添加还是编辑
      type: 'add',
      navTitle: '发布信息',
      form: {
        category: 0,
        price: '',
        title: '',
        phone: '',
        qq: '',
        effectiveTime: '',
        content: '',
        siteJobPics: []
      },
      //   验证QQ号
      pattern: /[1-9][0-9]{4,}/
    }
  },
  created() {
    if (this.$route.query.type) {
      this.type = 'update'
      this.navTitle = '编辑信息'
    }
    if (this.type === 'update') {
      this.initFormData()
    }
  },
  methods: {
    //   验证手机号
    validator(val) {
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
        val
      )
    },
    // 初始化表单数据
    initFormData() {
      if (JSON.parse(sessionStorage.getItem('partTimeObj'))) {
        const form = JSON.parse(sessionStorage.getItem('partTimeObj'))
        console.log(form)

        this.form = form
      }
    },
    deleteImg(file, detail) {
      this.uploaderImg.splice(detail.index, 1)
      this.form.siteJobPics.splice(detail.index, 1)
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('jobImg', file.file)
      const res = await upLogo('/site/job/img', formData)
      console.log(res)
      this.form.siteJobPics.push({ picAddress: res.data.filename })
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
    },
    // 提交发布
    async formSubmit() {
      if (this.type === 'add') {
        const res = await upData('/site/job/info/add', this.form, {
          showLoading: true
        })
        console.log(res)
        if (res.code === '0') {
          this.$toast.success('发布成功！')
          setTimeout(() => {
            return this.$router.go(-1)
          }, 500)
          return false
        }
        return this.$toast.fail(res.msg)
      }
      const res = await upData('/site/job/info/update', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('更新成功！')
        setTimeout(() => {
          return this.$router.go(-1)
        }, 500)
        return false
      }
      return this.$toast.fail(res.msg)
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('partTimeObj')
  }
}
</script>
<style lang="less" scoped>
.textarea {
  height: 8rem;
}
.uploaderImg {
  height: 10rem !important;
}
.more {
  color: cadetblue;
  display: flex;
}
.btn_warp {
  display: flex;
  justify-content: center;
  .btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
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
</style>