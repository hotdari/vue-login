import Vue from "vue"
import Vuex from "vuex"
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUser: [
      {
        id: 1,
        name: "hoza",
        email: "hotdari90@naver.com",
        password: "12345"
      },
      {
        id: 2,
        name: "hozad",
        email: "hotdari90@gmail.com",
        password: "12345"
      }
    ],
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    // 로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    }
  },
  actions: {
    // 로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null
      state.allUser.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user
      })
      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit("loginError")
      else {
        commit("loginSuccess", selectedUser)
        router.push({ name: "mypage" })
      }
    }
  },
  modules: {}
})
