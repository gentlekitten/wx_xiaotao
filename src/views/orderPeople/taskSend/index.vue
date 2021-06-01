<template>
  <div class="home">
    <!-- 顶部返回 -->
    <nav-bar :title="navTitle" is-arrow isBackUp />
    <div v-if="id === '2'" class="top_tip">
      联系方式等必要信息请填入
      <span>备注信息</span>中
    </div>
    <address-select-cell
      v-if="id !== '2'"
      :addressObj="addressObj"
      :addressSelectList="addressSelectList"
    />
    <!-- 取件地址输入框 -->
    <van-cell-group>
      <van-field v-model="taskForm.title" required label="任务标题：" placeholder="请输入任务标题" clearable />
    </van-cell-group>
    <van-cell
      title="预约时间"
      is-link
      arrow-direction="down"
      :value="taskForm.beforeTime"
      @click="clickTime"
    />
    <van-popup class="popup" v-model="timeIsShow" position="top" round>
      <van-dropdown-menu class="dropdown">
        <van-dropdown-item v-model="timeDropdownValue1" :options="timeDropdownOption1" />
        <van-dropdown-item v-model="timeDropdownValue2" :options="timeDropdownOption2" />
        <van-dropdown-item
          v-if="timeDropdownOption2[0].text !== '尽快'"
          v-model="timeDropdownValue3"
          :options="timeDropdownOption3"
        />
      </van-dropdown-menu>
      <van-button class="btn" type="primary" @click="timeDropdownConfirm">确定</van-button>
    </van-popup>
    <!-- 备注信息 -->
    <van-cell-group>
      <van-field v-model="taskForm.otherMsg" clearable label="备注：" placeholder="请输入备注" />
    </van-cell-group>
    <!-- 选取图片 -->
    <van-field class="uploaderImg" name="uploaderImg" label="附图（至多3张）：" autosize>
      <template #input>
        <van-uploader
          v-model="uploaderImg"
          :max-count="3"
          :max-size="5120 * 1024"
          @oversize="handleImgLarge"
          :after-read="uploading"
          @delete="deleteImg"
        />
      </template>
    </van-field>
    <!-- 接单时效 -->
    <van-cell
      title="接单时效"
      is-link
      arrow-direction="down"
      :value="requireTime.expressName"
      @click="orderTimeOverlayIsShow = true"
    />
    <!-- 接单时效 遮蔽层 -->
    <van-overlay :show="orderTimeOverlayIsShow" @click="orderTimeOverlayIsShow = false">
      <overlay-item :radio-list="orderTimeRadioList" @radioChange="orderTimeRadioChange" />
    </van-overlay>
    <!-- 性别要求 -->
    <van-cell
      title="性别要求"
      is-link
      arrow-direction="down"
      :value="requireSex.expressName"
      @click="sexRequireOverlayIsShow = true"
    />
    <!-- 性别要求 遮蔽层 -->
    <van-overlay :show="sexRequireOverlayIsShow" @click="sexRequireOverlayIsShow = false">
      <overlay-item :radio-list="sexRequireRadioList" @radioChange="sexRequireRadioChange" />
    </van-overlay>
    <!-- 任务小费 -->
    <van-cell-group>
      <van-field
        v-model.number="taskForm.price"
        type="number"
        clearable
        label="任务小费："
        placeholder="小费不能少于￥1哦~"
        @blur="inputBlue"
      />
    </van-cell-group>
    <!-- 条款 -->
    <div class="rules">
      下单即表示你已阅读并同意
      <span>《服务协议》</span>
    </div>
    <!-- 发布任务底部 -->
    <van-submit-bar
      text-align="left"
      :price="taskForm.price * 100"
      button-text="提交订单"
      @submit="sendTask"
    />
  </div>
</template>
<script>
import { upData, upLogo, getData } from '@/api/api.js'

import timeFilter from '@/assets/js/time.js'

import NavBar from '@/components/common/NavBar.vue'

import OverlayItem from '@/components/express/OverlayItem.vue'
import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

