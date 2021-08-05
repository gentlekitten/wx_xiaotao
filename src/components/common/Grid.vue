<template>
  <van-grid
    :square="square"
    :center="center"
    :gutter="gutter"
    :border="isBorder"
    :column-num="columnNum"
    class="grid"
  >
    <van-grid-item
      v-for="item in girdList"
      :key="item.id"
      :to="item.url"
      @click="clickSnackDormitory(item)"
    >
      <van-image
        :class="{ manage_img: isManage }"
        fit="contain"
        :src="item.img"
      />
      <span class="gird_text">{{ item.text }}</span>
    </van-grid-item>
  </van-grid>
</template>
<script>
export default {
  props: {
    isBorder: {
      type: Boolean,
      default: false,
    },
    columnNum: {
      type: Number,
      default: 0,
    },
    girdList: {
      type: Array,
      default: () => {
        return []
      },
    },
    gutter: {
      type: Number,
      default: 0,
    },
    center: {
      type: Boolean,
      default: true,
    },
    square: {
      type: Boolean,
      default: false,
    },
    isManage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickSnackDormitory(item) {
      this.$emit('clickSnackDormitory', item)
    },
  },
}
</script>
<style lang="less" scoped>
.grid {
  background-color: #fff;
  .manage_img {
    width: 2.5rem;
  }
  .gird_text {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
}
</style>
