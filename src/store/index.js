import Vue from 'vue'
import Vuex from 'vuex'
import login from "./modules/login";
import dataTodo from "./modules/dataTodo"
import error from "./modules/error"
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login: login,
    dataTodo:dataTodo,
    error:error
  }
});

export default store;
