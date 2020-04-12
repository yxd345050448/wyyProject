<template>
  <div class="user-minbox">
    <div v-if="attentionList.length>0">
      <h3>我关注的</h3>
    </div>
    <v-load v-else></v-load>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {
      userId: "",
      attentionList: [] //关注列表
    };
  },
  methods: {},
  components: {},
  mounted() {
    this.userId = localStorage.getItem("userId");
  },
  activated() {}
};
</script>
<style lang='less' scoped>
.user-minbox {
  h3 {
    text-align: center;
  }
}
</style>