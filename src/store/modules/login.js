import Vue from "vue";
const state = () => ({
  isLogin: false
});

const getters = {};
const mutations = {
  isLogin(state) {
    if (Vue.$cookies.get("token")) {
      console.log("state ", state.isLogin);
      return state.isLogin= true 
    } else {
      return  state.isLogin= false ;
    }
  }
};
const actions = {
  isLogin(context) {
    context.commit("isLogin");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
