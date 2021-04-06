<template>
  <van-dropdown-menu active-color="#f2af49">
    <van-dropdown-item
      v-model="dropdownKey"
      get-container="body"
      :options="dropdownList"
      @change="dropdownChange"
    />
  </van-dropdown-menu>
</template>
<script>
export default {
  props: {
    dropdownList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 下拉框index
      dropdownKey: 0
    }
  },
  methods: {
    dropdownChange(index) {
      this.$emit('dropdownChange', index)
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .van-dropdown-item {
  top: 0 !important;
}
::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
}
</style>
