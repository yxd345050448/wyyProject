<template>
  <div class="play-box">
    <!-- 标题 -->
    <v-title :title="title"></v-title>
    <!-- 返回 -->
    <v-back></v-back>
    <!-- 搜索 -->
    <v-search></v-search>
    <!-- 歌词 -->
    <transition enter-active-class="animated fadeIn">
      <v-sword :playId="playId" v-if="wShow"></v-sword>
    </transition>
    <!-- 歌曲评论 -->
    <transition enter-active-class="animated fadeIn">
      <v-comment :playId="playId" v-if="cShow"></v-comment>
    </transition>
    <!-- 歌曲描述 -->
    <div v-if="playDetail.al">
      <div class="record-title" v-show="cdShow">{{playDetail.name}}</div>
      <div class="record-singer" v-show="cdShow">
        <span v-for="(item,idx) in playDetail.ar" :key="idx">{{item.name}}</span> -
        <span>{{playDetail.al.name}}</span>
      </div>
      <!-- 唱片动画 -->
      <div :class="[isplay?'record-box run':'record-box pause']" @click="wordShow" v-show="cdShow">
        <div class="record-mbox">
          <img :src="playDetail.al.picUrl" />
        </div>
      </div>
    </div>
    <!-- 音频功能键 -->
    <div class="audio-fn">
      <!-- 按钮 -->
      <div class="audio-fn-btn">
        <!-- 歌词 -->
        <div class="fn-btn" @click="wordShow">
          <van-icon class="btn-icon" name="orders-o" size="0.5rem" color="#ccc" />歌词
        </div>
        <!-- 播放 -->
        <div>
          <van-icon
            name="play-circle-o"
            size="0.9rem"
            color="#ccc"
            @click="startPlayOrPause"
            v-show="!isplay"
          />
          <van-icon
            name="pause-circle-o"
            size="0.9rem"
            color="#ccc"
            @click="startPlayOrPause"
            v-show="isplay"
          />
        </div>
        <!-- 评论 -->
        <div class="fn-btn" @click="commentShow">
          <van-icon class="btn-icon" name="comment-o" size="0.5rem" color="#ccc" />评论
        </div>
      </div>
      <!-- 进度条 -->
      <div class="audio-slider">
        <van-slider
          v-model="audioNow"
          :min="0"
          :max="audioTotal"
          @change="changeAudio"
          active-color="#6c748a"
          bar-height="0.3rem"
        ></van-slider>
      </div>
    </div>
    <audio
      class="play-audio"
      :src="playUrl"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="timeUpdate"
      loop
      ref="myAudio"
    ></audio>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["String"],
  data() {
    return {
      title: this.$route.name, //标题
      playId: "", //歌曲id
      playUrl: "", //歌曲url
      wShow: false, //歌词
      cdShow: true, //cd
      cShow: false, //评论
      playDetail: {}, //歌曲详情
      audioTotal: 100, //音频总时间
      audioNow: 0, //音频目前时间
      isplay: false //音频是否为播放状态
    };
  },
  methods: {
    //歌曲url
    getUrl() {
      this.$axios({
        url: API.songUrl,
        method: "get",
        params: {
          id: this.playId
        }
      }).then(res => {
        this.playUrl = res.data.data[0].url;
      });
    },
    //歌曲详情
    getSongDetail() {
      this.$axios({
        url: API.songDetail,
        method: "get",
        params: {
          ids: this.$route.query.id
        }
      }).then(res => {
        this.playDetail = res.data.songs[0];
      });
    },
    //弹出歌词
    wordShow() {
      if (!this.cShow) {
        this.wShow = !this.wShow;
        this.cdShow = !this.cdShow;
      }
    },
    //弹出评论
    commentShow() {
      if (!this.wShow) {
        this.cShow = !this.cShow;
        this.cdShow = !this.cdShow;
      }
    },
    //控制音频播放与暂停
    startPlayOrPause() {
      if (this.isplay) {
        this.onPause();
        console.log("暂停");
      } else {
        this.onPlay();
        console.log("开始");
      }
    },
    //当音频播放
    onPlay() {
      this.isplay = true;
      this.$refs.myAudio.play();
      this.audioTotal = this.$refs.myAudio.duration;
    },
    //当音频暂停
    onPause() {
      this.isplay = false;
      this.$refs.myAudio.pause();
    },
    //进度条改变
    changeAudio() {
      if (this.$refs.myAudio) {
        this.$refs.myAudio.currentTime = this.audioNow;
        this.audioTotal = this.$refs.myAudio.duration;
      }
    },
    //更新进度条
    timeUpdate() {
      if (this.$refs.myAudio) {
        this.audioNow = this.$refs.myAudio.currentTime;
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.playId = this.$route.query.id;
    this.getSongDetail();
    this.getUrl();
  },
  activated() {
    // console.log("play activated");
    // this.playId = this.$route.query.id;
    // this.playDetail = {};
    // this.getSongDetail();
    // this.getUrl();
    //通过对比这次请求id和上一次请求id做的优化,假如这次id和上一次id不一致,才重新发起请求
    if (this.$route.query.id != localStorage.getItem("playId")) {
      console.log("id不一样");
      this.playDetail = {};
      localStorage.setItem("playId", this.$route.query.id);
      this.playId = this.$route.query.id;
      this.getSongDetail();
      this.getUrl();
    }
  }
};
</script>
<style lang='less' scoped>
// 动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-box {
  width: 100%;
  height: 100%;
  background: #192823;
  position: relative;
  .play-audio {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  // 歌名
  .record-title {
    position: absolute;
    left: 0;
    top: 15%;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    font-size: 0.4rem;
    color: #eee;
  }
  //歌手
  .record-singer {
    position: absolute;
    left: 0;
    top: 20%;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    font-size: 0.4rem;
    color: #cdc0ac;
  }
  // 唱片
  .record-box {
    width: 6rem;
    height: 6rem;
    position: absolute;
    background: #000;
    border-radius: 50%;
    top: 27%;
    left: 0;
    right: 0;
    margin: auto;
    animation: rotate 12s linear infinite;
    .record-mbox {
      width: 70%;
      height: 70%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  //音频功能栏
  .audio-fn {
    width: 100%;
    position: fixed;
    bottom: 0.3rem;
    //按钮
    .audio-fn-btn {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-evenly;
      .fn-btn {
        width: 1rem;
        height: 1rem;
        color: #ccc;
        font-size: 0.12rem;
        text-align: center;
        line-height: 1.5rem;
        position: relative;
        .btn-icon {
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
    // 进度条
    .audio-slider {
      width: 80%;
      margin: 0.2rem auto;
      .custom-button {
        width: 26px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #ee0a24;
        border-radius: 100px;
      }
    }
  }
  //动画播放暂停
  .pause {
    animation-play-state: paused;
  }
  .run {
    animation-play-state: running;
  }
}
</style>