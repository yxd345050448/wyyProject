<template>
  <div class="user-minbox">
    <div v-if="collectArr.length>0">
      <h3>我收藏的歌手</h3>
      <!-- 歌手列表 -->
      <div class="collect-list">
        <ul>
          <li class="list-item" v-for="item in collectArr" :key="item.id">
            <img :src="item.picUrl" alt />
            <div class="item-text">
              <p class="item-title">{{item.name}}</p>
              <p class="item-message">
                <span>专辑:{{item.albumSize}}&nbsp;</span>
                <span>MV:{{item.mvSize}}</span>
              </p>
            </div>
            <div>
              <van-icon
                class="item-icon"
                name="ellipsis"
                size="0.4rem"
                @click.self="show(item.id,item.name)"
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
          <p>歌手:&nbsp;{{singerName}}</p>
          <hr />
          <!-- 取消收藏按钮 -->
          <div class="delete-btn" @click="cancelCollect">
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
      collectArr: [], //歌手列表
      isShow: false, //显隐弹出
      singerId: "", //歌手id
      singerName: "" //歌手名
    };
  },
  methods: {
    //获取收藏的歌手
    getCollect() {
      this.$axios({
        url: API.collectList
      }).then(res => {
        this.collectArr = res.data.data;
        // console.log(res);
      });
    },
    //取消收藏
    cancelCollect() {
      this.$dialog
        .confirm({
          title: "取消收藏",
          message: "确定要取消收藏吗？"
        })
        .then(() => {
          // on confirm 如果点了确定
          if (this.singerId) {
            this.$axios({
              url: API.cancelCollect,
              method: "get",
              params: {
                id: this.singerId,
                t: ""
              }
            }).then(res => {
              if (res.data.code == 200);
              this.getCollect(); // 重新渲染列表,有bug,服务器响应慢
              this.$toast.success("取消成功");
              this.isShow = false;
            });
          }
        })
        .catch(() => {
          // on cancel
          this.isShow = false;
        });
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
    console.log("222");
    this.getCollect();
  },
  activated() {
    this.getCollect();
  }
};
</script>
<style lang='less' scoped>
.user-minbox {
  h3 {
    text-align: center;
  }
  //歌手列表
  .collect-list {
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
  // 底部弹出层
  .popup {
    .delete {
      // border: 1px solid;
      width: 80%;
      margin: 1rem auto 0 auto;
      p {
        font-size: 0.3rem;
        color: #333;
      }
      // 按钮
      .delete-btn {
        margin-top: 0.3rem;
        color: #333;
        .icon-shanchu {
          font-size: 0.35rem;
        }
      }
    }
  }
}
</style>