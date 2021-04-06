<template>
  <div>
    <van-sidebar class="sidebar" v-model="sidebarActiveKey" @change="sidebarChange">
      <van-sidebar-item
        :class="[sidebarActiveKey === index ? 'sidebar_active_text' : '']"
        v-for="(item, index) in sidebarList"
        :key="index"
        :title="item.title"
        @click="sidebarClick"
      />
    </van-sidebar>
  </div>
</template>
<script>
export default {
  props: {
    sidebarList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 侧边导航index
      sidebarActiveKey: 0
    }
  },
  methods: {
    sidebarClick(index) {
      // console.log(index)
    },
    sidebarChange(index) {
      this.$emit('sidebarChange', index)
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar_active_text {
  color: #f2af49;
}
.van-sidebar {
  width: 100%;
  // float: left;
  // position: fixed;
  // width: 22%;
  // top: 0;
  // left: 0;
  // overflow: scroll;
  // z-index: 999;
}
</style>
