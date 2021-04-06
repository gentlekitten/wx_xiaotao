<template>
  <div id="home">
    <nav-bar :title="'我的二维码'" :back-to="'/user/userInfo'" :left-text="'返回'" :is-arrow="true" />
    <div class="code">
      <img
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3381390367,3810581293&fm=26&gp=0.jpg"
      >
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.code {
  height: 20rem;
  width: 20rem;
  margin:  0 auto;
  margin-top: 5rem;
}
.code img {
  width: 100%;
  height: 100%;
}
</style>
