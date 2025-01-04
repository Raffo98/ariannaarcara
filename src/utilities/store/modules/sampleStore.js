const state = {
  count: 0
};

const mutations = {
  increment(state, n) {
    state.count += n;
  }
};

const getters = {
  count: state => state.count
};

const actions = {
  increment({ commit }) {
    commit("increment", 1);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
