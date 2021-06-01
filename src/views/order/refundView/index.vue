<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="申请退款" is-arrow isBackUp />
    <div class="home">
      <div class="top_shop">
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <div class="info">
          <div class="name">哈哈</div>
          <div class="type">颜色:黑色;尺码:40</div>
        </div>
      </div>
      <div class="content">
        <van-cell
          class="value"
          title="退款原因"
          :value="this.form.reason"
          is-link
          @click="popupIsShow = true"
        />
        <div class="price">
          退款金额：
          <span>￥63.10</span>
        </div>
        <van-field
          class="lable"
          v-model="form.refundLable"
          clearable
          label="退款说明："
          placeholder="选填"
        />
      </div>
      <van-field class="uploaderImg" label="附图(最多5张)：">
        <template #input>
          <van-uploader
            v-model="form.uploaderImg"
            :max-size="5120 * 1024"
            @oversize="handleImgLarge"
            :max-count="5"
            :after-read="uploading"
          />
        </template>
      </van-field>
    </div>
    <div class="btn_warp">
      <van-button class="btn" round native-type="formSubmit">提交</van-button>
    </div>
    <van-popup
      class="popup"
      v-model="popupIsShow"
      round
      position="bottom"
      closeable
      @close="popupClose"
    >
      <van-radio-group class="radio" v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in radioList"
            clickable
            :key="index +item.name"
            :title="item.title"
            @click="clickRadio(item.name)"
          >
            <template #right-icon>
              <van-radio :name="item.name" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
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
      popupIsShow: false,
      form: {
        refundLable: '',
        reason: '请选择',
        uploaderImg: []
      },
      radioList: [
        {
          name: 0,
          title: '尺码拍错/不喜欢/效果差'
        },
        {
          name: 1,
          title: '质量问题'
        },
        {
          name: 2,
          title: '材质/面料与商品描述不符'
        },
        {
          name: 3,
          title: '大小尺寸与商品描述不符'
        },
        {
          name: 4,
          title: '颜色/款式/图案与描述不符'
        },
        {
          name: 5,
          title: '卖家发错货'
        },
        {
          name: 6,
          title: '不想要了'
        },
        {
          name: 7,
          title: '其它'
        }
      ],
      radio: null
    }
  },
  methods: {
    // 处理上传图片过大
    handleImgLarge() {
      this.$toast.fail('上传的图片不能超过5M')
    },
    // 处理上传图片
    uploading(file) {
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'done'
      }, 1000)
    },
    clickRadio(name) {
      this.radio = name
    },
    popupClose() {
      if (this.radio !== null) {
        this.form.reason = this.radioList[this.radio].title
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 0.8rem;
  box-sizing: border-box;
  .top_shop {
    padding: 0.8rem;
    display: flex;
    background-color: #fff;
    border-radius: 0.5rem;
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
  .content {
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    .price {
      padding: 0.8rem 1rem;
      background-color: #fff;
      font-size: 0.8rem;
      border-bottom: 1px solid #f7f7f7;
      span {
        color: @priceColor;
        font-size: 1rem;
      }
    }
    .value {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
    .lable {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
  .uploaderImg {
    margin-top: 0.5rem;
    height: 10rem !important;
    border-radius: 0.5rem;
  }
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
.popup {
  height: 25rem;
  .radio {
    margin-top: 2.5rem;
  }
}
.van-cell__title {
  font-weight: 900;
  font-size: 0.8rem;
}
.van-cell__title {
  font-size: 0.8rem;
}
</style>
