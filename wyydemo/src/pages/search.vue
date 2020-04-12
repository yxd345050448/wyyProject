<template>
  <div class="search-box">
    <v-title :title="title"></v-title>
    <v-back></v-back>
    <v-home></v-home>
    <!-- 主体 -->
    <div v-if="hotArr.length>0">
      <!-- 搜索框 -->
      <div class="search">
        <!-- <input type="text" v-model="iptVal" @keydown.enter="search" placeholder="歌名/歌手/专辑" /> -->
        <van-search
          class="search-ipt"
          shape="round"
          background="#ccc"
          v-model="iptVal"
          placeholder="歌手/歌曲/专辑"
          @keydown.enter="search"
        />
        <span class="iconfont icon-sousuo searchIcon" @click.self="search"></span>
      </div>
      <!-- 搜索单曲列表 -->
      <transition enter-active-class="animated bounceInUp">
        <div class="search-list" v-if="searchArr.length">
          <ul>
            <li class="list-title">单曲</li>
            <li class="list-item" v-for="item in searchArr" :key="item.id" @click="toPlay(item.id)">
              <p class="item-name">{{item.name}}</p>
              <p>
                <span class="item-singer" v-for="(i,idx) in item.artists" :key="idx">{{i.name}}</span> -
                <span class="item-album">{{item.album.name}}</span>
              </p>
            </li>
          </ul>
        </div>
      </transition>
      <!-- 历史搜索记录 -->
      <div class="history-search" v-if="searchArr.length<1">
        <div class="history-title">历史搜索</div>
        <ul>
          <!-- <li class="history-item">邓紫棋</li> -->
          <li
            class="history-item"
            v-for="(item,idx) in historyArr"
            :key="idx"
            @click="toSearch(item)"
          >{{item}}</li>
        </ul>
      </div>
      <!-- 热搜列表 -->
      <div class="hot-search" v-if="searchArr.length<1">
        <ul>
          <li class="hot-title">热搜榜</li>
          <!-- <li class="hot-item">
          <p class="hot-name">玉</p>
          <p class="hot-singer">太一</p>
          </li>-->
          <li
            class="hot-item"
            v-for="(item,idx) in hotArr"
            :key="idx"
            @click="getSearch(item.searchWord)"
          >
            <p class="hot-name">{{item.searchWord}}</p>
            <p class="hot-message">{{item.content}}</p>
          </li>
        </ul>
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
      title: this.$route.name, //标题
      iptVal: "", //搜索框内容
      searchArr: [], //搜索结果
      hotArr: [], //热搜列表
      localArr: [], //搜索仓库
      historyArr: [] //历史搜索
    };
  },
  methods: {
    //搜索
    search() {
      if (this.iptVal) {
        this.localArr.push(this.iptVal); //把搜索结果装入一个数组
        localStorage.setItem("iptVal", this.localArr); //再把数组存入本地
        this.$axios({
          url: API.search,
          method: "get",
          params: {
            keywords: this.iptVal,
            limit: 20
          }
        }).then(res => {
          this.searchArr = res.data.result.songs;
          console.log(this.searchArr);
        });
      }
    },
    //热搜
    hotSearch() {
      if (this.searchArr.length == 0) {
        this.$axios({
          url: API.hotSearch,
          methods: "get"
        }).then(res => {
          this.hotArr = res.data.data;
        });
      }
    },
    //通过热搜调用搜索接口
    getSearch(val) {
      console.log(val);
      this.iptVal = val;
      this.search();
    },
    //获取历史搜索记录
    getLocal() {
      if (localStorage.getItem("iptVal")) {
        var str = localStorage.getItem("iptVal");
        var arr = str.split(",");
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          if (this.historyArr.indexOf(arr[i]) === -1) {
            this.historyArr.unshift(arr[i]);
          }
        }
        return this.historyArr;
      }
    },
    //通过历史记录搜索
    toSearch(val) {
      if (val) {
        this.iptVal = val;
        this.search();
      }
    },
    //跳播放页
    toPlay(id) {
      this.$router.push({ path: "/play", query: { id: id } });
      console.log(id);
    }
  },
  components: {},
  watch: {
    iptVal() {
      if (this.iptVal == "") {
        this.searchArr.length = 0; //当输入框没有内容的时候,显示热搜和历史
      }
    }
  },
  activated() {
    this.hotSearch();
    this.getLocal();
  }
};
</script>
<style lang='less' scoped>
.search-box {
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // 搜索框
  .search {
    padding: 0.9rem 0 0 0;
    width: 100vw;
    display: flex;
    position: relative;
    
    .search-ipt {
      width: 100%;
      padding-left: 0.2rem;
      padding-right: 1rem;
      margin: 0.05rem auto;
    }
    .searchIcon {
      position: absolute;
      right: 0.2rem;
      top: 1.1rem;
      background: #c20c0c;
      color: #fff;
      padding: 0.15rem;
      border-radius: 50%;
    }
  }
  // 搜索单曲列表
  .search-list {
    width: 90%;
    height: 10.5rem;
    margin: 0.2rem auto;
    background: #fff;
    overflow: hidden;
    border-radius: 0.3rem;
    ul {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    .list-title {
      font-size: 0.4rem;
      font-weight: bold;
      padding-left: 0.2rem;
    }
    // 搜索结果
    .list-item {
      border-radius: 0.5rem;
      background: #f5f5f5;
      padding: 0.1rem 0.5rem;
      margin: 0.15rem 0.3rem;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .item-name {
        font-size: 0.25rem;
        font-weight: bold;
        color: #47515e;
      }
      .item-singer {
        font-size: 0.14rem;
        color: #666666;
      }
      .item-album {
        font-size: 0.14rem;
        color: #666666;
      }
    }
  }
  // 热搜榜
  .hot-search {
    width: 90%;
    height: 9.4rem;
    // border: 1px solid;
    background: #fff;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 0.3rem;
    ul {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .hot-title {
        font-size: 0.4rem;
        font-weight: bold;
        padding-left: 0.2rem;
        margin-top: 0.2rem;
      }
      .hot-item {
        border-radius: 0.5rem;
        background: #f5f5f5;
        padding: 0.1rem 0.5rem;
        margin: 0.15rem 0.3rem;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .hot-name {
          font-size: 0.25rem;
          font-weight: bold;
          color: #47515e;
        }
        .hot-message {
          font-size: 0.14rem;
          color: #666666;
        }
      }
    }
  }
  //历史搜索
  .history-search {
    width: 90%;
    // height: 3rem;
    // border: 1px solid;
    margin: 10px auto;
    .history-title {
      font-size: 0.4rem;
      font-weight: bold;
      padding-left: 0.2rem;
    }
    ul {
      width: 90%;
      margin: 10px auto;
      // border: 1px solid;
      .history-item {
        display: inline-block;
        background: #787d83;
        color: #fff;
        font-size: 0.25rem;
        padding: 0.05rem 0.1rem;
        border-radius: 0.5rem;
        margin: 0.05rem 0.1rem;
      }
    }
  }
}
</style>