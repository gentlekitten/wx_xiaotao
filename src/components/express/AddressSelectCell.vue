<template>
  <div>
    <div
      class="cell"
      v-for="(item, index) in addressSelectList"
      :key="item.title + index"
    >
      <van-cell v-if="item.name" is-link>
        <template #title>
          <div class="cell_item" @click="selectAddress(item.name)">
            <div class="title" :class="{ title_qu: item.type === '起' }">
              {{ item.type }}
            </div>
            <template v-if="item.name === 'startAddressObj'">
              <div
                v-if="
                  startAddressObj && Object.keys(startAddressObj).length > 0
                "
                class="address_text"
              >
                <div class="user_info">
                  <span>{{ startAddressObj.name }}</span>
                  {{ startAddressObj.phone }}
                </div>
                <div class="text">{{ startAddressObj.address }}</div>
              </div>
              <div v-else class="content">{{ item.title }}</div>
            </template>
            <template v-else-if="item.name === 'endAddressObj'">
              <div
                v-if="endAddressObj && Object.keys(endAddressObj).length > 0"
                class="address_text"
              >
                <div class="user_info">
                  <span>{{ endAddressObj.name }}</span>
                  {{ endAddressObj.phone }}
                </div>
                <div class="text">{{ endAddressObj.address }}</div>
              </div>
              <div v-else class="content">{{ item.title }}</div>
            </template>
          </div>
        </template>
      </van-cell>
      <van-cell v-else is-link>
        <template #title>
          <div class="cell_item" @click="selectAddress('')">
            <div class="title" :class="{ title_qu: item.type === '起' }">
              {{ item.type }}
            </div>
            <div
              v-if="Object.keys(addressObj.name).length > 0"
              class="address_text"
            >
              <div class="user_info">
                <span>{{ addressObj.name.name }}</span>
                {{ addressObj.name.phone }}
              </div>
              <div class="text">{{ addressObj.name.address }}</div>
            </div>
            <div v-else class="content">{{ item.title }}</div>
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
      },
    },
    addressObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    startAddressObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    endAddressObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    id: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    // 选择收货地址
    selectAddress(name) {
      this.$router.push('/user/userInfo/addressList?name=' + name)
    },
  },
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
    align-items: center;
    .title {
      flex: 1;
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
      flex: 8;
      margin: 0.3rem 1rem;
    }
    .content_qu {
      font-weight: 900;
    }
    .address_text {
      flex: 8;
      margin-left: 0.5rem;
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
}
</style>
