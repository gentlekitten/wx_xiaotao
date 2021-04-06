<template>
  <div>
    <div class="evaluate">
      <!-- 顶部评价分数 -->
      <evaluate class="evaluate_item" :evaluate-info-list="evaluateInfoList" />
      <!-- 用户评价 -->
      <template v-if="false">
        <van-empty description="该用户暂无评价" />
      </template>
      <!-- 用户评论 -->
      <template>
        <user-comment :comment-list="commentList" @clickCommnetImg="imagePreview" />
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
    UserComment
  },
  data() {
    return {
      // 评价信息列表
      evaluateInfoList: [
        {
          num: 0,
          text: '服务态度'
        },
        {
          num: 0,
          text: '产品品质'
        },
        {
          num: 0,
          text: '送达速度'
        }
      ],
      // 用户评价列表
      commentList: [
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 3,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg'
          ],
          comment_video: ['https://img.yzcdn.cn/vant/apple-1.jpg']
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 4,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: ['https://img.yzcdn.cn/vant/apple-1.jpg'],
          comment_video: []
        },
        {
          user_img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          user_name: '哈哈哈',
          commentNum: 1,
          comment_time: '两天前',
          shop_type: '辣条',
          comment_text:
            '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          comment_img: [],
          comment_video: []
        }
      ]
    }
  },
  created() {
    // this.getCommontList()
    this.getEvaluateInfoList()
  },
  methods: {
    async getCommontList() {
      const data = {
        shopId: 23,
        pageIndex: 0,
        pageLimit: 10
      }
      const res = await getData('/shop/comment/find', data, {
        showLoading: true
      })
      console.log(res)
    },
    async getEvaluateInfoList() {
      const data = {
        shopId: 23
      }
      const res = await getData('/shop/score/find', data, {
        showLoading: false
      })
      console.log(res)
    },
    //   预览图片
    imagePreview(item, index) {
      ImagePreview({
        images: item,
        startPosition: index
      })
    }
  }
}
</script>
<style lang="less" scoped>
.evaluate {
  box-sizing: border-box;
  font-size: 0.8rem;
}
</style>
