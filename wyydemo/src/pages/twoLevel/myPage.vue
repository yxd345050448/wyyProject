<template>
  <div class="min-box">
    <!-- 标题 -->
    <v-title :title="title"></v-title>
    <!-- 返回 -->
    <v-back></v-back>
    <!-- 搜索 -->
    <v-search></v-search>
    <!-- <v-load></v-load> -->
    <!-- 主体 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: ["String"],
  data() {
    return {
      title: "我的",
    };
  },
  methods: {
  },
  components: {},
  mounted() {},
  activated() {}
};
</script>
<style lang='less' scoped>
.min-box {
  width: 100%;
  height: 100vh;
  background: #ccc;
  padding: 0.85rem 0;
}
</style>