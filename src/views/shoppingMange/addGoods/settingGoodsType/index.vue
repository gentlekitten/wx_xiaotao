<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="设规格/属性" is-arrow isBackUp />
    <div class="goods_specification">
      <div class="top_input">
        <van-field class="left" v-model="form.goodsSpecification" clearable placeholder="规格名，如大份" />
        <van-field class="center" v-model.number="form.goodsPrice" clearable placeholder="加价" />
        <div class="right_btn">
          <van-button class="btn" round @click="addSpecificationBtn">添加规格</van-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in goodsSpecificationList" :key="item.id">
          <div class="text">{{ item.specificationName }}</div>
          <div class="price">售价+{{ item.price }}</div>
          <div class="close_icon" @click="deleteGoodsSpecification(item)">
            <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
          </div>
        </div>
      </div>
    </div>
    <div class="goods_attribute">
      <div class="top_input">
        <van-field class="input" v-model="form.goodsAttribute" clearable placeholder="属性类名，如颜色" />
        <div class="right_btn">
          <van-button class="btn" type="info" round @click="addAttributeBtn">添加属性类</van-button>
        </div>
      </div>
      <div class="content">
        <div class="item_warp" v-for="item in goodsAttributeList" :key="item.id">
          <div class="title">
            {{ item.propertyName }}
            <van-icon
              class="icon"
              name="cross"
              size="1.3rem"
              color="#EE3D11"
              @click="deleteAttribute(item)"
            />
          </div>
          <div class="item" v-for="child in item.productPropertyValues" :key="child.id">
            <div class="text">{{ child.propertyValue }}</div>
            <div class="close_icon" @click="deleteAttributeValue(item, child)">
              <van-icon class="icon" name="cross" size="1rem" color="#EE3D11" />
            </div>
          </div>
          <div class="add_warp">
            <van-field
              class="input"
              v-model="form.goodsAttributeValue[item.id]"
              clearable
              placeholder="属性值"
            />
            <div class="right_btn">
              <van-button class="btn" type="info" round @click="addAttributeValue(item)">添加</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-collapse v-model="upImgActice">
      <van-collapse-item title="图片上传须知" name="1">
        <div class="up_img_tip_warp">
          <div
            class="tip"
          >不同的类型有不同的图片，如黑色的衣服上传黑色衣服的图片，上传图片要一一对应相应的属性值。上传的图片只会加入到你所添加的第一个属性类中，也就是图片中的颜色属性类中。（也就是如图片中黑色图片对应的是颜色属性类中的黑色属性值）</div>
          <img class="img" src="../../../../assets/img/upImgTip/suchImg.jpg" alt />
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="up_img_warp">
      <div class="title">图片上传</div>
      <van-uploader class="uploader" v-model="imgList" :after-read="upImg" />
    </div>
    <div class="submit_btn">
      <van-button class="btn" round @click="clickSaveBtn">确定保存</van-button>
    </div>
  </div>
