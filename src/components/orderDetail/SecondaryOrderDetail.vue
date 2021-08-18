<template>
  <div>
    <!-- 地址 -->
    <div class="address">
      <div class="send_type">快递配送</div>
      <div class="select_address">
        <div class="address_text">
          <div class="user_info">
            <span>{{
              shopInfoObj.secondhandProductOrderDetailType.customerRealname
            }}</span>
            {{ shopInfoObj.secondhandProductOrderDetailType.customerPhone }}
          </div>
          <div class="text">
            {{ shopInfoObj.secondhandProductOrderDetailType.addressDetail }}
          </div>
        </div>
      </div>
    </div>
    <div class="shop_info_warp">
      <div class="type">快递配送</div>
      <div class="shop_info">
        <div class="warp">
          <img
            :src="
              imgBaseUrl +
              shopInfoObj.secondhandProductOrderDetailType.logoAddress
            "
          />
          <div class="shop_details">
            <div class="title">
              {{ shopInfoObj.secondhandProductOrderDetailType.productName }}
            </div>
            <div class="num_price">
              <div class="num">×1</div>
              <div class="price">
                ￥{{ shopInfoObj.secondhandProductOrderDetailType.sellPrice }}
              </div>
            </div>
          </div>
        </div>
        <div class="price_item">
          <div class="text">邮费</div>
          <div class="price">
            ￥{{
              shopInfoObj.secondhandProductOrderDetailType.postage
                ? shopInfoObj.secondhandProductOrderDetailType.postage
                : 0
            }}
          </div>
        </div>
        <div class="price_item">
          <div class="text">小计</div>
          <div class="price">
            ￥{{ shopInfoObj.secondhandProductOrderDetailType.sellPrice }}
          </div>
        </div>
        <div class="total_price">
          应付总计：
          <span>￥{{ shopInfoObj.paymentMoney }}</span>
        </div>
      </div>
    </div>
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
  methods: {},
}
</script>
<style lang="less" scoped>
</style>