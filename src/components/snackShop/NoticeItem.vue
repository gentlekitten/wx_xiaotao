<template>
  <div class="notice_wrapper">
    <template v-if="shopInfoObj.shopState === 1">
      <div class="title">☆☆&nbsp;促销公告&nbsp;☆☆</div>
      <div class="value">{{ shopInfoObj.salesPromotion }}</div>
    </template>
    <template v-else>
      <div class="title">☆☆&nbsp;店铺提示&nbsp;☆☆</div>
      <div class="value">当前店铺没在营业哦~</div>
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
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.notice_wrapper {
  color: #fff;
  text-align: center;
  margin-top: 3rem;
  line-height: 3rem;
  padding: 1rem;
  .title {
    font-weight: 900;
  }
  .value {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
}
</style>