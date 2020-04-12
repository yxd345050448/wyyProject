<template>
  <div class="word-box">
    <div class="song-word">
      <p v-for="(item,index) in swArr" :key="index">{{item}}</p>
    </div>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["playId"],
  data() {
    return {
      songWord: "",
      swArr: []
    };
  },
  methods: {
    //歌词
    getWord() {
      this.$axios({
        url: API.songWord,
        method: "get",
        params: {
          id: this.playId
        }
      }).then(res => {
        console.log(res);
        this.songWord = res.data.lrc.lyric;
        var str = this.songWord;
        for (var i = 0; i <= str.length - 1; i++) {
          str = str.replace(/\n/g, ",");
        }
        var arr = str.split(",");
        this.swArr = arr;
      });
    }
  },
  components: {},
  mounted() {
    this.getWord();
  }
};
</script>
<style lang='less'>
.word-box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 1rem 0 0 0;
  background: rgba(0, 0, 0, 0.5);
  .song-word {
    height: 80%;
    color: #fff;
    text-align: center;
    overflow-y: scroll;
    p {
      font-size: 0.14rem;
      margin-top: 0.1rem;
    }
  }
}
</style>