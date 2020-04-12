<template>
  <div class="user-box">
    <!-- 主体 -->
    <div class="user">
      <!-- 顶部用户信息 -->
      <div class="user-top" :style="{backgroundImage:'url('+user.backgroundUrl+')'}">
        <!-- 头像 -->
        <div class="user-img">
          <img :src="userImg" alt />
        </div>
        <!-- 信息 -->
        <div class="user-message">
          <p>{{user.nickname}}</p>
          <p>lv.{{userLevel}}</p>
        </div>
      </div>
      <!-- 用户收藏信息 -->
      <div class="user-fn">
        <div class="user-fn-btn">
          <div is="router-link" to="/home/myPage/user/collect">
            <van-icon size="0.5rem" name="service-o" class="user-icon" />我的收藏
          </div>
          <div is="router-link" to="/home/myPage/user/like">
            <van-icon size="0.5rem" name="like-o" class="user-icon" />我喜欢的
          </div>
          <div is="router-link" to="/home/myPage/user/userSong">
            <van-icon size="0.5rem" name="music-o" class="user-icon" />我的歌单
          </div>
          <div is="router-link" to="/home/myPage/user/attention" >
            <van-icon size="0.5rem" name="star-o" class="user-icon" />我的关注
          </div>
        </div>
      </div>
      <div class="user-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["String"],
  data() {
    return {
      userId: "",
      user: {},
      userImg: "",
      userLevel: ""
    };
  },
  methods: {
    //获取用户详情
    getUserDetail() {
      if (this.userId) {
        this.$axios({
          url: API.userDetail,
          method: "get",
          params: {
            uid: this.userId
          }
        }).then(res => {
          this.user = res.data.profile;
          // console.log(this.user);
          this.userImg = res.data.profile.avatarUrl;
          this.userLevel = res.data.level;
        });
      } else {
        this.$toast.fail("无法获取用户信息");
      }
    },
    //获取用户收藏信息
    // getUserFn() {
    //   if (this.userId) {
    //     this.$axios({
    //       url: API.userSubcount,
    //       method: "get"
    //     }).then(res => {
    //       console.log(res);
    //     });
    //   } else {
    //     this.$toast.fail("无法获取用户信息");
    //   }
    // },
    //收藏页
    toCollect() {
      this.$router.push({ path: "/home/myPage/user/collect" });
    },
    //喜欢页
    toLike() {
      this.$router.push({
        path: "/home/myPage/user/like",
        query: { userId: this.userId }
      });
    },
    //用户歌单页
    toUserSong() {
      this.$router.push({ path: "/home/myPage/user/userSong" });
    }
  },
  components: {},
  mounted() {
    this.userId = localStorage.getItem("userId");
    console.log(this.userId);
    this.getUserDetail();
    // this.getUserFn();
  },
  activated() {}
};
</script>
<style lang='less' scoped>
.min-box {
  padding: 0;
}
.user-box {
  width: 100vw;
  // height: 100vh;
  background: #1d1d1d;
  // overflow: hidden;
  // 主体
  .user {
    width: 100vw;
    overflow: hidden;
    //用户顶部信息
    .user-top {
      width: 100%;
      height: 3rem;
      // border: 1px solid;
      display: flex;
      justify-content: space-between;
      background-size: 100% 100%;
      // 头像
      .user-img {
        width: 1.8rem;
        height: 1.8rem;
        position: relative;
        img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
      //信息
      .user-message {
        flex: 1;
        height: 1.8rem;
        color: #fff;
        padding-top: 0.4rem;
        padding-left: 0.2rem;
        box-sizing: border-box;
        p:nth-child(1) {
          font-size: 0.3rem;
          font-weight: bold;
          color: #fff;
        }
        p:nth-child(2) {
          display: inline-block;
          font-size: 0.15rem;
          color: #fff;
          font-style: italic;
          margin-top: 0.1rem;
          background: #c2935d;
          padding: 0.05rem 0.2rem;
          border-radius: 0.2rem;
        }
      }
    }
    //用户功能
    .user-fn {
      width: 100%;
      position: absolute;
      top: 2.8rem;
      .user-fn-btn {
        display: flex;
        justify-content: space-around;
        a {
          display: block;
          width: 1rem;
          height: 1rem;
          font-size: 0.12rem;
          color: #fff;
          text-align: center;
          line-height: 1.6rem;
          position: relative;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.2rem;
          .user-icon {
            position: absolute;
            left: 0;
            right: 0;
            top: 0.1rem;
            margin: auto;
          }
        }
      }
    }
    //内容
    .user-content {
      width: 100%;
      height: 8.5rem;
      box-sizing: border-box;
      background: #fff;
      border-radius: 0.4rem;
      padding-top: 0.3rem;
    }
  }
  .select {
    color: #c2935d;
    background: #333;
  }
}
</style>