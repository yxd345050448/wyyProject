<template>
  <div class="toSearch">
      <div @click="toSearch">
          <span class="iconfont icon-sousuo"></span>
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
      toSearch(){
          this.$router.push("/search")
      }
  },
  components: {},
  mounted(){

  }
};
</script>
<style lang='less' scoped>
.toSearch{
  color: #fff;
  position: fixed;
  right: 0.5rem;
  top: 0.3rem;
  z-index: 1000;
}
</style>