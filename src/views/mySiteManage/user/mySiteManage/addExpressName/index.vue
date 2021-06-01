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
        <template v-if="expressList.length > 0">
          <div class="list" v-for="item in expressList" :key="item.id">
            {{ item.name }}
            <van-button class="dele_btn" round @click="deleteExpress(item.id)">删除</van-button>
          </div>
        </template>
        <van-empty v-else description="还没有添加快递哦~" />
      </div>
    </div>
  </div>
</template>
<script>
import { upData, getData } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        expressName: '',
        siteId: JSON.parse(window.sessionStorage.getItem('mySiteInfo'))
          ? JSON.parse(window.sessionStorage.getItem('mySiteInfo')).id
          : 0
      },
      expressList: []
    }
  },
  created() {
    this.getExpressList()
  },
  methods: {
    //  获取添加的快递列表
    async getExpressList() {
      const res = await getData(
        '/site/express/info',
        { siteId: this.form.siteId },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        res.data.forEach(e => {
          this.expressList.push({ name: e.apartmentName, id: e.id })
        })
        return false
      }
      this.$handleCode.handleCode(res)
    },
    async addExpress() {
      if (!this.form.expressName) {
        return this.$toast.fail('请填写快递名字！')
      }
      const res = await upData('/site/express/add', this.form, {
        showLoading: true
      })
      console.log(res)
      if (res.code === '0') {
        this.form.expressName = ''
        this.expressList.push({
          id: res.data.id,
          name: res.data.expressName
        })
        return this.$toast.success('添加成功！')
      }
      this.$handleCode.handleCode(res)
    },
    async deleteExpress(id) {
      const res = await upData(
        '/site/express/delete',
        { id: id, siteId: this.form.siteId },
        {
          showLoading: true
        }
      )
      console.log(res)
      if (res.code === '0') {
        this.$toast.success('删除成功！')
        return this.getExpressList()
      }
      this.$handleCode.handleCode(res)
    }
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