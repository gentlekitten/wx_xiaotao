<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="商品详情编辑" is-arrow isBackUp />
    <van-field v-show="false" type="textarea">
      <template #input>
        <van-uploader
          v-model="swiperImg"
          :after-read="upEditorImg"
          :max-size="500 * 1024"
        />
      </template>
    </van-field>
    <quill-editor
      class="quill_edditor"
      v-model="goodsInfo"
      ref="myQuillEditor"
      :options="editorOption"
    ></quill-editor>
    <div class="btn_warp">
      <van-button class="btn" round @click="saveGoodsInfo">保存</van-button>
    </div>
  </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'], // remove formatting button
]
// import { quillRedefine } from 'vue-quill-editor-upload'

import { upData, upLogo } from '@/api/api.js'

import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      id: null,
      swiperImg: [],
      goodsInfo: '',
      productSources: [],
      // 富文本配置
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector('.van-uploader__input').click()
                } else {
                  this.quill.format('image', false)
                }
              },
            },
          },
        },
      },
    }
  },
  created() {
    this.$route.query.id && (this.id = this.$route.query.id)
  },
  methods: {
    // 富文本图片上传到服务器并插入到富文本中
    async upEditorImg(file) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      const url =
        this.id === '0' ? '/product/edit/file' : '/secondhand/product/edit/file'
      const res = await upLogo(url, formData)
      console.log(res)
      if (res.code === '0') {
        this.productSources.push({ sourceAddress: res.data.url })
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', this.imgBaseUrl + res.data.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
        file.status = 'done'
        return false
      }
      file.status = 'failed'
      file.message = '上传失败'
      this.$handleCode.handleCode(res)
    },
    async saveGoodsInfo() {
      if (!this.goodsInfo) {
        return this.$toast.fail('请填写商品详情！')
      }
      // console.log(this.goodsInfo)
      const url =
        this.id === '0'
          ? '/product/detail/save'
          : '/secondhand/product/detail/save'
      const res = await upData(
        url,
        {
          html: this.goodsInfo,
          productSources: this.productSources,
        },
        { showLoading: true }
      )
      console.log(res)
      if (res.code === '0') {
        if (this.id === '0') {
          this.$store.commit('addGoods/DETAIL_URL', res.data.fileName)
          sessionStorage.setItem(
            'addGoods',
            JSON.stringify(this.$store.state.addGoods)
          )
        } else {
          this.$store.commit(
            'secondaryMarket/PRODUCT_DETAIL_ADDRESS',
            res.data.fileName
          )
          sessionStorage.setItem(
            'secondaryMarketAddGoods',
            JSON.stringify(this.$store.state.secondaryMarket)
          )
        }
        this.$router.go(-1)
        return false
      }
      this.$handleCode.handleCode(res)
    },
  },
}
</script>
<style lang="less" scoped>
.quill_edditor {
  background-color: #fff;
  width: 100%;
}
.btn_warp {
  display: flex;
  justify-content: center;
  .btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>