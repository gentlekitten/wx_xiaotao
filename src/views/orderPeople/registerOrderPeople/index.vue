<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="领跑者申请" is-arrow isBackUp />
    <!-- 协议 -->
    <div class="rules">
      请阅读
      <span>《校园领跑者协议》</span>
    </div>
    <van-form @submit="formSubmit">
      <!-- 姓名 -->
      <van-field
        v-model="registerForm.customerName"
        name="姓名"
        label="姓名："
        clearable
        placeholder="请填写姓名"
        required
        :rules="[{ required: true }]"
      />
      <!-- 单选框 -->
      <van-field name="radio" label="性别：" required>
        <template #input>
          <van-radio-group v-model="registerForm.sex" direction="horizontal">
            <van-radio :name="0">男</van-radio>
            <van-radio :name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 身份证 -->
      <van-field
        v-model="registerForm.idNumber"
        name="身份证"
        label="身份证："
        clearable
        required
        placeholder="请填写身份证"
        :rules="[{ validator, message: '身份证格式错误' }]"
      />
      <!-- 楼栋 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="registerForm.apartment"
        label="楼栋："
        placeholder="点击选择楼栋"
        required
        @click="dormitoryShowPicker = true"
      />
      <van-popup v-model="dormitoryShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="dormitory"
          @confirm="dormitoryConfirm"
          @cancel="dormitoryShowPicker = false"
        />
      </van-popup>
      <!-- 学历 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="registerForm.qualification"
        label="学历："
        placeholder="点击选择学历"
        required
        @click="educationBackgroundShowPicker = true"
      />
      <van-popup v-model="educationBackgroundShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="educationBackgroundList"
          @confirm="educationBackgroundConfirm"
          @cancel="educationBackgroundShowPicker = false"
        />
      </van-popup>
      <!-- 年级 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="registerForm.grade"
        label="年级："
        placeholder="点击选择年级"
        required
        @click="gradeShowPicker = true"
      />
      <van-popup v-model="gradeShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="gradeList"
          @confirm="gradeConfirm"
          @cancel="gradeShowPicker = false"
        />
      </van-popup>
      <!-- 学号 -->
      <van-field
        v-model="registerForm.studentNumber"
        type="number"
        name="学号"
        label="学号："
        clearable
        required
        placeholder="请填写学号"
        :rules="[{ required: true }]"
      />
      <!-- 手机 -->
      <van-field
        v-model="registerForm.phone"
        type="number"
        name="手机"
        label="手机："
        clearable
        required
        placeholder="请填写手机号"
        :rules="[{ pattern, message: '手机号格式错误' }]"
      />
      <!-- 证照  -->
      <van-field class="uploader" name="uploader" label="证照：" required>
        <template #input>
          <van-uploader
            v-model="uploaderImg"
            :max-count="2"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
            :after-read="uploading"
            @delete="deleteImg"
          />
          <div class="tip">
            手持身份证+学生证照
            <br />要求两证号码及面部清晰
          </div>
        </template>
      </van-field>
      <div class="btn_warp">
        <van-button
          class="btn"
          round
          block
          type="primary"
          native-type="formSubmit"
          :loading="btnIsLoading"
          loading-text="保存中..."
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="bom_tip">由本校站长审核，请保持电话通畅</div>
    <!-- 弹出层 -->
    <van-popup
      class="popup"
      v-model="popupIsShow"
      :close-on-click-overlay="false"
      round
    >
      <div class="popup_item">
        <van-icon
          class="icon"
          name="success"
          size="3rem"
        />申请成功！等待站长审核
      </div>
      <div class="btn_warp">
        <van-button class="btn" round block type="warning" @click="reportOver"
          >任务大厅</van-button
        >
        <van-button class="btn" round block type="info" @click="toPhone"
          >联系站长</van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
import { upData, getData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      siteInfo: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo'))
        : {},
      dormitoryShowPicker: false,
      educationBackgroundShowPicker: false,
      gradeShowPicker: false,
      popupIsShow: false,
      btnIsLoading: false,
      // 上传图片；列表
      uploaderImg: [],
      //   零跑者注册表单
      registerForm: {
        customerName: '',
        sex: 0,
        idNumber: '',
        studentNumber: '',
        phone: '',
        apartment: '',
        qualification: '',
        grade: '',
        deliveryPersonPics: [],
      },
      dormitory: ['3栋', '4栋', '5栋', '6栋', '7栋'],
      educationBackgroundList: ['大专', '本科'],
      gradeList: ['一年级', '二年级', '三年级'],
      //   手机号验证
      pattern: /^1[3|4|5|7|8][0-9]{9}$/,
    }
  },
  watch: {
    'registerForm.qualification': {
      handler() {
        if (this.registerForm.qualification !== '大专') {
          this.gradeList = ['一年级', '二年级', '三年级', '四年级']
        } else {
          this.gradeList = ['一年级', '二年级', '三年级']
        }
      },
      deep: true,
    },
  },
  methods: {
    // 验证身份证号
    validator(val) {
      return /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/.test(
        val
      )
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    dormitoryConfirm(value) {
      this.registerForm.apartment = value
      this.dormitoryShowPicker = false
    },
    educationBackgroundConfirm(value) {
      this.registerForm.qualification = value
      this.educationBackgroundShowPicker = false
      if (
        this.registerForm.grade === '四年级' &&
        this.registerForm.qualification === '大专'
      ) {
        this.registerForm.grade = '一年级'
      }
    },
    gradeConfirm(value) {
      this.registerForm.grade = value
      this.gradeShowPicker = false
    },
    // 删除图片
    deleteImg(file, detail) {
      this.uploaderImg.splice(detail.index, 1)
      this.registerForm.deliveryPersonPics.splice(detail.index, 1)
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('deliveryImg', file.file)
      const res = await upLogo('/site/delivery/person/img', formData)
      console.log(res)
      this.registerForm.deliveryPersonPics.push({
        picAddress: res.data.filename,
      })
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 表单注册
    async formSubmit() {
      if (this.registerForm.deliveryPersonPics.length <= 0) {
        this.$toast.fail('请上传证照！')
        return false
      }
      this.btnIsLoading = true
      const res = await upData('/site/delivery/person/add', this.registerForm, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        this.popupIsShow = true
        this.btnIsLoading = false
        return false
      }
      this.$handleCode.handleCode(res)
    },
    reportOver() {
      this.$router.push('/orderPeople')
    },
    // 处理拨打电话事件
    toPhone() {
      const phoneNum = this.siteInfo.phone
      window.location.href = 'tel:' + phoneNum
    },
  },
}
</script>
<style lang="less" scoped>
.rules {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  span {
    color: @themeColor;
  }
}
.uploader {
  height: 6rem;
  .tip {
    color: #ccc;
    font-size: 0.8rem;
  }
}
.btn_warp {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  .btn {
    width: @buttonWidth;
  }
}
.bom_tip {
  width: 100%;
  color: #ccc;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
}
.popup {
  box-sizing: border-box;
  width: 15rem;
  height: 13rem;
  text-align: center;
  .popup_item {
    width: 100%;
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .icon {
    position: absolute;
    top: 1rem;
  }
  .btn_warp {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    .btn {
      width: 45%;
      height: 2.5rem;
    }
  }
}
.van-popup--center {
  top: 25%;
}
::v-deep .van-image__img {
  width: 4rem;
  height: 4rem;
}
</style>
