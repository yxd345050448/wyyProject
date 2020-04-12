<template>
  <div class="goBack">
    <div @click="goBack">
      <span class="iconfont icon-houtui"></span>
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
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.goBack {
  color: #fff;
  position: fixed;
  left: 0.5rem;
  top: 0.3rem;
  z-index: 1000;
}
</style>