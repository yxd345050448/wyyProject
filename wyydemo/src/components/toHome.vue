<template>
  <div class="toHome">
    <div @click="toHome">
    <span class="iconfont icon-shouye"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {};
  },
  methods: {
    toHome(){
      this.$router.replace("/home");
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.toHome {
  color: #fff;
  position: fixed;
  right: 0.5rem;
  top: 0.3rem;
  z-index: 1000;
}
</style>