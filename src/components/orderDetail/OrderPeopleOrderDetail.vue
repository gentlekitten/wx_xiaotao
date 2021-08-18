<template>
  <div class="info">
    <van-cell
      >任务标题：<span class="weight">{{
        shopInfoObj.deliveryOrder.title
      }}</span></van-cell
    >
    <van-cell class="cell1">
      <div class="username">
        发布人：
        <span v-if="shopInfoObj.deliveryOrder.customerInfo">{{
          shopInfoObj.deliveryOrder.customerInfo.nickname
        }}</span>
      </div>
    </van-cell>
    <template
      v-if="
        shopInfoObj.deliveryOrder.deliveryOrderAddresses &&
        shopInfoObj.deliveryOrder.deliveryOrderAddresses.length > 0
      "
    >
      <van-cell class="cell2" is-link>
        <div class="warp">
          <div class="text">起</div>
          <div class="info">
            <div class="text_info">
              <span>{{
                shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].customerName
              }}</span>
              &nbsp;/&nbsp;{{
                shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].phone
              }}
            </div>
            <div>
              {{
                shopInfoObj.deliveryOrder.deliveryOrderAddresses[0]
                  .addressDetail
              }}
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell
        @click="
          toPhone(shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].phone)
        "
      >
        起点电话：{{
          shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].phone
        }}
        <van-icon name="phone-o" size="1rem" />
      </van-cell>
      <template v-if="shopInfoObj.deliveryOrder.deliveryOrderAddresses[1]">
        <van-cell class="cell2" is-link>
          <div class="warp">
            <div class="text text_da">达</div>
            <div class="info">
              <div class="text_info">
                <span>{{
                  shopInfoObj.deliveryOrder.deliveryOrderAddresses[1]
                    .customerName
                }}</span>
                &nbsp;/&nbsp;{{
                  shopInfoObj.deliveryOrder.deliveryOrderAddresses[1].phone
                }}
              </div>
              <div>
                {{
                  shopInfoObj.deliveryOrder.deliveryOrderAddresses[1]
                    .addressDetail
                }}
              </div>
            </div>
          </div>
        </van-cell>
        <van-cell
          @click="
            toPhone(shopInfoObj.deliveryOrder.deliveryOrderAddresses[1].phone)
          "
        >
          送达电话：{{
            shopInfoObj.deliveryOrder.deliveryOrderAddresses[1].phone
          }}
          <van-icon name="phone-o" size="1rem" />
        </van-cell>
      </template>
    </template>
    <van-cell>预约时间：{{ shopInfoObj.deliveryOrder.beforeTime }}</van-cell>
    <div
      v-if="
        shopInfoObj.deliveryOrder.deliveryOrderPics &&
        shopInfoObj.deliveryOrder.deliveryOrderPics.length > 0
      "
      class="img_warp"
    >
      <div class="title">附图：</div>
      <div class="img">
        <img
          v-for="(item, index) in shopInfoObj.deliveryOrder.deliveryOrderPics"
          :key="item.id"
          :src="imgBaseUrl + item.picAddress"
          @click="
            imagePreview(shopInfoObj.deliveryOrder.deliveryOrderPics, index)
          "
        />
      </div>
    </div>
    <van-cell>接单时效：{{ shopInfoObj.deliveryOrder.endTime }}</van-cell>
    <van-cell
      >性别要求：{{
        shopInfoObj.deliveryOrder.sex === 0
          ? '性别不限'
          : shopInfoObj.deliveryOrder.sex === 1
          ? '只限男性'
          : '只限女性'
      }}</van-cell
    >
    <van-cell>
      <div class="price">
        任务收益：
        <span>￥{{ shopInfoObj.deliveryOrder.price }}</span>
      </div>
    </van-cell>
    <van-cell>
      <div class="price">
        应付金额：
        <span>￥{{ shopInfoObj.paymentMoney }}</span>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    shopInfoObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    toPhone(shopPhone) {
      this.$emit('toPhone', shopPhone)
    },
    imagePreview(imgList, index) {
      this.$emit('imagePreview', imgList, index)
    },
  },
}
</script>
<style lang="less" scoped>
</style>