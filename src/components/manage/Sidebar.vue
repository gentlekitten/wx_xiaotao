<template>
  <div>
    <van-sidebar class="sidebar" v-model="sidebarActiveKey" @change="sidebarChange">
      <van-sidebar-item
        :class="[sidebarActiveKey === index ? 'sidebar_active_text' : '']"
        v-for="(item, index) in sidebarList"
        :key="item.id"
        @click="sidebarClick"
      >
        <template #title>
          <div class="title">
            {{ item.categoryName }}
            <van-icon
              v-show="isEdit && item.id !== -19"
              class="icon"
              name="edit"
              size="1.2rem"
              @click.stop="editGoodsName(item)"
            />
          </div>
        </template>
      </van-sidebar-item>
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
    },
    isEdit: {
      type: Boolean,
      default: true
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
    },
    editGoodsName(item) {
      this.$emit('editGoodsName', item)
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar_active_text {
  color: #f2af49;
}
.van-sidebar {
  // float: left;
  // position: fixed;
  width: 22%;
  // top: 0;
  // left: 0;
  // overflow: scroll;
  // z-index: 999;
  .title {
    position: relative;
    .icon {
      position: absolute;
      top: -0.2rem;
      right: -2rem;
    }
  }
}
</style>
