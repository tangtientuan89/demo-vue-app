const state = () => {
  message: "";
};
const getters = {};
const mutations = {
  getDataError(state, payload) {
    state.message = payload;
  }
};
const actions = {
  getDataError(context, payload) {
    context.commit("getDataError", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
