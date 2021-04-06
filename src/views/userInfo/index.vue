<template>
  <div class="home">
    <nav-bar :title="'编辑资料'" :back-to="'/user'" :is-arrow="true" />
    <div class="user_info">
      <div class="item1 item">
        <van-cell class="disabled" title="头像" />
        <van-cell class="disabled" title="昵称" value="小明" />
      </div>
      <div class="item2 item">
        <van-cell title="性别" :value="sex" @click="sexSelectShow = true" />
        <van-action-sheet
          v-model="sexSelectShow"
          :actions="userInfoForm.sexValue"
          cancel-text="取消"
          close-on-click-action
          @select="sexConfirm"
        />
        <van-cell title="生日" :value="birthday" @click="birthdayShow = true" />
        <div class="bri">
          <van-action-sheet v-model="birthdayShow">
            <van-datetime-picker
              v-model="userInfoForm.selectBirthdayDate"
              type="date"
              title="选择年月日"
              :min-date="minBirthdayDate"
              :max-date="maxBirthdayDate"
              @confirm="confirmBirthday"
              @cancel="cancelBirthday"
            />
          </van-action-sheet>
        </div>
      </div>
      <div class="item3 item">
        <van-cell title="学校" :value="school" @click="schoolSelectShow = true" />
        <van-action-sheet v-model="schoolSelectShow" title="填写学校">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.schoolValue"
              autofocus
              clearable
              label="学校："
              placeholder="请填学校名称"
            />
            <van-button class="btn" type="primary" @click="saveSchool">确认</van-button>
          </van-cell-group>
        </van-action-sheet>

        <van-cell title="院系" :value="department" @click="departmentSelectShow = true" />
        <van-action-sheet v-model="departmentSelectShow" title="填写院系">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.departmentValue"
              autofocus
              clearable
              label="院系："
              placeholder="请填院系名称"
            />
            <van-button class="btn" type="primary" @click="saveDepartment">确认</van-button>
          </van-cell-group>
        </van-action-sheet>

        <van-cell title="班号" :value="grade" @click="gradeSelectShow = true" />
        <van-action-sheet v-model="gradeSelectShow" title="填写班号">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.gradeValue"
              autofocus
              clearable
              label="班号："
              placeholder="请填班号名称"
            />
            <van-button class="btn" type="primary" @click="saveGrade">确认</van-button>
          </van-cell-group>
        </van-action-sheet>

        <van-cell title="学号" :value="studentNo" @click="studentNoSelectShow = true" />
        <van-action-sheet v-model="studentNoSelectShow" title="填写学号">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.studentNoValue"
              type="number"
              autofocus
              clearable
              label="学号："
              placeholder="请填学号"
            />
            <van-button class="btn" type="primary" @click="saveStudentNo">确认</van-button>
          </van-cell-group>
        </van-action-sheet>

        <van-cell title="宿舍号" :value="dormitoryNo" @click="dormitoryNoSelectShow = true" />
        <van-action-sheet v-model="dormitoryNoSelectShow" title="填写宿舍号">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.dormitoryNoValue"
              autofocus
              clearable
              label="宿舍号："
              placeholder="请填宿舍号"
            />
            <van-button class="btn" type="primary" @click="saveDormitoryNo">确认</van-button>
          </van-cell-group>
        </van-action-sheet>
      </div>

      <div class="item4 item">
        <van-cell title="邮箱" :value="email" @click="emailSelectShow = true" />
        <van-action-sheet v-model="emailSelectShow" title="填写邮箱">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.emailValue"
              autofocus
              clearable
              label="邮箱："
              placeholder="填写邮箱"
            />
            <van-button class="btn" type="primary" @click="saveEmail">确认</van-button>
          </van-cell-group>
        </van-action-sheet>
        <van-cell title="电话" :value="phone" @click="phoneSelectShow = true" />
        <van-action-sheet v-model="phoneSelectShow" title="填写电话">
          <van-cell-group class="action_sheet_input">
            <van-field
              v-model="userInfoForm.phValue"
              autofocus
              clearable
              type="number"
              label="电话："
              placeholder="填写电话"
            />
            <van-button class="btn" type="primary" @click="savePh">确认</van-button>
          </van-cell-group>
        </van-action-sheet>
      </div>
      <div class="item5 item">
        <van-cell title="收货地址" is-link @click="toAddressList" />
        <van-cell title="我的二维码" is-link to="/user/userInfo/code" />
      </div>
      <div class="btn_warp">
        <van-button class="btn" type="primary" round @click="saveUserInfo">保存</van-button>
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
      schoolSelectShow: false,
      sexSelectShow: false,
      departmentSelectShow: false,
      birthdayShow: false,
      gradeSelectShow: false,
      emailSelectShow: false,
      phoneSelectShow: false,
      studentNoSelectShow: false,
      dormitoryNoSelectShow: false,
      sex: '男',
      school: '',
      department: '',
      birthday: '',
      grade: '',
      studentNo: '',
      dormitoryNo: '',
      phone: '',
      email: '',
      userInfoForm: {
        sexValue: [{ name: '男' }, { name: '女' }],
        schoolValue: '',
        departmentValue: '',
        gradeValue: '',
        studentNoValue: '',
        dormitoryNoValue: '',
        emailValue: '',
        phValue: '',
        selectBirthdayDate: new Date()
      },
      minBirthdayDate: new Date(2000, 0, 1),
      maxBirthdayDate: new Date(2020, 10, 1)
    }
  },
  methods: {
    sexConfirm(item) {
      this.sex = item.name
    },
    roleConfirm(item) {
      this.role = item.name
    },
    confirmBirthday() {
      const birthdayTime = this.userInfoForm.selectBirthdayDate
      const y = birthdayTime.getFullYear()
      const m = (birthdayTime.getMonth() + 1 + '').padStart(2, '0')
      const d = (birthdayTime.getDate() + '').padStart(2, '0')
      this.birthday = `${y}-${m}-${d}`

      this.birthdayShow = false
    },
    cancelBirthday() {
      this.birthdayShow = false
    },
    // 保存用户信息
    saveUserInfo() {
      console.log('save')
    },
    toAddressList() {
      this.$router.push('/user/userInfo/addressList')
    },
    saveSchool() {
      console.log(this.userInfoForm.schoolValue)
      if (!this.handleInputValueIsNull(this.userInfoForm.schoolValue)) {
        return false
      }
      this.school = this.userInfoForm.schoolValue
      this.schoolSelectShow = false
    },
    saveDepartment() {
      if (!this.handleInputValueIsNull(this.userInfoForm.departmentValue)) {
        return false
      }
      this.department = this.userInfoForm.departmentValue
      this.departmentSelectShow = false
    },
    saveGrade() {
      if (!this.handleInputValueIsNull(this.userInfoForm.gradeValue)) {
        return false
      }
      this.grade = this.userInfoForm.gradeValue
      this.gradeSelectShow = false
    },
    saveStudentNo() {
      if (!this.handleInputValueIsNull(this.userInfoForm.studentNoValue)) {
        return false
      }
      this.studentNo = this.userInfoForm.studentNoValue
      this.studentNoSelectShow = false
    },
    saveDormitoryNo() {
      if (!this.handleInputValueIsNull(this.userInfoForm.dormitoryNoValue)) {
        return false
      }
      this.dormitoryNo = this.userInfoForm.dormitoryNoValue
      this.dormitoryNoSelectShow = false
    },
    saveEmail() {
      if (!this.handleInputValueIsNull(this.userInfoForm.emailValue)) {
        return false
      }
      this.email = this.userInfoForm.emailValue
      this.emailSelectShow = false
    },
    savePh() {
      if (!this.handleInputValueIsNull(this.userInfoForm.phValue)) {
        return false
      }
      this.phone = this.userInfoForm.phValue
      this.phoneSelectShow = false
    },
    // 处理表单值为空
    handleInputValueIsNull(inputValue) {
      if (inputValue === '') {
        this.$toast.fail('不能为空！')
        return false
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 5rem;
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
}
.van-cell {
  height: 3.5rem;
  font-size: 1rem;
}
.van-cell__value {
  text-align: left;
}
.item {
  margin: 1rem 0;
}
.bri {
  position: relative;
}
.bri .van-popup--bottom {
  height: 18rem;
}
.bri .van-action-sheet__item {
  position: absolute;
  top: 80%;
  border: 1px solid #eee;
}
.btn_warp {
  width: 100%;
  display: flex;
  justify-content: center;
  .btn {
    width: 80%;
    height: 3rem;
  }
}
.action_sheet_input {
  padding: 2rem;
  display: flex;
  .btn {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
