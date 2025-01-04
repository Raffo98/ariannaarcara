// this file manage loaders for each datapiece
// the state keys are the same of data store module,
// a loader is shown when it's value is greater than 0

const state = {
  itemData: 0
};

const mutations = {
  setLoader(state, { value, field }) {
    let tmpCounter = state[field];
    if (value) {
      ++state[field];
    } else {
      state[field] = tmpCounter - 1 < 0 ? 0 : --state[field];
    }
  }
};

const getters = {
  itemData: state => state.itemData > 0
};

const actions = {
  setLoader({ commit }, { value, field }) {
    commit("setLoader", { value, field });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
