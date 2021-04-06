<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="营业时间" is-arrow isBackUp />
    <div class="cell_warp">
      <div class="cell">
        <div class="left">开始时间</div>
        <div class="center" @click="startTimeIsShow = true">{{ form.startTime }}</div>
        <div class="right" @click="startTimeIsShow = true">
          <van-icon name="arrow-down" size="1.2rem" />
        </div>
      </div>
      <div class="cell">
        <div class="left">结束时间</div>
        <div class="center" @click="endTimeIsShow = true">{{ form.endTime }}</div>
        <div class="right" @click="endTimeIsShow = true">
          <van-icon name="arrow-down" size="1.2rem" />
        </div>
      </div>
    </div>
    <div class="btn_warp">
      <van-button class="btn" round @click="saveTime">添加时间段</van-button>
    </div>
    <!-- 开始时间选择 -->
    <van-overlay :show="startTimeIsShow" @click="startTimeIsShow = false">
      <div class="wrapper" @click.stop>
        <van-datetime-picker
          v-show="startTimeIsShow"
          class="datetime_picker"
          v-model="form.startTime"
          type="time"
          title="选择时间"
          :min-hour="0"
          :max-hour="24"
          @confirm="startTimeConfirm"
          @cancel="startTimeIsShow = false"
        />/>
      </div>
    </van-overlay>
    <!-- 结束时间选择 -->
    <van-overlay :show="endTimeIsShow" @click="endTimeIsShow = false">
      <div class="wrapper" @click.stop>
        <van-datetime-picker
          v-show="endTimeIsShow"
          class="datetime_picker"
          v-model="form.endTime"
          type="time"
          title="选择时间"
          :min-hour="0"
          :max-hour="24"
          @confirm="endTimeConfirm"
          @cancel="endTimeIsShow = false"
        />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      startTimeIsShow: false,
      endTimeIsShow: false,
      form: {
        startTime: '12:00',
        endTime: '12:00'
      }
    }
  },
  methods: {
    startTimeConfirm(value) {
      this.startTimeIsShow = false
    },
    endTimeConfirm(value) {
      this.endTimeIsShow = false
    },
    saveTime() {
      if (this.form.startTime >= this.form.endTime) {
        return this.$toast.fail('结束时间比开始时间早或相同哦~')
      }
      this.$store.commit('addShopping/TIME', this.form)
      sessionStorage.setItem(
        'addShopping',
        JSON.stringify(this.$store.state.addShopping)
      )
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.cell_warp {
  margin-top: 1rem;
  .cell {
    width: 100%;
    height: 3rem;
    background-color: #fff;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .left {
      flex: 2;
      margin-right: 1.5rem;
    }
    .center {
      flex: 5;
    }
    .right {
      flex: 1;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .datetime_picker {
    width: 18rem;
    border-radius: 0.5rem;
  }
}
.btn_warp {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  .btn {
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>