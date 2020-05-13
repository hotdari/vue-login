import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Mypage from "../views/Mypage.vue"
import store from "../store"

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    //이미 로그인 된 유저
    alert("이미 로그인을 하였습니다.")
    next("/")
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    //비로그인
    alert("로그인을 하여야 합니다.")
    next("/login")
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectAuthUser,
    component: Login
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: Mypage
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