</template>
<script>
import { upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      upImgActice: [],
      form: {
        goodsSpecification: '',
        goodsPrice: '',
        goodsAttribute: '',
        goodsAttributeValue: []
      },
      imgList: [],
      goodsSpecificationList: [
        {
          id: 0,
          specificationName: '小份',
          price: 1
        },
        {
          id: 1,
          specificationName: '中份',
          price: 2
        },
        {
          id: 2,
          specificationName: '大份',
          price: 3
        }
      ],
      goodsAttributeList: [
        {
          id: 0,
          propertyName: '颜色',
          productPropertyValues: [
            {
              id: 101,
              propertyValue: '黑色'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 上传商品图片
    async upImg(file, index) {
      const length = this.goodsAttributeList[0].productPropertyValues.length - 1
      if (index.index > length) {
        file.status = 'failed'
        file.message = '没有与之对应的属性值了！'
        return this.$toast.fail('没有与之对应的属性值了！')
      }

      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('productImg', file.file)
      const res = await upLogo('/product/img', formData)
      console.log(res)
      if (res.code === '0') {
        console.log(this.goodsAttributeList[0].productPropertyValues[index.index])

        this.goodsAttributeList[0].productPropertyValues[index.index].picAddress =
          res.data.filename
        file.status = 'done'
        return false
      }
      return this.$toast.fail(res.msg)
    },
    // 添加规格
    addSpecificationBtn() {
      if (
        !this.form.goodsSpecification.trim() ||
        !this.form.goodsPrice.toString().trim()
      ) {
        return this.$toast.fail('请填写规格名或者加价！')
      }
      const id =
        this.goodsSpecificationList.length > 0
          ? this.goodsSpecificationList[this.goodsSpecificationList.length - 1]
              .id + 1
          : 0
      const goodsSpecification = {
        id,
        specificationName: this.form.goodsSpecification,
        price: this.form.goodsPrice
      }
      this.goodsSpecificationList.push(goodsSpecification)
      this.form.goodsSpecification = ''
      this.form.goodsPrice = ''
    },
    // 添加属性类
    addAttributeBtn() {
      if (!this.form.goodsAttribute.trim()) {
        return this.$toast.fail('请填写属性类名！')
      }
      if (this.goodsSpecificationList.length > 0) {
        if (this.goodsAttributeList.length >= 2) {
          return this.$toast.fail('最多只能填写三大类！')
        }
      } else if (this.goodsAttributeList.length >= 3) {
        return this.$toast.fail('最多只能填写三大类！')
      }
      const id =
        this.goodsAttributeList.length > 0
          ? this.goodsAttributeList[this.goodsAttributeList.length - 1].id + 1
          : 0
      const goodsAttribute = {
        id,
        propertyName: this.form.goodsAttribute,
        productPropertyValues: []
      }
      this.goodsAttributeList.push(goodsAttribute)
      this.form.goodsAttribute = ''
    },
    // 添加属性值
    addAttributeValue(item) {
      if (
        !this.form.goodsAttributeValue[item.id] ||
        !this.form.goodsAttributeValue[item.id].trim()
      ) {
        return this.$toast.fail('请填写属性值！')
      }
      const id =
        item.productPropertyValues.length > 0
          ? item.productPropertyValues[item.productPropertyValues.length - 1]
              .id + 1
          : 101
      const goodsAttributeValue = {
        id,
        propertyValue: this.form.goodsAttributeValue[item.id]
      }
      item.productPropertyValues.push(goodsAttributeValue)
      this.form.goodsAttributeValue[item.id] = ''
    },
    //   删除商品规格
    deleteGoodsSpecification(item) {
      this.goodsSpecificationList = this.goodsSpecificationList.filter(e => {
        return item.id !== e.id
      })
    },
    // 删除商品属性类
    deleteAttribute(item) {
      this.goodsAttributeList = this.goodsAttributeList.filter(e => {
        return item.id !== e.id
      })
    },
    // 删除商品属性值
    deleteAttributeValue(item, child) {
      const index = this.goodsAttributeList.findIndex(e => {
        return item.id === e.id
      })
      this.goodsAttributeList[
        index
      ].productPropertyValues = this.goodsAttributeList[
        index
      ].productPropertyValues.filter(e => {
        return child.id !== e.id
      })
    },
    clickSaveBtn() {
      const data = {
        productInfoProperties: this.goodsAttributeList,
        productInfoSpecifications: this.goodsSpecificationList
      }
      this.$store.commit('addGoods/SET_GOODS_ATTRIBUTE', data)
      sessionStorage.setItem(
        'addGoods',
        JSON.stringify(this.$store.state.addGoods)
      )
      this.$router.go(-1)
      console.log(this.$store.state.addGoods)
    }
  }
}
</script>
<style lang="less" scoped>
.goods_specification {
  box-sizing: border-box;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  .top_input {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left {
      flex: 4;
      background-color: #f7f7f7;
      height: 2rem;
      border-radius: 0.5rem;
    }
    .center {
      flex: 1;
      background-color: #f7f7f7;
      height: 2rem;
      border-radius: 0.5rem;
      margin: 0 0.5rem;
    }
    .right_btn {
      flex: 1;
      .btn {
        width: 6rem;
        height: 2rem;
        background-color: @themeColor;
        border: 1px solid @themeColor;
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
  .content {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      padding: 0.5rem;
      margin: 1rem 1rem 0 0;
      height: 1rem;
      background-color: #fff;
      font-size: 0.8rem;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      .price {
        color: @priceColor;
        margin: 0 0.66rem;
      }
      .close_icon {
        background-color: #facbc0;
        border-left: 1px solid #facbc0;
        display: flex;
        align-items: center;
      }
    }
  }
}
.goods_attribute {
  box-sizing: border-box;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  .top_input {
    display: flex;
    align-items: center;
    .input {
      width: 12rem;
      background-color: #f7f7f7;
      height: 2rem;
      border-radius: 0.5rem;
      margin-right: 0.8rem;
    }
    .right_btn {
      .btn {
        width: 7rem;
        height: 2rem;
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
  .content {
    .item_warp {
      display: flex;
      flex-wrap: wrap;
      margin: 1rem 0;
      .title {
        width: 100%;
        font-weight: 900;
        height: 1rem;
        background-color: #f7f7f7;
        padding: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0.5rem;
      }
      .item {
        display: flex;
        padding: 0.5rem;
        margin: 1rem 1rem 0 0;
        height: 1rem;
        background-color: #fff;
        font-size: 0.8rem;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        .text {
          margin-right: 0.8rem;
        }
        .close_icon {
          background-color: #facbc0;
          border-left: 1px solid #facbc0;
          display: flex;
          align-items: center;
        }
      }
      .add_warp {
        display: flex;
        margin: 1rem 1rem 0 0;
        .input {
          width: 5rem;
          background-color: #f7f7f7;
          height: 2rem;
          border-radius: 0.5rem;
          margin-right: 0.2rem;
        }
        .btn {
          width: 4rem;
          height: 2rem;
          font-size: 0.8rem;
          color: #fff;
        }
      }
    }
  }
}
.up_img_warp {
  background-color: #fff;
  padding: 1rem;
  .title {
    font-weight: 900;
    margin-bottom: 0.5rem;
    span {
      font-size: 0.8rem;
      font-weight: 400;
      color: cadetblue;
    }
  }
}
.submit_btn {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  .btn {
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
.up_img_tip_warp {
  .tip {
    line-height: 2rem;
  }
  .img {
    width: 100%;
  }
}
::v-deep .van-image {
  width: 4rem;
  height: 4rem;
}
</style>
