<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar
      :title="siteInfo.siteName + '-快递服务'"
      is-arrow
      backTo="/index"
    />
    <!-- 遮蔽层 -->
    <van-overlay :show="overlayIsShow" @click="overlayIsShow = false">
      <div class="tip">
        <h2 class="title">
          ☆☆
          <span>快递服务公告</span>☆☆
        </h2>
        感谢同学们的支持，我们或用心做好服务，谢谢，有什么问题联系客服
      </div>
    </van-overlay>
    <!-- tabs -->
    <tabs
      :tab-list="tabList"
      :sticky="true"
      tabsIndexName="expressageTabActive"
      @changeTab="changeTab"
    >
      <template v-slot:tab0>
        <address-select-cell
          :start-address-obj="startAddressObj"
          :end-address-obj="endAddressObj"
          :address-select-list="tab0AddressSelectList"
        />
        <div class="cell">
          <van-cell>
            <template #title>
              <div class="cell_item" @click="tab0OverlayIsShow = true">
                <div class="title title_qu">取</div>
                <div class="content">{{ expressAddressObj.expressName }}</div>
              </div>
            </template>
            <template #right-icon>
              <van-icon name="arrow-down" color="#000" size="1rem" />
            </template>
          </van-cell>
        </div>
        <!-- 取件地址输入框 -->
        <!-- <van-cell-group v-show="expressAddressObj.title === '自定义'">
          <van-field
            v-model="expressAddress"
            :error="expressAddressIsNull"
            required
            label="取件地址："
            placeholder="请输入取件地址"
            clearable
            @blur="expressAddressLoseBlur"
          />
        </van-cell-group>-->
        <!-- 表单 -->
        <van-form class="form" @submit="onFormSubmit">
          <!-- 取件信息 -->
          <van-field
            class="textarea"
            v-model="pickUpInfo.receiveMessage"
            rows="2"
            autosize
            label="取件信息："
            type="textarea"
            placeholder="请输入取件信息"
            clearable
            required
            :rules="[{ required: true }]"
          />
          <!-- 备注 -->
          <van-field
            v-model="pickUpInfo.otherMessage"
            name="备注信息："
            label="备注信息："
            placeholder="时间、无接触配送、代付、指定快递员等"
          />
          <!-- 文件上传 -->
          <van-field
            class="uploaderImg"
            name="uploaderImg"
            label="可选附图（至多6张）："
            autosize
          >
            <template #input>
              <van-uploader
                v-model="uploaderImg"
                :max-count="6"
                :max-size="5120 * 1024"
                @oversize="handleImgLarge"
                :after-read="uploading"
              />
            </template>
          </van-field>
          <!-- 单选 -->
          <van-field
            v-if="formPecificationList.length > 0"
            class="radio_wap"
            name="radio"
            required
            label="规格必选："
          >
            <template #input>
              <van-radio-group
                v-model.number="pickUpInfo.specificationId"
                direction="horizontal"
              >
                <van-radio
                  class="radio"
                  v-for="item in formPecificationList"
                  :key="item.id"
                  :name="item.id"
                >
                  {{ item.serviceName }}
                  <span>￥{{ item.servicePrice }}</span>
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 复选框 -->
          <van-field
            v-if="formServerList.length > 0 && tabIndex === 0"
            class="checkboxGroup"
            name="checkboxGroup"
            label="可选服务："
          >
            <template #input>
              <van-checkbox-group
                v-if="tabIndex === 0"
                v-model="expressOrderServiceIds"
                direction="horizontal"
              >
                <van-checkbox
                  class="checkbox"
                  v-for="item in formServerList"
                  :key="item.id"
                  :name="item.id"
                  shape="square"
                >
                  {{ item.serviceName }}
                  <span>+￥{{ item.servicePrice }}</span>
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <div class="bot_input">
            <van-field
              class="num"
              v-model.number="pickUpInfo.productNumber"
              type="number"
              label="单量："
              clearable
              @blur="numInputBlur"
            />
            <van-field
              class="num"
              type="number"
              v-model.number="pickUpInfo.smallChange"
              label="小费："
              placeholder="随心意"
              clearable
              @blur="tipInputBlur"
            />
          </div>
          <div class="total_price">总计：{{ handleGetTotalPrice }}元</div>
          <div class="button">
            <van-button round block type="primary" native-type="onFormSubmit"
              >提交订单</van-button
            >
          </div>
          <div class="bot_tip total_price">
            信息仅接单的快递小哥可见，安全放心。
          </div>
        </van-form>
      </template>
      <template v-slot:tab1>
        <address-select-cell
          :start-address-obj="startAddressObj"
          :end-address-obj="endAddressObj"
          :address-select-list="tab1AddressSelectList"
        />
        <div class="address_require">
          <van-cell>
            <template #title>
              <div class="item" @click="tab1OverlayIsShow = true">
                <div class="title">快递要求：</div>
                <div class="content">{{ collectAddressObj.expressName }}</div>
              </div>
            </template>
            <template #right-icon>
              <van-icon name="arrow-down" color="#000" size="1rem" />
            </template>
          </van-cell>
        </div>
        <van-form class="sendoff_form" @submit="sendOffFormSubmit">
          <!-- 寄往姓名： -->
          <van-field
            v-model="sendOffInfo.toName"
            name="寄往姓名："
            label="寄往姓名："
            placeholder="收件人姓名"
            clearable
            required
            :rules="[{ required: true }]"
          />
          <!-- 寄往电话： -->
          <van-field
            v-model="sendOffInfo.toPhone"
            name="寄往电话："
            label="寄往电话："
            placeholder="收件人电话"
            clearable
            required
            :rules="[{ required: true }]"
          />
          <!-- 寄往地址： -->
          <van-field
            v-model="sendOffInfo.toAddress"
            name="寄往地址："
            label="寄往地址："
            placeholder="收件人地址"
            clearable
            required
            :rules="[{ required: true }]"
          />
          <van-field
            class="uploaderImg"
            name="uploaderImg"
            label="可选附图（至多6张）："
            autosize
          >
            <template #input>
              <van-uploader
                v-model="sendOffuploaderImg"
                multiple
                :max-count="6"
                :max-size="5120 * 1024"
                @oversize="handleImgLarge"
                :after-read="sendOffuploading"
              />
            </template>
          </van-field>
          <!-- 备注信息： -->
          <van-field
            v-model="sendOffInfo.otherMessage"
            name="备注信息："
            label="备注信息："
            placeholder="备注信息"
            clearable
          />
          <!-- 上门小费： -->
          <div class="price_warp">
            上门小费：
            <div class="price">￥{{ expressMoney }}</div>
          </div>
          <div class="button">
            <van-button
              round
              block
              type="primary"
              native-type="sendOffFormSubmit"
              >提交订单</van-button
            >
          </div>
          <div class="tip">上门收件后称重计量，按标准收费</div>
        </van-form>
      </template>
    </tabs>
    <!-- tab0 遮蔽层 -->
    <van-overlay :show="tab0OverlayIsShow" @click="tab0OverlayIsShow = false">
      <overlay-item
        :radio-list="pickUpExpressName"
        @radioChange="tab0RadioChange"
      />
    </van-overlay>
    <!-- tab1 遮蔽层 -->
    <van-overlay :show="tab1OverlayIsShow" @click="tab1OverlayIsShow = false">
      <overlay-item
        :radio-list="sendOffExpressName"
        @radioChange="tab1RadioChange"
      />
    </van-overlay>
  </div>
