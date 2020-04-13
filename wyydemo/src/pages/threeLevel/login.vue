<template>
  <div class="login-box">
    <h2 class="login-title">手机号登录</h2>
    <div class="login">
      <h3>输入手机号获取验证码</h3>
      <!-- 手机号 -->
      <van-field
        class="login-ipt"
        v-model="user.tel"
        type="number"
        label="手机号 :"
        placeholder="请输入手机号"
      />
      <!-- 密码 -->
      <van-field
        class="login-ipt"
        v-model="user.password"
        type="password"
        label="密码 :"
        placeholder="请输入密码"
      />
      <!-- 验证码 -->
      <van-field class="login-ipt" v-model="verifyText" label="验证码 :" placeholder="输入有效验证码" />
      <van-button class="login-btn" type="primary" size="small" v-if="show" @click.self="send">发送验证码</van-button>
      <van-button
        class="login-btn"
        loading
        type="primary"
        loading-type="spinner"
        size="small"
        disabled
        v-else
      />
      <!-- 提示 -->
      <p class="login-num" v-if="!show">{{num}}s&nbsp;后可重新发送验证码</p>
      <!-- 登录 -->
      <van-button
        class="login-btn2"
        @click="verify"
        color="linear-gradient(to right, #e33333, #c20c0c)"
      >登录</van-button>
    </div>
  </div>
</template>
<script>
import API from "@/util/api";
export default {
  props: ["String"],
  data() {
    return {
      user: {
        tel: "", //手机号
        password: "" //密码
      },
      verifyText: "", //验证码
      show: true,
      num: 60 //计时器
    };
  },
  methods: {
    //发送验证码
    send() {
      if (this.user.tel !== "") {
        this.$axios({
          url: API.send,
          method: "get",
          params: {
            phone: this.user.tel
          }
        }).then(res => {
          console.log(res);
        });
        this.show = false;
        var time = setInterval(() => {
          this.num--;
          if (this.num == 0) {
            this.show = true;
            this.num = 60;
            clearInterval(time);
          }
        }, 1000);
      } else {
        this.$toast.fail("手机号不能为空");
      }
    },
    //验证验证码
    verify() {
      if (
        this.verifyText !== "" &&
        this.user.tel !== "" &&
        this.user.password !== ""
      ) {
        this.$axios({
          url: API.verify,
          method: "get",
          params: {
            phone: this.user.tel,
            captcha: this.verifyText
          }
        }).then(res => {
          console.log(res.data.code);
          if (res.data.code == 200) {
            this.login();
          }
        });
        console.log("111");
      } else {
        this.$toast.fail("手机号或密码或验证码不能为空");
      }
    },
    //登录
    login() {
      this.$axios({
        url: API.login,
        method: "get",
        params: {
          phone: this.user.tel,
          password: this.user.password
        }
      }).then(res => {
        console.log(res.data.code);
        if (res.data.code == 200) {
          this.$toast.success("登录成功");
          localStorage.setItem("userId", res.data.account.id);
          this.$router.replace("/home/myPage/user",()=>{});
        } else {
          this.$toast.fail("登录失败");
        }
      });
    }
  },
  components: {},
  mounted() {},
  activated() {}
};
</script>
<style lang='less' scoped>
.login-box {
  width: 100%;
  height: 100%;
}
.login-title {
  text-align: center;
  font-size: 0.5rem;
  color: #333;
  margin-top: 2rem;
}
// 登录框
.login {
  width: 80%;
  height: 4.5rem;
  margin: 0.2rem auto;
  position: relative;
  top: 15%;
  // 输入框
  .login-ipt {
    width: 100%;
    border-radius: 0.2rem;
    margin-top: 0.2rem;
  }
  // 获取验证码
  .login-btn {
    position: absolute;
    width: 1.6rem;
    right: 0.1rem;
    bottom: 1.32rem;
    border-radius: 0.1rem;
  }
  p {
    margin-top: 0.1rem;
    text-align: right;
    color: #fff;
  }
  h3 {
    color: #333;
    text-align: center;
    font-size: 0.3rem;
  }
  //登录按钮
  .login-btn2 {
    width: 100%;
    position: absolute;
    bottom: 0;
    border-radius: 0.4rem;
    touch-action: none;
  }
}
</style>