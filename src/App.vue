<template>
  <div id="app">
    <keep-alive :include="include">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      include: ['Index', 'User']
    }
  }
}
</script>
<style scoped>
#app {
  min-width: 350px;
  min-height: 550px;
}
</style>