</template>
<script>
import { upData, upLogo, getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'
import Tabs from '@/components/common/TabIsDifferent.vue'

import OverlayItem from '@/components/express/OverlayItem.vue'
import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    NavBar,
    Tabs,
    OverlayItem,
    AddressSelectCell,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      tabIndex: Number(window.sessionStorage.getItem(this.tabsIndexName))
        ? Number(window.sessionStorage.getItem(this.tabsIndexName))
        : 0,
      // 站点信息
      siteInfo: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo'))
        : {},
      siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
        : 0,
      // 是否显示遮蔽层
      overlayIsShow: true,
      // tab0 遮蔽层
      tab0OverlayIsShow: false,
      tab1OverlayIsShow: false,
      // 取件地址
      // expressAddress: '',
      // 取件地址是否为空
      // expressAddressIsNull: false,
      // 取件信息图片
      uploaderImg: [],
      expressOrderServiceIds: [],
      // 取件信息表单对象
      pickUpInfo: {
        customerAddressId: '',
        expressId: '',
        receiveMessage: '',
        otherMessage: '',
        specificationId: '',
        expressOrderServiceIds: [],
        productNumber: 1,
        smallChange: 0,
        siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
          : 0,
        expressOrderPics: [],
      },
      sendOffuploaderImg: [],
      // 寄出快递表单对象
      sendOffInfo: {
        customerAddressId: '',
        expressId: '',
        toName: '',
        toPhone: '',
        toAddress: '',
        otherMessage: '',
        siteId: JSON.parse(window.sessionStorage.getItem('siteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id
          : 0,
        expressOrderPics: [],
      },
      // 取件地址对象
      expressAddressObj: {
        id: 0,
        expressName: '选择取件点',
      },
      // 揽件地址对象
      collectAddressObj: {
        id: 0,
        expressName: '选择快递商',
      },
      // 表单规格列表
      formPecificationList: [],
      // 表单可选服务列表
      formServerList: [],
      // tab0 radio列表
      pickUpExpressName: [
        {
          id: 0,
          expressName: '选择取件点',
        },
      ],
      // tab1 radio列表
      sendOffExpressName: [
        {
          id: 0,
          expressName: '选择快递商',
        },
      ],
      // tab列表
      tabList: [
        {
          title: '代取快递',
        },
        {
          title: '寄出快递',
        },
      ],
      // tab0 地址单元格信息
      tab0AddressSelectList: [
        {
          type: '送',
          title: '请新增或选择地址',
          name: 'startAddressObj',
        },
      ],
      // tab1 地址单元格信息
      tab1AddressSelectList: [
        {
          type: '揽',
          title: '请新增或选择地址',
          name: 'startAddressObj',
        },
      ],
      // 地址对象
      startAddressObj: {},
      endAddressObj: {},
      // 上门小费
      expressMoney: 0,
    }
  },
  computed: {
    handleGetTotalPrice() {
      let radioPrice = 0
      if (this.formPecificationList.length > 0) {
        radioPrice = this.formPecificationList.filter((e) => {
          return this.pickUpInfo.specificationId === e.id
        })[0].servicePrice
      }
      let checkPrice = 0
      if (
        this.expressOrderServiceIds.length > 0 &&
        this.formServerList.length > 0
      ) {
        this.expressOrderServiceIds.forEach((e) => {
          checkPrice += this.formServerList.filter((c) => {
            return e === c.id
          })[0].servicePrice
        })
      }
      const totalPrice =
        (radioPrice + checkPrice) * this.pickUpInfo.productNumber +
        Number(this.pickUpInfo.smallChange)
      return totalPrice
    },
  },
  created() {
    this.getSiteExpressName()
    this.getAddress()
    this.getPecificationAndServerList()
    this.getExpressMoney()
  },
  methods: {
    // 获取规格和可选服务
    async getPecificationAndServerList() {
      const res = await getData(
        '/site/express/service/config/find',
        {},
        {
          showLoading: true,
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.formPecificationList = res.data.serviceConfig
        this.formServerList = res.data.expressOther
        this.pickUpInfo.specificationId = this.formPecificationList[0].id
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    async getAddress() {
      // 获取地址对象
      JSON.parse(window.sessionStorage.getItem('startAddressObj')) &&
        (this.startAddressObj = JSON.parse(
          window.sessionStorage.getItem('startAddressObj')
        ))
      JSON.parse(window.sessionStorage.getItem('endAddressObj')) &&
        (this.endAddressObj = JSON.parse(
          window.sessionStorage.getItem('endAddressObj')
        ))
      if (
        Object.keys(this.startAddressObj).length > 0 &&
        Object.keys(this.endAddressObj).length > 0
      ) {
        return false
      }
      const res = await getData(
        '/customer/address/my/find',
        {
          siteId: this.siteId,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        const addressObj = res.data.filter((e) => {
          return e.addressDefault === 1
        })[0]
        if (Object.keys(addressObj).length <= 0) {
          return false
        }
        addressObj.name = addressObj.realname
        addressObj.phone = addressObj.phone
        addressObj.address =
          addressObj.province +
          addressObj.city +
          addressObj.district +
          addressObj.addressDetail
        if (Object.keys(this.startAddressObj).length <= 0) {
          this.startAddressObj = addressObj
        }
        if (Object.keys(this.endAddressObj).length <= 0) {
          this.endAddressObj = addressObj
        }
        return false
      }
      this.$handelCode.handleCode(res)
    },
    // 获取站点的快递
    async getSiteExpressName() {
      const data = {
        siteId: this.siteId,
      }
      const res = await getData('/site/express/info', data, {
        showLoading: false,
      })
      console.log(res)
      if (res.code === '0') {
        this.pickUpExpressName.push(...res.data)
        this.sendOffExpressName.push(...res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 获取上门小费
    async getExpressMoney() {
      const res = await getData(
        '/site/express/fee/find',
        {
          siteId: this.siteId,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.expressMoney = res.data.expressMoney
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片
    async uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('img', file.file)
      const res = await upLogo('/site/express/img', formData)
      console.log(res)
      if (res.code === '0') {
        this.pickUpInfo.expressOrderPics.push({ picAddress: res.data.filename })
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 处理上传图片
    async sendOffuploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('img', file.file)
      const res = await upLogo('/site/express/img', formData)
      console.log(res)
      if (res.code === '0') {
        this.sendOffInfo.expressOrderPics.push({
          picAddress: res.data.filename,
        })
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    // 选择取件点radio改变
    tab0RadioChange(radioIndex) {
      this.expressAddressObj = this.pickUpExpressName.filter((e) => {
        return e.id === radioIndex
      })[0]
    },
    // 快递要求radio改变
    tab1RadioChange(radioIndex) {
      this.collectAddressObj = this.sendOffExpressName.filter((e) => {
        return e.id === radioIndex
      })[0]
    },
    // 地址输入框失去焦点
    // expressAddressLoseBlur() {
    //   if (this.expressAddress === '') {
    //     this.expressAddressIsNull = true
    //   }
    // },
    // 代取快递表单提交
    async onFormSubmit() {
      if (this.expressAddressObj.expressName === '选择取件点') {
        return this.$toast.fail('请选择取件点！')
      }
      if (Object.keys(this.startAddressObj).length < 0) {
        return this.$toast.fail('请选择地址！')
      }
      // 获取选择的服务id
      this.expressOrderServiceIds.forEach((e) => {
        this.pickUpInfo.expressOrderServiceIds.push({ serviceId: e })
      })
      // 地址id
      this.pickUpInfo.customerAddressId = this.startAddressObj.id
      // 快递id
      this.pickUpInfo.expressId = this.expressAddressObj.id
      const res = await upData('/site/express/receive/add', this.pickUpInfo, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        // 混入
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 寄出快递表单提交
    async sendOffFormSubmit() {
      if (this.collectAddressObj.expressName === '选择快递商') {
        return this.$toast.fail('请选择快递商！')
      }
      if (Object.keys(this.endAddressObj).length < 0) {
        return this.$toast.fail('请选择地址！')
      }
      const formInfo = this.sendOffInfo
      const telValidator = /^1[3|4|5|7|8][0-9]{9}$/
      if (!telValidator.test(formInfo.toPhone)) {
        return this.$toast.fail('手机号码格式错误！')
      }
      // 地址id
      formInfo.customerAddressId = this.endAddressObj.id
      // 快递id
      formInfo.expressId = this.collectAddressObj.id
      const res = await upData('/site/express/send/add', formInfo, {
        showLoading: true,
      })
      console.log(res)
      if (res.code === '0') {
        // 混入
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 点击tab
    changeTab(index) {
      this.tabIndex = index
    },
    // 小费输入框失去焦点
    tipInputBlur() {
      if (this.pickUpInfo.tip < 0) {
        this.$toast.fail('小费不能小于0哦~！')
        this.pickUpInfo.tip = 0
      }
    },
    // 单量输入框失去焦点
    numInputBlur() {
      if (this.pickUpInfo.num < 1) {
        this.$toast.fail('单量不能小于1哦~！')
        this.pickUpInfo.num = 1
      }
    },
  },
}
</script>
<style lang="less" scoped>
.tip {
  color: #fff;
  text-align: center;
  font-size: 1rem;
  padding: 3rem 1rem;
  line-height: 2rem;
  .title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    span {
      margin: 0 0.5rem;
    }
  }
}
.cell {
  margin: 0.5rem 0;
  height: 4rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  .cell_item {
    display: flex;
    .title {
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: @themeColor;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
    }
    .title_qu {
      background-color: skyblue;
    }
    .content {
      margin: 0.3rem 1rem;
    }
    .content_qu {
      font-weight: 900;
    }
  }
}
.form {
  .textarea {
    height: 5rem !important;
  }
  .uploaderImg {
    height: 10rem !important;
  }
  .radio_wap {
    height: 4rem;
    .radio {
      margin: 0.4rem;
      span {
        color: red;
      }
    }
  }
  .checkboxGroup {
    height: 5rem;
    .checkbox {
      margin: 0.5rem 0.5rem;
    }
    span {
      color: red;
    }
  }
  .bot_input {
    display: flex;
    .num {
      width: 50%;
    }
  }
  .total_price {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.78rem;
    color: #ccc;
    margin: 1rem;
  }
  .bot_tip {
    margin-bottom: 5rem;
  }
  .button {
    display: flex;
    justify-content: center;
    .van-button {
      width: @buttonWidth;
    }
  }
}
.address_require {
  .van-cell {
    width: 100%;
    height: 3rem;
    display: flex;
  }
  .item {
    display: flex;
  }
}
.sendoff_form {
  margin: 0.5rem 0;
  .uploaderImg {
    height: 10rem !important;
  }
  .price_warp {
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    font-size: 0.78rem;
    padding: 0 0.8rem;
    background-color: #fff;
    .price {
      color: red;
      font-size: 1rem;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    .van-button {
      width: @buttonWidth;
    }
  }
  .tip {
    font-size: 0.8rem;
    color: #ccc;
    padding: 0;
    margin-bottom: 5rem;
  }
}
.van-overlay {
  z-index: 100;
}
::v-deep .van-image {
  width: 4.3rem;
  height: 4.3rem;
}
::v-deep .van-field__control {
  height: 4rem !important;
}
::v-deep .van-field__control:read-only {
  height: 10rem !important;
}
</style>
