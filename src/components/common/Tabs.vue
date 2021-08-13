<template>
  <div>
    <van-tabs
      v-model="tabActive"
      animated
      :offset-top="offsetTop"
      :sticky="sticky"
      swipeable
      color
      title-active-color="#f2af49"
      ellipsis
      @click="clickTab"
      @change="changeTab"
    >
      <van-tab v-for="(item, index) in tabList" :key="index">
        <template #title>{{ item.title }}</template>
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      },
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    // 距离顶部距离
    offsetTop: {
      type: String,
      default: '0',
    },
    // tabs索引缓存名
    tabsIndexName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tabActive: Number(window.sessionStorage.getItem(this.tabsIndexName))
        ? Number(window.sessionStorage.getItem(this.tabsIndexName))
        : 0,
    }
  },
  methods: {
    clickTab(name) {
      this.$emit('clickTab', name)
      window.sessionStorage.setItem(this.tabsIndexName, this.tabActive)
    },
    changeTab(name) {
      this.$emit('changeTab', name)
      window.sessionStorage.setItem(this.tabsIndexName, this.tabActive)
    },
  },
}
</script>
<style scoped>
</style>
