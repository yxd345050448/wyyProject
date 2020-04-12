<template>
  <div class="user-minbox">
    <div v-if="userSongList.length>0">
      <h3>我收藏的歌单</h3>
      <!-- 歌手列表 -->
      <div class="userSong-list">
        <ul>
          <li
            class="list-item"
            v-for="item in userSongList"
            :key="item.id"
            @click="toList(item.id)"
          >
            <img :src="item.coverImgUrl" alt />
            <!-- 描述 -->
            <div class="item-text">
              <p class="item-title">{{item.name}}</p>
              <p class="item-message">
                <span>{{item.creator.nickname}}&nbsp;</span>
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
          </li>
          <!-- <li class="list-item" v-for="item in collectArr" :key="item.id">
          <img src="" alt />
          <div>
            <p>邓紫棋</p>
            <p>
              <span>专辑：99</span>
              <span>MV：99</span>
              <span>
                <van-icon name="ellipsis" />
              </span>
            </p>
          </div>
          </li>-->
        </ul>
      </div>
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
          <p>歌手:&nbsp;{{}}</p>
          <hr />
          <!-- 取消收藏按钮 -->
          <div class="delete-btn">
            <span class="iconfont icon-shanchu"></span>
          </div>
        </div>
      </van-popup>
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
      userId: "",
      userSongList: [], //关注列表
      isShow: false //显隐弹出
    };
  },
  methods: {
    //关注列表
    getAttention() {
      if (this.userId) {
        this.$axios({
          url: API.attention,
          method: "get",
          params: {
            uid: this.userId,
            limit: 30,
            offset: (this.page - 1) * 30
          }
        });
      }
    },
    //用户歌单
    getUserPlay() {
      if (this.userId) {
        this.$axios({
          url: API.userPlay,
          method: "get",
          params: {
            uid: this.userId
          }
        }).then(res => {
          // console.log(res);
          this.userSongList = res.data.playlist;
        });
      }
    },
    //去列表页
    toList(id) {
      this.$router.push({ path: "/list", query: { id: id } });
    },
    //弹出层
    show(id, name) {
      this.isShow = !this.isShow;
      this.singerId = id;
      this.singerName = name;
      console.log(this.singerId, this.singerName); //当前歌手id和姓名
    }
  },
  components: {},
  mounted() {
    this.userId = localStorage.getItem("userId");
    console.log(this.userId);
    // this.getAttention();
    this.getUserPlay();
  },
  activated() {}
};
</script>
<style lang='less' scoped>
.user-minbox {
  h3 {
    text-align: center;
  }
  //用户歌单列表
  .userSong-list {
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
      border-radius: 0.2rem;
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
        border-radius: 0.1rem;
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