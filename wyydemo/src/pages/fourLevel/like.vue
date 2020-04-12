<template>
  <div class="user-minbox">
    <h3>我喜欢的歌曲</h3>
    <!-- 歌曲列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="like-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadList"
      >
        <van-cell is="li" v-for="(item,index) in likeList" :key="index" @click.stop="toPlay(item.id)">
          <div class="list-item">
            <img :src="item.al.picUrl" alt />
            <div class="item-text">
              <p class="item-title">{{item.name}}</p>
              <p class="item-message">
                歌手:
                <span v-for="i in item.ar" :key="i.id">{{i.name}}&nbsp;</span>
              </p>
            </div>
            <div>
              <van-icon
                class="item-icon"
                name="ellipsis"
                size="0.4rem"
                @click.stop="show(item.id,item.name)"
              />
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 底部弹出层 -->
    <van-popup
      class="popup"
      v-model="isShow"
      position="bottom"
      round
      :style="{ height: '20%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="delete">
        <p>歌手:&nbsp;</p>
        <hr />
        <!-- 取消收藏按钮 -->
        <div class="delete-btn">
          <span class="iconfont icon-shanchu"></span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["str"],
  data() {
    return {
      likeList: [], //歌曲列表
      userId: "", //用户id
      ids: "", //歌曲ids
      isShow: false, //显隐弹出
      loading: false, //加载中
      finished: false, //加载完毕
      refreshing: false,
      pageNum: 0 //页号
    };
  },
  methods: {
    //获取喜欢的歌曲ids
    getLikeIds() {
      if (this.userId) {
        this.$axios({
          url: API.likeList,
          method: "get",
          params: {
            uid: this.userId
          }
        }).then(res => {
          this.ids = res.data.ids.join(",");
          // console.log(this.ids);
          // this.getLikeList(this.ids);
        });
      }
    },
    //加载歌曲列表
    loadList() {
      setTimeout(() => {
        if (this.refreshing) {
          this.likeList = [];
          this.refreshing = false;
        }
        this.$axios({
          url: API.songDetail,
          method: "get",
          params: {
            ids: this.ids
          }
        }).then(res => {
          console.log(res.data.songs.length);
          // var length = Math.floor(res.data.songs.length / 10);
          if (this.pageNum + 1 >= res.data.songs.length) {
            console.log("没有更多了");
            
          } else {
            for (let i = 0; i < 15; i++) {
              console.log(this.pageNum);
              this.likeList.push(res.data.songs[i + this.pageNum]);
              this.pageNum++;
            }
          }

          this.loading = false;
          if (this.likeList.length >= res.data.songs.length) {
            this.finished = true;
          }
        });
      }, 1000);
    },
    //上拉加载
    onRefresh() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.loadList(); // 重新加载数据
    },
    //弹出层
    show(id, name) {
      this.isShow = !this.isShow;
      this.singerId = id;
      this.singerName = name;
      console.log(this.singerId, this.singerName); //当前歌手id和姓名
    },
    //去播放页
    toPlay(id) {
      if (id) {
        this.$router.push({ path: "/play", query: { id: id } });
      }
    }
  },
  components: {},
  mounted() {
    this.userId = localStorage.getItem("userId");
    console.log(this.userId);
    this.getLikeIds();
    // this.getLikeList();
  },
  activated() {}
};
</script>
<style lang='less' scoped>
.user-minbox {
  h3 {
    text-align: center;
  }
  .like-list {
    width: 90%;
    height: 7rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    margin: 0.1rem auto;
    overflow: hidden;
    overflow-y: scroll;
    // 列表项
    .list-item {
      width: 100%;
      height: 1rem;
      background: #f5f5f5;
      border-radius: 0.5rem;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      padding-left: 0.2rem;
      padding-top: 0.1rem;
      margin-bottom: 0.2rem;
      box-shadow: 0.05rem 0.05rem 0.05rem #ccc;
      //头像
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        box-shadow: 0.05rem 0.05rem 0.05rem #333;
      }
      //详情
      div:nth-of-type(1) {
        width: 65%;
        margin: 0 0.3rem;
        .item-title {
          font-size: 0.27rem;
          color: #333;
          font-weight: bold;
          margin-bottom: 0.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-message {
          font-size: 0.12rem;
          color: #878787;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      div:nth-of-type(2) {
        flex: 1;
        position: relative;
        //删除
        .item-icon {
          position: absolute;
          left: 0;
          right: 0;
          top: 0.2rem;
          bottom: 0;
          margin: auto;
          color: #878787;
        }
      }
    }
  }
}
</style>