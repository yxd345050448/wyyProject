<template>
  <div class="min-box">
    <!-- 标题 -->
    <v-title :title="title"></v-title>
    <!-- 返回 -->
    <v-back></v-back>
    <!-- 搜索 -->
    <v-search></v-search>
    <div class="top-box" v-if="topList.length>0">
      <ul>
        <li v-for="(item,idx) in topList" :key="item.id">
          <div class="item" v-if="4>idx" is="router-link" :to="'/list?id='+item.id">
            <!-- 榜单图片 -->
            <img :src="item.coverImgUrl" />
            <ul class="right">
              <!-- 榜单歌曲项 -->
              <li v-for="(i,index) in item.tracks" :key="index">
                <p class="right-item">
                  <span>{{i.first}}</span>
                  <span>&nbsp;-&nbsp;</span>
                  <span>{{i.second}}</span>
                </p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <v-load v-else></v-load>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["String"],
  data() {
    return {
      //排行列表
      topList: [],
      title: this.$route.name
    };
  },
  methods: {
    getTop() {
      this.$axios({
        url: API.toplist,
        method: "get"
      }).then(res => {
        console.log(res);
        this.topList = res.data.list;
      });
    }
  },
  components: {},
  mounted() {
    this.getTop();
  }
};
</script>
<style lang='less' scoped>
.min-box {
  width: 100%;
  height: 100vh;
  background: #ccc;
  padding: 0.85rem 0;
  h1 {
    text-align: center;
    font-size: 0.5rem;
    background: #c20c0c;
    color: #fff;
    padding: 0.1rem;
  }
  .top-box {
    width: 100%;
    padding: 0 0.2rem;
    border-radius: 0.1rem;
    margin-top: 0.1rem;
    .item {
      display: flex;
      justify-content: space-between;
      margin: 0.1rem 0;
      padding: 0.1rem;
      background: #fff;
      border-radius: 0.1rem;
      img {
        width: 2rem;
        height: 1.8rem;
        display: block;
        border-radius: 0.15rem;
      }
      .right {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          height: 30%;
          line-height: 0.5rem;
          .right-item {
            color: #333;
            font-size: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>