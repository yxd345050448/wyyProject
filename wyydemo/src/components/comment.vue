<template>
    <div class="comment-box">
      <ul class="comment">
        <li v-for="item in  userComment" :key="item.commentId">
          <div class="l-user">
            <img :src="item.user.avatarUrl" alt />
          </div>
          <div class="r-user">
            <p>{{item.user.nickname}}</p>
            <div>{{item.content}}</div>
            <p class="r-time">{{item.time|timeFilter}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["playId"],
  data() {
    return {
      userComment: [] //评论信息
    };
  },
  methods: {
    //获取评论
    getComment() {
      if (this.playId) {
        this.$axios({
          url: API.comment,
          method: "get",
          params: {
            id: this.playId,
            limit: 10
          }
        }).then(res => {
          //   console.log(res);
          this.userComment = res.data.hotComments;
          console.log(this.userComment);
        });
      }
    }
  },
  components: {},
  mounted() {
    this.getComment();
  }
};
</script>
<style lang='less' scoped>
.comment-box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 1rem 0 0 0;
  background: rgba(0, 0, 0, 0.5);
  .comment {
    width: 80%;
    height: 80%;
    color: #fff;
    text-align: center;
    overflow-y: scroll;
    margin: 0.1rem auto;
    li {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      border: 1px solid;
      background: #fff;
      border-radius: 0.4rem;
      margin-bottom: 0.15rem;
      position: relative;
      .l-user {
        width: 20%;
        img {
          width: 100%;
          border-radius: 50%;
          margin-top: 0.15rem;
        }
      }
      .r-user {
        width: 70%;
        p {
          text-align: left;
          font-size: 0.25rem;
          font-weight: bold;
          color: #a89663;
          margin-bottom: 0.1rem;
          .r-time {
            text-align: right;
          }
        }
        div {
          text-align: left;
          color: #666666;
          font-size: 0.14rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .r-time {
          color: #666666;
          font-size: 0.14rem;
          font-weight: normal;
          position: absolute;
          right: 0.2rem;
          bottom: 0;
        }
      }
    }
  }
}
</style>