<template>
  <div>
    <van-tabs
      v-model="tabActive"
      animated
      :sticky="sticky"
      swipeable
      color
      title-active-color="#f2af49"
      @click="clickTab"
      @change="changeTab"
    >
      <van-tab v-for="(item, index) in tabList" :key="index">
        <template #title>{{ item.title }}</template>
        <!-- <slot></slot> -->
        <!-- <slot :name="'tab'+tabActive"></slot> -->
        <template #default>
          <slot :name="'tab' + tabActive"></slot>
        </template>
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
    clickTab() {
      this.$emit('clickTab', this.tabActive)
      window.sessionStorage.setItem(this.tabsIndexName, this.tabActive)
    },
    changeTab() {
      this.$emit('changeTab', this.tabActive)
      window.sessionStorage.setItem(this.tabsIndexName, this.tabActive)
    },
  },
}
</script>
<style scoped>
.text {
  position: fixed;
}
::v-deep .van-sticky--fixed {
  top: 2.55rem;
}
</style>
