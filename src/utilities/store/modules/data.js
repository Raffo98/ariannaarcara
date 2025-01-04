//this file  take care of calling dataLayer and rearrange data for each component

import dal from "../../dashboardDataMgt/dataLayer";
import dh from "../../dashboardDataMgt/dataHelper";

//END CONTENT IMPORT

const state = {
  itemData: [],
  itemDataByLang: []
};

const mutations = {
  setItemData(state, { data }) {
    state.itemData = data;
  },
  setItemDataByLang(state, { data }) {
    state.itemDataByLang = data;
  }
};

const getters = {
  itemData: state => state.itemData,
  itemDataByLang: state => state.itemDataByLang
};

//other store actions
const loaderAction = { root: true };

const actions = {
  //MAIN

  async getItemData({ commit, rootGetters, dispatch }, payload = {}) {
    // dispatch loader visible!
    dispatch(
      "loaders/setLoader",
      { value: true, field: "itemData" },
      loaderAction
    );

    // get UI current state
    const filters = dh.getUiState(rootGetters);

    //if UI notify that is needed to refresh data then paylod.apiget is true, the default is false
    const apiGet = payload.apiGet || false;

    // get data by UI current state
    let data = await dal.fetchItemData(filters, apiGet);

    //commit data and/or dispatch other action (e.g do some calculation and then set it to another data props)
    commit("setItemData", { data });
    
    //mock post processing filters
    dispatch("filterByLanguage", data);

    //data are committed dispatch loader hidden!
    dispatch(
      "loaders/setLoader",
      { value: false, field: "itemData" },
      loaderAction
    );
  },
  filterByLanguage({ commit, rootGetters }, data) {
    const filters = dh.getUiState(rootGetters);
    data = data.filter(x => x.lang === filters.language);

    commit("setItemDataByLang", { data });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
