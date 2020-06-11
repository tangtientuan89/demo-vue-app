import Vue from 'vue'
import Vuex from 'vuex'
import login from "./modules/login";
import dataTodo from "./modules/dataTodo"
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login: login,
    dataTodo:dataTodo
  }
});

export default store;
