import Vue from "vue"
import Vuex from "vuex"
import router from "../router"
import axios from "axios"

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
    },
    //로그아웃
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
      localStorage.removeItem("access_token")
    }
  },
  actions: {
    // 로그인 시도
    login({ dispatch }, loginObj) {
      //로그인 -> 토큰반환
      axios
        .post("https://reqres.in/api/login", loginObj) //포스트 2번째 인자는 BODY의 파라메터를 가져올 수 있음
        .then(res => {
          // 성공 시 토큰 (실제로는 유저아이디 받아옴)
          // 해더에 포함하여 유저정보 요청
          let token = res.data.token
          // 토큰 -> 로컬스토리지에 저장
          localStorage.setItem("access_token", token)
          dispatch("getMemberInfo")
        })
        .catch(err => {
          // handle error
          console.log(err)
        })
      // let selectedUser = null
      // state.allUser.forEach(user => {
      //   if (user.email === loginObj.email) selectedUser = user
      // })
      // if (selectedUser === null || selectedUser.password !== loginObj.password)
      //   commit("loginError")
      // else {
      //   commit("loginSuccess", selectedUser)
      //   router.push({ name: "mypage" })
      // }
    },
    //로그아웃
    logout({ commit }) {
      commit("logout")
      router.push({ name: "home" })
    },
    getMemberInfo({ commit }) {
      // 로컬스토리지 토큰 -> 불러와서 사용
      let token = localStorage.getItem("access_token")
      let config = {
        // 헤더값을 설정할 수 있음
        headers: {
          "access-token": token
        }
      }
      axios
        .get("https://reqres.in/api/users/2", config) // GET방식은 config가 옴
        .then(response => {
          let userInfo = {
            id: response.data.data.id,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            avatar: response.data.data.avatar
          }
          commit("loginSuccess", userInfo)
        })
        .catch(error => {
          alert("이메일과 비밀번호를 확인하세요.")
          console.log(error)
        })
    }
  },
  modules: {}
})
