<template>
  <div class="min-box">
    <div class="list-top">
      <!-- <h1>歌单详情</h1> -->
      <v-title :title="title"></v-title>
      <!-- 返回 -->
      <v-back></v-back>
      <!-- 搜索 -->
      <v-search></v-search>
    </div>
    <div v-if="songList.length>0">
      <!-- 歌单描述 -->
      <div class="top-content" v-if="songList.length">
        <div class="left">
          <img :src="songMessage.coverImgUrl" alt />
        </div>
        <div class="right">
          <p class="r-title">{{songMessage.name}}</p>
          <p class="r-type">
            <span v-for="(item,idx2) in songMessage.tags" :key="idx2">"{{item}}"&nbsp;</span>
          </p>
          <div class="r-msg">{{songMessage.description}}</div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="list-box" v-if="songList.length">
        <div
          class="item"
          v-for="(item,index) in songList"
          :key="item.id"
          is="router-link"
          :to="'/play?id='+item.id"
        >
          <div class="item-num">{{index+1}}</div>
          <div class="item-content">
            <p class="title">{{item.name}}</p>
            <p class="singer">
              <span v-for="(i,idx) in item.ar" :key="i.id">
                <span v-if="0<idx">-</span>
                {{i.name}}
              </span>
            </p>
          </div>
          <div class="item-more">更多</div>
        </div>
      </div>
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
      id: "", //获取推荐页传过来的id
      songList: [], //歌曲列表
      songMessage: {}, //歌单信息
      title: this.$route.name //标题
    };
  },
  methods: {
    //获取歌单详情
    getList() {
      this.$axios({
        url: API.listDetail,
        method: "get",
        params: {
          id: this.id
        }
      }).then(res => {
        this.songMessage = res.data.playlist;
        this.songList = res.data.playlist.tracks;
      });
    }
  },
  components: {},
  mounted() {
    console.log("list mountd");

    this.id = this.$route.query.id;
    this.getList();
  },
  activated() {
    //路由变化的生命周期,当路径发生改变的时候就会执行
    console.log("list activated");
    //通过对比这次请求id和上一次请求id做的优化,假如这次id和上一次id不一致,才重新发起请求
    if (this.$route.query.id != localStorage.getItem("slistId")) {
      this.songList = []; //由于页面缓存问题,首屏加载可能会导致上次一的数据闪屏一下
      this.songMessage = {}; //在这里把上一次的数据清空一下解决这个bug
      localStorage.setItem("slistId", this.$route.query.id);
      this.id = this.$route.query.id;
      this.getList();
    }
  }
};
</script>
<style lang='less' scoped>
.min-box {
  width: 100%;
  height: 100vh;
  background: #1c2828;
  .list-top {
    width: 100%;
  }
  // 歌单描述
  .top-content {
    width: 100%;
    height: 3.8rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.1rem;
    .left {
      width: 35%;
      img {
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .right {
      width: 60%;
      // border: 1px solid;
      p {
        margin-bottom: 0.2rem;
      }
      .r-title {
        height: 0.8rem;
        font-size: 0.3rem;
        font-weight: bold;
        color: #cdc0ac;
      }
      .r-type {
        font-size: 0.16rem;
        color: #666666;
        text-align: center;
      }
      .r-msg {
        font-size: 0.14rem;
        color: #a8acad;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
  .list-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 0.3rem;
    padding: 0.2rem;
    .item {
      display: flex;
      justify-content: space-between;
      background: #f5f5f5;
      border-radius: 0.5rem;
      padding: 0.05rem 0.1rem;
      margin-bottom: 0.1rem;
      .item-num {
        width: 10%;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.3rem;
        font-weight: bold;
        color: #a8acad;
      }
      .item-content {
        width: 70%;
        padding-left: 0.2rem;
        .title {
          color: #333;
          font-size: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          color: #666666;
          font-size: 0.14rem;
          margin-top: 0.05rem;
        }
      }
      .item-more {
        width: 10%;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.14rem;
        color: #a8acad;
      }
    }
  }
}
</style>