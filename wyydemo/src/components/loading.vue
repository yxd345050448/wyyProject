<template>
  <div class="load-box">
    <van-loading type="circular" color="#ccc" class="load-icon" size="1rem" vertical>
      <span>加载中...</span>
    </van-loading>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {};
  },
  methods: {},
  components: {},
  mounted() {},
  activated() {}
};
</script>
<style lang='less' scoped>
.load-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
  .load-icon {
    position: absolute;
    left: 50%;
    top: 34%;
    margin-left: -0.5rem;
    span {
      color: #ccc;
    }
  }
}
</style>