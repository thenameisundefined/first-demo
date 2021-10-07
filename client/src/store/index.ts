import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const type = {
  SET_Auth: 'SET_Auth',
  SET_user: 'SET_user'
}
const state = {
  isAuth: false,
  user: {}
};
const mutations = {
  [type.SET_Auth](state, isAuth) {
    if (isAuth) {
      state.isAuth = true;
    }
    else {
      state.isAuth = false;
    }
  },
  [type.SET_user](state, user) {
    if (user) {
      state.user = user;
    } else {
      state.user = {};
    }
  }
};
const actions = {
  setAuth: ({commit}, isAuth) =>{
    commit(type.SET_Auth,isAuth);
  },
  setUser: ({commit},user) => {
    commit(type.SET_user,user);
  },
  clear: ({commit}) => {
    commit(type.SET_Auth,false);
    commit(type.SET_Auth,{});
  }
};
const getters = {
  isAuth: state => state.isAuth,
  user: state => state.user
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
