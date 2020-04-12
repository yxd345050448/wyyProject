<template>
  <div class="box">
    <!-- 路由出口 -->
    <router-view></router-view>
    <footer>
      <!-- 路由跳转 -->
      <router-link to="/home/recommend" active-class="select">
        推荐榜
        <van-icon name="service-o" class="footer-icon" size="0.35rem" />
      </router-link>
      <router-link to="/home/top" active-class="select">
        排行榜
        <van-icon name="fire-o" class="footer-icon" size="0.35rem" />
      </router-link>
      <router-link to="/home/myPage" active-class="select">
        我的
        <van-icon name="user-circle-o" class="footer-icon" size="0.35rem" />
      </router-link>
      <router-link to="/home/more" active-class="select">
        更多
        <van-icon name="ellipsis" class="footer-icon" size="0.35rem" />
      </router-link>
    </footer>
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
  mounted() {}
};
</script>
<style lang='less' scoped>
footer {
  width: 100vw;
  height: 1rem;
  position: fixed;
  background: #242424;
  left: 0;
  bottom: 0;
  display: flex;
  a {
    flex: 1;
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.25rem;
    font-weight: bold;
    color: #fff;
    margin: 0.1rem;
    position: relative;
    .footer-icon {
      position: absolute;
      top: 0.05rem;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
.select {
  color: #fff;
  background: #c20c0c;
  border-radius: 0.3rem;
}
</style>