export default {
  components: {
    NavBar,
    AddressSelectCell,
    OverlayItem
  },
  data() {
    return {
      id: 0,
      //   选择的类别
      navTitle: '',
      //   当前时间
      currentTime: new Date(),
      // taskTypeOverlayIsShow: false,
      orderTimeOverlayIsShow: false,
      timeIsShow: false,
      sexRequireOverlayIsShow: false,
      // 预约时间第一个值
      timeDropdownValue1: 0,
      timeDropdownValue2: 'a',
      timeDropdownValue3: 'A',
      // 预约时间弹出框第一个下拉选择列表
      timeDropdownOption1: [
        { text: '今天', value: 0 },
        { text: '明天', value: 1 },
        { text: '后天', value: 2 }
      ],
      timeDropdownOption2: [
        { text: '06点', value: 'a' },
        { text: '07点', value: 'b' },
        { text: '08点', value: 'c' },
        { text: '09点', value: 'd' },
        { text: '10点', value: 'e' },
        { text: '11点', value: 'f' },
        { text: '12点', value: 'j' },
        { text: '13点', value: 'h' },
        { text: '14点', value: 'i' },
        { text: '15点', value: 'j' },
        { text: '16点', value: 'k' },
        { text: '17点', value: 'l' },
        { text: '18点', value: 'm' },
        { text: '19点', value: 'n' },
        { text: '20点', value: 'o' },
        { text: '21点', value: 'p' },
        { text: '22点', value: 'q' },
        { text: '23点', value: 'r' }
      ],
      timeDropdownOption3: [
        { text: '30分', value: 'A' },
        { text: '45分', value: 'B' }
      ],
      // 上传图片列表
      uploaderImg: [],
      // 接单时效
      requireTime: {
        id: 1,
        expressName: '1小时'
      },
      // 性别要求
      requireSex: {
        id: 0,
        expressName: '性别不限'
      },
      //   表单数据
      taskForm: {
        startAddressId: 10,
        endAddressId: 11,
        title: 'title',
        endTime: '',
        sex: 2,
        beforeTime: '今天-尽快',
        otherMsg: '备注',
        price: 3,
        siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
          : 0,
        deliveryOrderPics: []
      },
      //   地址选择cell信息
      addressSelectList: [
        {
          type: '起',
          title: '请新增或选择地址'
        },
        {
          type: '达',
          title: '请新增或选择地址'
        }
      ],
      //   任务类别列表
      taskTypeRadioList: [
        {
          name: '0',
          title: '选择取件点'
        },
        {
          name: '1',
          title: '妈妈驿站'
        },
        {
          name: '2',
          title: '菜鸟驿站'
        },
        {
          name: '3',
          title: '天猫超市'
        },
        {
          name: '4',
          title: '京东派-安澜雅苑小区'
        },
        {
          name: '5',
          title: '自定义'
        }
      ],
      //   接单时效列表
      orderTimeRadioList: [
        {
          id: 1,
          expressName: '1小时'
        },
        {
          id: 2,
          expressName: '2小时'
        },
        {
          id: 5,
          expressName: '5小时'
        },
        {
          id: 10,
          expressName: '10小时'
        },
        {
          id: 24,
          expressName: '24小时'
        }
      ],
      //   性别要求列表
      sexRequireRadioList: [
        {
          id: 0,
          expressName: '性别不限'
        },
        {
          id: 1,
          expressName: '男性'
        },
        {
          id: 2,
          expressName: '女性'
        }
      ],
      addressObj: {}
    }
  },
  watch: {
    // 处理接单时效
    timeDropdownValue1() {
      if (this.timeDropdownValue1 !== 0) {
        this.timeDropdownOption2 = [
          { text: '06点', value: 'a' },
          { text: '07点', value: 'b' },
          { text: '08点', value: 'c' },
          { text: '09点', value: 'd' },
          { text: '10点', value: 'e' },
          { text: '11点', value: 'f' },
          { text: '12点', value: 'j' },
          { text: '13点', value: 'h' },
          { text: '14点', value: 'i' },
          { text: '15点', value: 'j' },
          { text: '16点', value: 'k' },
          { text: '17点', value: 'l' },
          { text: '18点', value: 'm' },
          { text: '19点', value: 'n' },
          { text: '20点', value: 'o' },
          { text: '21点', value: 'p' },
          { text: '22点', value: 'q' },
          { text: '23点', value: 'r' }
        ]
      } else {
        this.timeDropdownOption2 = [
          { text: '尽快', value: 'a' },
          { text: '07点', value: 'b' },
          { text: '08点', value: 'c' },
          { text: '09点', value: 'd' },
          { text: '10点', value: 'e' },
          { text: '11点', value: 'f' },
          { text: '12点', value: 'j' },
          { text: '13点', value: 'h' },
          { text: '14点', value: 'i' },
          { text: '15点', value: 'j' },
          { text: '16点', value: 'k' },
          { text: '17点', value: 'l' },
          { text: '18点', value: 'm' },
          { text: '19点', value: 'n' },
          { text: '20点', value: 'o' },
          { text: '21点', value: 'p' },
          { text: '22点', value: 'q' },
          { text: '23点', value: 'r' }
        ]
        const beforTime = this.currentTime - 7
        this.timeDropdownOption2.splice(1, Number(beforTime) + 1)
      }
    }
  },
  created() {
    const { id, title } = this.$route.query
    if (id === '1') {
      this.addressSelectList = [
        {
          type: '达',
          title: '请新增或选择地址'
        }
      ]
    }
    this.id = id
    this.navTitle = title
    this.getAddress()
  },
  methods: {
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    async getAddress() {
      // 获取地址对象
      JSON.parse(window.sessionStorage.getItem('addressObj')) &&
        (this.addressObj = JSON.parse(
          window.sessionStorage.getItem('addressObj')
        ))
      if (Object.keys(this.addressObj).length > 0) {
        return false
      }
      const res = await getData(
        '/customer/address/my/find',
        {
          siteId: this.siteId
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        const addressObj = res.data.filter(e => {
          return e.addressDefault === 1
        })[0]
        addressObj.name = addressObj.realname
        addressObj.phone = addressObj.phone
        addressObj.address =
          addressObj.province +
          addressObj.city +
          addressObj.district +
          addressObj.addressDetail
        this.addressObj = addressObj
        return false
      }
      this.$handelCode.handleCode(res)
    },
    // 接单时效radio改变
    orderTimeRadioChange(radioIndex) {
      const index = this.orderTimeRadioList.findIndex(e => {
        return radioIndex === e.id
      })
      this.requireTime = this.orderTimeRadioList[index]
    },
    // 性别要求radio改变
    sexRequireRadioChange(radioIndex) {
      this.requireSex = this.sexRequireRadioList[radioIndex]
    },
    // 处理点击预约时间
    clickTime() {
      this.timeIsShow = true
      this.currentTime = new Date().getHours()
      const beforTime = this.currentTime - 7
      if (this.timeDropdownValue1 === 0) {
        this.timeDropdownOption2 = [
          { text: '尽快', value: 'a' },
          { text: '07点', value: 'b' },
          { text: '08点', value: 'c' },
          { text: '09点', value: 'd' },
          { text: '10点', value: 'e' },
          { text: '11点', value: 'f' },
          { text: '12点', value: 'j' },
          { text: '13点', value: 'h' },
          { text: '14点', value: 'i' },
          { text: '15点', value: 'j' },
          { text: '16点', value: 'k' },
          { text: '17点', value: 'l' },
          { text: '18点', value: 'm' },
          { text: '19点', value: 'n' },
          { text: '20点', value: 'o' },
          { text: '21点', value: 'p' },
          { text: '22点', value: 'q' },
          { text: '23点', value: 'r' }
        ]
        this.timeDropdownOption2.splice(1, Number(beforTime) + 1)
      }
    },
    // 处理预约时间弹出层点击确定按钮
    timeDropdownConfirm() {
      this.timeIsShow = false
      const time1 = this.timeDropdownOption1[this.timeDropdownValue1].text
      const time2 = this.timeDropdownOption2.filter(item => {
        return item.value === this.timeDropdownValue2
      })[0].text
      const time3 = this.timeDropdownOption3.filter(item => {
        return item.value === this.timeDropdownValue3
      })[0].text
      let time = null
      if (this.timeDropdownOption2[0].text === '尽快') {
        time = time1 + '-' + time2
      } else {
        time = time1 + '-' + time2 + '-' + time3
      }
      this.taskForm.beforeTime = time
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('orderImg', file.file)
      const res = await upLogo('/site/delivery/order/img', formData)
      console.log(res)
      this.taskForm.deliveryOrderPics.push({ picAddress: res.data.filename })
      if (res.code === '0') {
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 删除上传图片
    deleteImg(file, detail) {
      this.uploaderImg.splice(detail.index, 1)
      this.form.deliveryOrderPics.splice(detail.index, 1)
    },
    // 小费输入框失去焦点
    inputBlue() {
      if (this.taskForm.price < 1) {
        this.$toast.fail('任务小费不能低于￥1！')
        this.taskForm.price = 1
      }
    },
    // 发布任务
    async sendTask() {
      if (!this.taskForm.title) {
        return this.$toast.fail('请填写完整！')
      }
      const hours = this.requireTime.id
      const time = timeFilter.gettime.setTime(hours * 60 * 60 * 1000)
      this.taskForm.endTime = time
      this.taskForm.sex = this.requireSex.id
      const res = await upData('/site/delivery/order/add', this.taskForm, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('发布成功！')
        return false
      }
      this.$handleCode.handleCode(res)
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 5rem;
}
.top_tip {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #999;
  span {
    color: @themeColor;
  }
}
.van-cell__value {
  color: #000;
  font-size: 1rem;
}
.popup {
  height: 10rem;
  .dropdown {
    margin: 1rem 0;
  }
  .btn {
    float: right;
    width: 10rem;
    height: 2.3rem;
    border-radius: 0.2rem;
    margin: 1rem;
  }
}
.uploaderImg {
  height: 6rem;
}
.rules {
  width: 100%;
  height: 3rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  span {
    color: @themeColor;
  }
}
.van-cell__title {
  font-size: 0.9rem;
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
.van-submit-bar__bar {
  height: 3.5rem;
  .van-button {
    width: 8rem;
  }
}
.van-overlay {
  z-index: 101;
}
</style>