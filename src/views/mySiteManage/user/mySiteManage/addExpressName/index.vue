<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="添加快递名称" is-arrow isBackUp />
    <div class="tip">
      本设置是用来添加
      <span>快递服务</span>&nbsp;快递选项里面的快递
      <br />（本站点有哪些快递）
    </div>
    <van-field v-model="form.expressName" center clearable label="快递名称" placeholder="请输入站点的快递">
      <template #button>
        <van-button class="add_btn" size="small" type="primary" round @click="addExpress">添加</van-button>
      </template>
    </van-field>
    <div class="express_list_warp">
      <div class="express">
        <div class="title">当前你所添加的快递</div>
        <div class="list" v-for="item in expressList" :key="item.id">
          {{ item.name }}
          <van-button class="dele_btn" round @click="deleteExpress(item.id)">删除</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { upData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        expressName: '',
        siteId: 20
      },
      expressList: [
        { id: 0, name: '妈妈驿站' },
        { id: 1, name: '菜鸟驿站' },
        { id: 2, name: '邮政' }
      ]
    }
  },
  methods: {
    async addExpress() {
      if (!this.form.expressName) {
        return this.$toast.fail('请填写快递名字！')
      }
      const res = await upData('/site/express/add', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        return this.$toast.success('添加成功！')
      }
      return this.$toast.fail(res.msg)
    },
    deleteExpress(id) {}
  }
}
</script>
<style lang="less" scoped>
.tip {
  text-align: center;
  margin: 1rem 0;
  line-height: 1.5rem;
  color: #999;
  font-size: 0.8rem;
  span {
    color: cadetblue;
  }
}
.add_btn {
  height: 1.8rem;
  width: 3.5rem;
  font-size: 0.8rem;
  color: #997a00;
  background-color: #ffe788;
  border: 1px solid #ffe788;
}
.express_list_warp {
  margin-top: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  .express {
    .title {
      font-weight: 900;
      text-align: center;
    }
    .list {
      color: #999;
      height: 2.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.5rem;
      .dele_btn {
        height: 1.8rem;
        font-size: 0.8rem;
      }
    }
    .list:nth-child(odd) {
      background-color: #fdf5e6;
    }
  }
}
</style>