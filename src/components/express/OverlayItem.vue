<template>
  <div class="tab0_radio_wrapper">
    <div class="radio">
      <van-radio-group v-model="radioActive">
        <div v-for="item in radioList" :key="item.id">
          <van-radio
            v-if="item.expressName"
            :name="item.id"
            @click="radioChange(item.id)"
          >{{ item.expressName }}</van-radio>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    radioList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      //radio索引
      radioActive: this.radioList[0].id
    }
  },
  methods: {
    radioChange(id) {
      this.$emit('radioChange', id)
    }
  }
}
</script>
<style lang="less" scoped>
.tab0_radio_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .radio {
    padding: 1rem;
    width: 16rem;
    background-color: #fff;
    .van-radio {
      margin: 2rem 0;
    }
  }
}
</style>
