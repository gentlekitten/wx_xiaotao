<template>
  <div>
    <div class="cell" v-for="(item, index) in addressSelectList" :key="item.title + index">
      <van-cell is-link>
        <template #title>
          <div class="cell_item" @click="selectAddress">
            <div class="title" :class="{ 'title_qu':item.type === '起' }">{{ item.type }}</div>
            <div class="content">{{ item.title }}</div>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    addressSelectList: {
      type: Array,
      default: () => {
        return []
      }
    },
    id: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 选择收货地址
    selectAddress() {
      this.$router.push('/user/userInfo/addressList')
    }
  }
}
</script>
<style lang="less" scoped>
.cell {
  margin: 0.5rem 0;
  height: 4rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  .cell_item {
    display: flex;
    .title {
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: @themeColor;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
    }
    .title_qu {
      background-color: skyblue;
    }
    .content {
      margin: 0.3rem 1rem;
    }
    .content_qu {
      font-weight: 900;
    }
  }
}
</style>
