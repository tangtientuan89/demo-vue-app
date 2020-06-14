const state = () => ({
  dataTodo: "",
  editData: ""
});
const getters = {};
const mutations = {
  getDataTodo(state, payload) {
    state.dataTodo = payload;
    console.log("getDataTodo", state.dataTodo);
  },
  editDataTodo(state, payload) {
    state.editData = payload;
    console.log("editdata", state.editData);
  }
};
const actions = {
  getDataTodo(context, payload) {
    context.commit("getDataTodo", payload);
  },
  editDataTodo(context, payload) {
    context.commit("editDataTodo", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
