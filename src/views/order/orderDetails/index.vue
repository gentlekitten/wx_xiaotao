<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="订单详情" is-arrow isBackUp />
    <div class="home">
      <!-- 配送进程 -->
      <div class="order_type">
        <div class="title">配送进程</div>
        <van-steps class="steps" :active="shopInfoObj.orderState">
          <van-step>未支付</van-step>
          <van-step>提交订单</van-step>
          <van-step>已受理</van-step>
          <van-step>配送中</van-step>
          <van-step>完成！</van-step>
        </van-steps>
      </div>
      <!-- 商家类型 -->
      <template v-if="[1, 2, 3, 4, 5].indexOf(shopInfoObj.orderType) > -1">
        <!-- 地址 -->
        <div class="address">
          <div class="send_type">
            {{
              shopInfoObj.shopOrderDetailType.deliverySn === 0
                ? '商家配送'
                : '快递配送'
            }}
          </div>
          <div class="select_address">
            <div class="address_text">
              <div class="user_info">
                <span>{{
                  shopInfoObj.shopOrderDetailType.customerRealname
                }}</span>
                {{ shopInfoObj.shopOrderDetailType.customerPhone }}
              </div>
              <div class="text">
                {{ shopInfoObj.shopOrderDetailType.addressDetail }}
              </div>
            </div>
          </div>
        </div>
        <div class="shop_info_warp">
          <div class="type">
            {{
              shopInfoObj.shopOrderDetailType.deliverySn === 0
                ? '商家配送'
                : '快递配送'
            }}
          </div>
          <div class="shop_info">
            <div
              v-for="(item, index) in shopInfoObj.shopOrderDetailType
                .shopOrderProductVo"
              :key="item.productLogoAddress + index"
              class="warp"
            >
              <img :src="imgBaseUrl + item.productLogoAddress" />
              <div class="shop_details">
                <div class="title">{{ item.productName }}</div>
                <div class="specification">({{ item.shopType }})</div>
                <div class="num_price">
                  <div class="num">×{{ item.productCnt }}</div>
                  <div class="price">￥{{ item.sellPrice }}</div>
                </div>
                <div class="price_item">
                  <div class="text">
                    {{
                      shopInfoObj.shopOrderDetailType.deliverySn === 0
                        ? '配送费'
                        : '邮费'
                    }}
                  </div>
                  <div class="price">
                    ￥{{
                      shopInfoObj.shopOrderDetailType.deliveryFee
                        ? item.postFee
                        : 0
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="price_item">
              <div class="text">小计</div>
              <div class="price">
                ￥{{ shopInfoObj.shopOrderDetailType.orderMoney }}
              </div>
            </div>
            <div class="total_price">
              应付总计：
              <span>￥{{ shopInfoObj.paymentMoney }}</span>
            </div>
            <div
              class="shop_user"
              @click="toPhone(shopInfoObj.shopOrderDetailType.shopPhone)"
            >
              <van-icon name="service-o" size="1.3rem" />
              <span>联系商家</span>
            </div>
          </div>
        </div>
      </template>
      <!-- 二手 -->
      <template v-else-if="shopInfoObj.orderType === 8">
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
                    ￥{{
                      shopInfoObj.secondhandProductOrderDetailType.sellPrice
                    }}
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
      </template>
      <!-- 代取快递 -->
      <template v-else-if="shopInfoObj.orderType === 6">
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
      <template v-else-if="shopInfoObj.orderType === 7">
        <div class="info">
          <van-cell>类型：寄送快递</van-cell>
          <van-cell class="cell2" is-link>
            <div class="warp">
              <div class="text">起</div>
              <div class="info">
                <div class="text_info">
                  <span>{{
                    shopInfoObj.sendExpressOrderType.customerName
                  }}</span>
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
      <!-- 领跑者 -->
      <template v-else-if="shopInfoObj.orderType === 9">
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
                      shopInfoObj.deliveryOrder.deliveryOrderAddresses[0]
                        .customerName
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
                toPhone(
                  shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].phone
                )
              "
            >
              起点电话：{{
                shopInfoObj.deliveryOrder.deliveryOrderAddresses[0].phone
              }}
              <van-icon name="phone-o" size="1rem" />
            </van-cell>
            <template
              v-if="shopInfoObj.deliveryOrder.deliveryOrderAddresses[1]"
            >
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
                        shopInfoObj.deliveryOrder.deliveryOrderAddresses[1]
                          .phone
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
                  toPhone(
                    shopInfoObj.deliveryOrder.deliveryOrderAddresses[1].phone
                  )
                "
              >
                送达电话：{{
                  shopInfoObj.deliveryOrder.deliveryOrderAddresses[1].phone
                }}
                <van-icon name="phone-o" size="1rem" />
              </van-cell>
            </template>
          </template>
          <van-cell
            >预约时间：{{ shopInfoObj.deliveryOrder.beforeTime }}</van-cell
          >
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
                v-for="(item, index) in shopInfoObj.deliveryOrder
                  .deliveryOrderPics"
                :key="item.id"
                :src="imgBaseUrl + item.picAddress"
                @click="
                  imagePreview(
                    shopInfoObj.deliveryOrder.deliveryOrderPics,
                    index
                  )
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
      <!-- 订单信息 -->
      <div class="order_info_warp">
        <div class="order_info">
          <div class="title">订单信息</div>
          <div class="info">
            <span>备注</span>
            {{ shopInfoObj.otherMsg ? shopInfoObj.otherMsg : '无' }}
          </div>
          <div class="info">
            <span>支付方式</span>
            微信
          </div>
          <div class="info">
            <span>下单时间</span>
            {{ shopInfoObj.createTime }}
          </div>
          <div v-if="shopInfoObj.payState === 1" class="info">
            <span>支付时间</span>
            {{ shopInfoObj.payTime }}
          </div>
          <div class="info">
            <span>订单编号</span>
            {{ shopInfoObj.cOrderSn }}
          </div>
        </div>
      </div>
      <div v-if="shopInfoObj.payState === 2" class="btn_warp">
        <van-button class="btn" round @click="toPayment(shopInfoObj.cOrderSn)"
          >去支付</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getData, upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

import AddressSelectCell from '@/components/express/AddressSelectCell.vue'

import { ImagePreview } from 'vant'

import onBridgeReady from '@/components/mixins/onBridgeReady.js'

export default {
  components: {
    NavBar,
    AddressSelectCell,
  },
  mixins: [onBridgeReady],
  data() {
    return {
      shopInfoObj: {},
      cOrderSn: '',
    }
  },
  created() {
    this.cOrderSn = this.$route.query.cOrderSn
    this.getShopOrderInfo()
  },
  methods: {
    // 获取商家订单信息
    async getShopOrderInfo() {
      const res = await getData(
        '/order/info/detail/find',
        { cOrderSn: this.cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.shopInfoObj = res.data
        if ([1, 2, 3, 4, 5].indexOf(this.shopInfoObj.orderType) > -1) {
          // 拼接商品选择的规格和属性
          this.shopInfoObj.shopOrderDetailType.shopOrderProductVo.forEach(
            (e) => {
              e.shopType = ''
              if (Object.keys(e.orderProductSpecification).length > 0) {
                e.shopType +=
                  e.orderProductSpecification.specificationName + ';'
              }
              if (e.orderProductProertyValues.length > 0) {
                orderProductProertyValues.forEach((c) => {
                  e.shopType += c.propertyValue + ';'
                })
              }
            }
          )
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 支付订单
    async toPayment(cOrderSn) {
      const res = await upData(
        '/order/info/unify/pay',
        { cOrderSn },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        this.onBridgeReady(res.data)
        return false
      }
      this.$handleCode.handleCode(res)
    },
    toPhone(shopPhone) {
      window.location.href = 'tel:' + shopPhone
    },
    // 预览图片
    imagePreview(item, index) {
      const imgUrlList = []
      item.forEach((e) => {
        imgUrlList.push(this.imgBaseUrl + e.picAddress)
      })
      ImagePreview({
        images: imgUrlList,
        startPosition: index,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  padding: 1rem;
  margin-bottom: 8rem;
  .order_type {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      font-weight: 900;
      margin-bottom: 1rem;
    }
    .steps {
    }
  }
  .address {
    box-sizing: border-box;
    width: 100%;
    height: 8rem;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    .send_type {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
    }
    .select_address {
      color: #ccc;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }
    .address_text {
      margin-top: -1.2rem;
      font-size: 0.9rem;
      height: 3rem;
      .user_info {
        span {
          color: #000;
        }
      }
      .text {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .shop_info_warp {
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin: 1rem 0;
    .type {
      font-weight: 900;
    }
    .shop_info {
      font-size: 0.8rem;
      margin-top: 1rem;
      .warp {
        display: flex;
        .price_item {
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;
          .price {
            font-weight: 900;
          }
          .price_text {
            font-weight: 400;
          }
          span {
            color: #ccc;
            font-size: 0.75rem;
          }
        }
        img {
          width: 18%;
          height: 3.5rem;
        }
        .shop_details {
          width: 80%;
          margin-left: 1rem;
          .specification {
            color: #ccc;
            margin: 0.5rem 0;
          }
          .num_price {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .num {
              color: #ccc;
            }
            .price {
              font-size: 1rem;
            }
          }
        }
      }
      .price_item {
        display: flex;
        justify-content: space-between;
        margin: 0.5rem 0;
        .price {
          font-weight: 900;
        }
        .price_text {
          font-weight: 400;
        }
        span {
          color: #ccc;
          font-size: 0.75rem;
        }
      }
      .total_price {
        text-align: right;
        margin-bottom: 1rem;
        span {
          color: @priceColor;
          font-size: 1rem;
          font-weight: 900;
        }
      }
      .shop_user {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        span {
          font-size: 1rem;
          margin-left: 0.5rem;
        }
      }
    }
  }
  .order_info_warp {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-sizing: border-box;
    line-height: 2rem;
    .order_info {
      .title {
        font-size: 1rem;
        font-weight: 900;
        border-bottom: 1px solid #eee;
        height: 3rem;
        margin-bottom: 1rem;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        span {
          color: #999;
        }
      }
    }
  }
  .btn_warp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    .btn {
      width: @buttonWidth;
      //   color: #ff6f4e;
      //   border: 1px solid #ff6f4e;
      color: #fff;
      background-color: #ff6f4e;
    }
  }
}
// 快递
.top {
  .title {
    font-weight: 900;
  }
}
.img_warp {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  .title {
    width: 21%;
    font-size: 0.8rem;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .img {
    width: 79%;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
}
.info {
  border-radius: 0.5rem;
  .weight {
    font-weight: 900;
  }
  .cell1 {
    height: 5rem;
    position: relative;
    font-size: 0.8rem;
    .username {
      span {
        font-weight: 900;
        font-size: 1rem;
      }
    }
    .task_no {
      margin-top: 0.5rem;
    }
  }
  .cell2 {
    height: 5rem;
    width: 100%;
    .warp {
      display: flex;
      align-items: center;
      .text {
        flex: 1;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: @themeColor;
        color: #fff;
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      .text_da {
        background-color: cadetblue;
      }
      .info {
        margin-left: 1rem;
        flex: 8;
        .text_info {
          font-size: 0.8rem;
          span {
            font-weight: 900;
          }
        }
      }
    }
  }
}
.price {
  span {
    color: red;
    font-size: 1rem;
    font-weight: 900;
  }
}
// 快递结束
::v-deep .van-step__title {
  font-size: 0.75rem;
}
::v-deep .van-step__circle {
  width: 0.8rem;
  height: 0.8rem;
}
::v-deep .van-icon {
  font-size: 1rem;
}
</style>
