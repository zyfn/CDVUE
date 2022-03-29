import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:''
  },

  // 获取属性的状态
  getters: {
    isLoggedIn: state => !!state.user,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    login(state,user) {
      state.user = user;
      let newUser=JSON.stringify(user);
      sessionStorage.setItem('user', newUser);
    },
    logout(state){
      sessionStorage.removeItem('user')
      state.user=''
    }
  },

  // 应用mutations
  actions: {
    //获取登录状态
    Login({commit}, user) {
      commit("login", user)
    },
    Logout({ commit, state }){
      commit('logout')
    }
  }
})
