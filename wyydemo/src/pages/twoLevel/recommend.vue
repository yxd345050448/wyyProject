<template>
  <div class="min-box">
    <!-- 标题 -->
    <v-title :title="title"></v-title>
    <!-- 返回 -->
    <v-back></v-back>
    <!-- 搜索 -->
    <v-search></v-search>
    <!-- 主体 -->
    <div v-if="recommendList.length>0">
      <!-- 轮播 -->
      <div class="banner">
        <van-swipe :autoplay="3000" class="banners">
          <van-swipe-item v-for="(item, index) in banner" :key="index">
            <img v-lazy="item.imageUrl" :src="item.imageUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 列表 -->
      <div class="recommend-box">
        <div
          class="item"
          v-for="item in recommendList"
          :key="item.id"
          is="router-link"
          :to="'/list?id='+item.id"
        >
          <img :src="item.picUrl" alt />
          <p class="item-title">{{item.name}}</p>
          <!-- <p class="item-message">{{item.copywriter}}</p> -->
          <p class="item-time">{{item.trackNumberUpdateTime|dateFilter}}</p>
        </div>
      </div>
    </div>
    <v-load v-else></v-load>
  </div>
</template>
<script>
import API from "../../util/api";
export default {
  props: ["String"],
  data() {
    return {
      //推荐列表
      recommendList: [],
      //轮播图
      banner: [],
      title: this.$route.name
    };
  },
  methods: {
    //获取推荐列表
    getPersonalized() {
      this.$axios({
        url: API.personalized,
        method: "get"
      }).then(res => {
        this.recommendList = res.data.result;
      });
    },
    //获取轮播图
    getBanner() {
      this.$axios({
        url: API.banner,
        method: "get"
      }).then(res => {
        this.banner = res.data.banners;
      });
    }
  },
  components: {},
  mounted() {
    this.getPersonalized();
    this.getBanner();
  }
};
</script>
<style lang='less' scoped>
.min-box {
  width: 100%;
  background: #ccc;
  padding: 0.85rem 0;
  h1 {
    text-align: center;
    font-size: 0.5rem;
    background: #c20c0c;
    color: #fff;
    padding: 0.1rem;
  }
  .recommend-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2.6rem 0.1rem 0 0.1rem;
  }
  // 歌单项
  .item {
    width: 30%;
    height: 2.5rem;
    background: #fff;
    padding: 0.1rem;
    border-radius: 0.1rem;
    margin-top: 0.1rem;
    position: relative;
    img {
      width: 90%;
      height: 1.6rem;
      margin: 0rem auto;
      display: block;
      border-radius: 0.15rem;
    }
    .item-title {
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.2rem;
      margin: 0.1rem 0.18rem;
      font-weight: bold;
      color: #333;
    }
    .item-time {
      font-size: 0.14rem;
      color: #a8acad;
      text-align: right;
      margin-right: 0.2rem;
      position: absolute;
      bottom: 0.1rem;
      right: 0.1rem;
    }
  }
  // 轮播图
  .banner {
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0.87rem;
    margin: auto;
    z-index: 100;
    border-radius: 0.1rem;
    box-shadow: 0rem 0.1rem 0.05rem #333;
    .banners {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>