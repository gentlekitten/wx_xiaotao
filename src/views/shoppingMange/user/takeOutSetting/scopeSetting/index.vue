<template>
  <div>
    <!-- 顶部返回 -->
    <nav-bar title="配送范围" is-arrow isBackUp />
    <div id="container"></div>
    <!-- <div class="btn_warp">
      <van-button class="btn" type="primary" @click="openEditor" round>开始编辑</van-button>
      <van-button class="btn" type="info" @click="closeEditor" round>结束编辑</van-button>
    </div>
    <div class="save_btn_warp">
      <van-button class="save_btn" @click="saveAddressScope" round>保存</van-button>
    </div>-->
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
      siteInfo: JSON.parse(window.sessionStorage.getItem('siteInfo'))
        ? JSON.parse(window.sessionStorage.getItem('siteInfo'))
        : {},
      map: '',
      circle: '',
      circleEditor: ''
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new AMap.Map('container', {
        center: [this.siteInfo.longitude, this.siteInfo.latitude],
        zoom: 14
      })

      this.circle = new AMap.Circle({
        center: [this.siteInfo.longitude, this.siteInfo.latitude],
        radius: this.siteInfo.radius, //半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
      })

      this.circle.setMap(this.map)
      // 缩放地图到合适的视野级别
      this.map.setFitView([this.circle])
      this.circleEditor = new AMap.CircleEditor(this.map, this.circle)
    },
    openEditor() {
      this.circleEditor.open() //打开圆形编辑器
    },
    closeEditor() {
      this.circleEditor.close() //关闭圆形编辑器
    },
    saveAddressScope() {
      const center = this.circle.getCenter()
      const radius = this.circle.getRadius()
      console.log(center)
      console.log(radius)
    }
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 15rem;
}
.btn_warp {
  display: flex;
  justify-content: space-around;
  .btn {
    margin: 1.2rem 0 4rem 0;
    height: 2.2rem;
    font-size: 0.8rem;
  }
}
.save_btn_warp {
  display: flex;
  justify-content: center;
  .save_btn {
    margin: 1.2rem 0 4rem 0;
    width: @buttonWidth;
    color: #997a00;
    height: 2.8rem;
    background-color: #ffe788;
    border: 1px solid #ffe788;
  }
}
</style>
