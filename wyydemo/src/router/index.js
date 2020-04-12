import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//解决块双击报错Uncaught (in promise) 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const home = () => import("@/pages/home.vue");                      //首页
const list = () => import("@/pages/list.vue");                      //列表页
const search = () => import("@/pages/search.vue");                  //搜索
const recommend = () => import("@/pages/twoLevel/recommend.vue");   //推荐榜
const top = () => import("@/pages/twoLevel/top.vue");               //排行榜
const play = () => import("@/pages/play.vue");                      //播放页 
const myPage = () => import("@/pages/twoLevel/myPage.vue");         //我的
const more = () => import("@/pages/twoLevel/more.vue");             //更多
const login = () => import("@/pages/threeLevel/login.vue");         //登录
const user = () => import("@/pages/threeLevel/user.vue");           //用户
const userSong = () => import("@/pages/fourLevel/userSong.vue")     //用户歌单
const collect = () => import("@/pages/fourLevel/collect.vue")       //我的收藏
const like = () => import("@/pages/fourLevel/like.vue")             //我喜欢的
const attention = ()=>import("@/pages/fourLevel/attention.vue")     //我的关注
const routes = [
  {
    path: "/home",
    component: home,
    children: [
      {
        path: "recommend",
        name: "推荐榜",
        component: recommend
      },
      {
        path: "top",
        name: "排行榜",
        component: top
      },
      {
        path: "myPage",
        component: myPage,
        children: [
          {
            path: 'login',
            component: login,
            name: "登录"
          },
          {
            path: 'user',
            component: user,
            children: [
              {
                path: "userSong",
                component: userSong
              },
              {
                path: "collect",
                component: collect
              },
              {
                path: "like",
                component: like
              },
              {
                path: "attention",
                component: attention
              },
              {
                path: "",
                redirect: "collect"
              }
            ]
          },
          {
            path: "",
            redirect: "user"
          }
        ]
      },
      {
        path: "more",
        name: "更多...",
        component: more
      },
      {
        path: "",
        redirect: "recommend"
      }
    ]
  },
  {
    path: "/list",
    name: "歌单",
    component: list
  },
  {
    path: "/search",
    name: "搜索",
    component: search
  },
  {
    path: "/play",
    name: "播放",
    component: play
  },
  {
    path: "*",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
