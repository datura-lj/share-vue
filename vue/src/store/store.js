import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  goodsList: [],
  timeNow: '00:00'
};

const mutations = {
  getTime (state, n) {
    const timer = setInterval(function(){
      n ++;
      state.timeNow = new Date(parseInt(n) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').substring(10);
    },1000);
  }
};

const getters = {
  timeNow: function (state) {
    return state.timeNow
  }
};

const actions = {
  getTime ({commit}, times) {
    commit('getTime', times);
  }
};

const moduleA = {
  state,
  mutations,
  getters,
  actions
}

export default new Vuex.Store({
  modules: {
    a: moduleA
  }
})
