<template>
  <div class="min-box">
    <!-- 标题 -->
    <v-title :title="title"></v-title>
    <!-- 返回 -->
    <v-back></v-back>
    <!-- 搜索 -->
    <v-search></v-search>
    <v-load></v-load>
    <h3>更多功能还在开发中...</h3>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {
        title:this.$route.name
    };
  },
  methods: {},
  components: {},
  mounted() {},
  activated() {}
};
</script>
<style lang='less' scoped>
.min-box {
  width: 100%;
  background: #ccc;
  height: 100vh;
  padding: 0.85rem 0;
}
</style>