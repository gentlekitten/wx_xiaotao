<template>
  <div>
    <div class="evaluate">
      <!-- 顶部评价分数 -->
      <evaluate class="evaluate_item" :evaluate-info-list="evaluateInfoObj" />
      <!-- 用户评价 -->
      <template v-if="commentList.length <= 0">
        <van-empty description="该用户暂无评价" />
      </template>
      <!-- 用户评论 -->
      <template>
        <user-comment
          :comment-list="commentList"
          @clickCommnetImg="imagePreview"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/api.js'
import { ImagePreview } from 'vant'

import Evaluate from '@/components/snackShop/tabs/tab1/Evaluate.vue'
import UserComment from '@/components/snackShop/tabs/tab1/UserComment.vue'

export default {
  components: {
    Evaluate,
    UserComment,
  },
  data() {
    return {
      shopId: window.sessionStorage.getItem('shopId')
        ? Number(window.sessionStorage.getItem('shopId'))
        : 0,
      // 评价信息列表
      evaluateInfoObj: [],
      // 用户评价列表
      commentList: [],
      pageIndex: 0,
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    // 获取评论信息
    async getCommentList() {
      const data = {
        shopId: this.shopId,
        pageIndex: this.pageIndex,
        pageLimit: 10,
      }
      const res = await getData('/shop/comment/find', data, {
        showLoading: false,
      })
      this.loading = false
      console.log(res)
      if (res.code === '0') {
        res.data.productComment.forEach((e) => {
          if (e.attitude || e.attitude === 0) {
            e.commentScore = (e.attitude + e.quality + e.sTime) / 6
          }
        })
        this.commentList.push(...res.data.productComment)
        if (
          Object.keys(this.evaluateInfoObj).length <= 0 &&
          Object.keys(this.commentList.shopScore).length > 0
        ) {
          this.evaluateInfoObj = this.commentList.shopScore
        }
        this.pageIndex += 1
        if (this.pageIndex * 10 >= res.data.number) {
          this.finished = true
        }
        return false
      }
      this.$handleCode.handleCode(res)
    },
    // 上拉加载评论信息
    async onLoadData() {
      if (this.commentList.length > 0) {
        this.getCommentList()
      }
    },
    //   预览图片
    imagePreview(item, index) {
      let images = []
      item.forEach((e) => {
        images.push(e.picAddress)
      })
      ImagePreview({
        images,
        startPosition: index,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.evaluate {
  box-sizing: border-box;
  font-size: 0.8rem;
}
</style>
