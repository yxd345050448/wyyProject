<template>
  <div id="app">
    <!-- 页面缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>
<style lang='less' scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>