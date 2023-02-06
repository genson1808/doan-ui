import axios from "axios";
import * as acs from "@/store/modules/consts.js";
import { HTTP } from "../../../services/axios";

const state = {
  policyList: [],
  paging: {
    pageNumber: 1,
    pageSize: 20,
    filters: {},
    sorts: {},
  },
};

const mutations = {
  SET_POLICIES(state, payload) {
    state.policyList = payload;
  },
};

const actions = {
  async getPolicies({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.get(`Policies`);
      commit(acs.SET_POLICIES_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      // handleError(error.response);
    }
  },
};

const getters = {
  policies: (state) => state.policyList,
};

const policyModule = {
  state,
  mutations,
  actions,
  getters,
};

export default policyModule;
