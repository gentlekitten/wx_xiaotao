<template>
  <div>
    <!-- 代取快递 -->
    <template v-if="shopInfoObj.orderType === 6">
      <div class="info">
        <van-cell>类型：代取快递</van-cell>
        <van-cell class="cell2" is-link>
          <div class="warp">
            <div class="text">达</div>
            <div class="info">
              <div class="text_info">
                <span>{{
                  shopInfoObj.receiveExpressOrderType.customerName
                }}</span>
                &nbsp;/&nbsp;{{
                  shopInfoObj.receiveExpressOrderType.customerPhone
                }}
              </div>
              <div>
                {{ shopInfoObj.receiveExpressOrderType.customerAddress }}
              </div>
            </div>
          </div>
        </van-cell>
        <van-cell
          @click="toPhone(shopInfoObj.receiveExpressOrderType.customerPhone)"
        >
          送达电话：{{ shopInfoObj.receiveExpressOrderType.customerPhone }}
          <van-icon name="phone-o" size="1rem" />
        </van-cell>
        <van-cell
          >快递名称：{{
            shopInfoObj.receiveExpressOrderType.expressName
          }}</van-cell
        >
        <van-cell
          >已选规格：{{
            shopInfoObj.receiveExpressOrderType.specificationName
              ? shopInfoObj.receiveExpressOrderType.specificationName
              : '无'
          }}</van-cell
        >
        <van-cell
          >已选服务：{{
            shopInfoObj.receiveExpressOrderType.serviceName
              ? shopInfoObj.receiveExpressOrderType.serviceName
              : '无'
          }}</van-cell
        >
        <van-cell
          >是否取消：{{
            shopInfoObj.receiveExpressOrderType.canCancel === 0
              ? '不可取消'
              : '可以取消'
          }}</van-cell
        >
        <van-cell>
          <div class="price">
            小费：
            <span
              >￥{{ shopInfoObj.receiveExpressOrderType.expressMoney }}</span
            >
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
    <!-- 寄送快递 -->
    <template v-if="shopInfoObj.orderType === 7">
      <div class="info">
        <van-cell>类型：寄送快递</van-cell>
        <van-cell class="cell2" is-link>
          <div class="warp">
            <div class="text">起</div>
            <div class="info">
              <div class="text_info">
                <span>{{ shopInfoObj.sendExpressOrderType.customerName }}</span>
                &nbsp;/&nbsp;{{
                  shopInfoObj.sendExpressOrderType.customerPhone
                }}
              </div>
              <div>
                {{ shopInfoObj.sendExpressOrderType.customerAddress }}
              </div>
            </div>
          </div>
        </van-cell>
        <van-cell
          @click="toPhone(shopInfoObj.sendExpressOrderType.customerPhone)"
        >
          起点电话：{{ shopInfoObj.sendExpressOrderType.customerPhone }}
          <van-icon name="phone-o" size="1rem" />
        </van-cell>
        <van-cell class="cell2" is-link>
          <div class="warp">
            <div class="text text_da">达</div>
            <div class="info">
              <div class="text_info">
                <span>{{ shopInfoObj.sendExpressOrderType.toName }}</span>
                &nbsp;/&nbsp;{{ shopInfoObj.sendExpressOrderType.toPhone }}
              </div>
              <div>
                {{ shopInfoObj.sendExpressOrderType.toAddress }}
              </div>
            </div>
          </div>
        </van-cell>
        <van-cell @click="toPhone(shopInfoObj.sendExpressOrderType.toPhone)">
          送达电话：{{ shopInfoObj.sendExpressOrderType.toPhone }}
          <van-icon name="phone-o" size="1rem" />
        </van-cell>
        <van-cell
          >是否取消：{{
            shopInfoObj.sendExpressOrderType.canCancel === 0
              ? '不可取消'
              : '可以取消'
          }}</van-cell
        >
        <van-cell>
          <div class="price">
            费用：
            <span>￥{{ shopInfoObj.sendExpressOrderType.expressMoney }}</span>
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
  },
}
</script>
<style lang="less" scoped>
</style>