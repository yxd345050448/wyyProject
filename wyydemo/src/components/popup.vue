<template>
  <div class="popup-box">
    
  </div>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
        isShow:null,
    };
  },
  methods: {},
  components: {},
  mounted() {
      this.isShow = this.props.show;
  },
  activated() {}
};
</script>
<style lang='less' scoped>
</style>