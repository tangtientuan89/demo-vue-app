const state = () => {
  dataTodo: "";
};
const getters = {};
const mutations = {
  getDataTodo(state, payload) {
    state.dataTodo = payload;
    console.log("getDataTodo", state.dataTodo);
  }
};
const actions = {
  getDataTodo(context,payload) {
    context.commit("getDataTodo",payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
