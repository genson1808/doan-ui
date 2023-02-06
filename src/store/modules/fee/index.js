import axios from "axios";
import * as acs from "@/store/modules/consts";
import { HTTP } from "../../../services/axios";

const state = {
  feeList: [],
  paging: {
    pageNumber: 1,
    pageSize: 20,
    filters: {},
    sorts: {},
  },
};

const mutations = {
  SET_FEES(state, payload) {
    state.feeList = payload;
  },
};

const actions = {
  async getFees({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.get(`Fees`);
      commit(acs.SET_FEES_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      // handleError(error.response);
    }
  },
};

const getters = {
  fees: (state) => state.feeList,
};

const feeModule = {
  state,
  mutations,
  actions,
  getters,
};

export default feeModule;
