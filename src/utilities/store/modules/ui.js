//this file mange ui filters logic and take care to call dataAction to trigger data update (dataAction) when necessary

const state = {
  item: 'item1',
  language: 'it'
};

const mutations = {
  setItem(state, value) {
    state.item = value;
  },
  setLanguage(state, value) {
    state.language = value;
  }
};

const getters = {
  item: state => state.item,
  language: state => state.language
};

const dataAction = { root: true };
const actions = {
  setItem({ commit, dispatch }, value) {
    // if value really changed
    if (value !== state.item) {
      commit("setItem", value);

      // when new item is selected apiGet:true --> we need to ask for new data!
      dispatch("data/getItemData", { apiGet: true }, dataAction);
    }
  },
  setLanguage({ commit, dispatch }, value) {
    // if value really changed
    if (value !== state.item) {
      commit("setLanguage", value);
      
      //when language is selected apiGet:false --> data are already there, just need to filter them
      dispatch("data/getItemData", { apiGet: false }, dataAction);
    }
    state.language = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
