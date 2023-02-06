import axios from "axios";
import * as acs from "@/store/modules/consts";
import { handleError } from "@/services/handleError.js";
import { SET_STUDENT_ID_MUTATION } from "@/store/modules/consts";
import { HTTP } from "../../../services/axios";

const state = {
  feeExemptionList: [],
  studentIdSelected: "",
  paging: {
    pageNumber: 1,
    pageSize: 25,
    filters: [],
    sorts: [{ column: "fe.ModifiedDate", direction: "DESC" }],
  },
  periods: [
    {
      value: 0,
      label: "Cả năm",
    },
    {
      value: 1,
      label: "Học kỳ I",
    },
    {
      value: 2,
      label: "Học kỳ II",
    },
    {
      value: 3,
      label: "Tùy chọn",
    },
  ],
};

const mutations = {
  SET_FEE_EXEMPTIONS(state, payload) {
    state.feeExemptionList = payload;
  },
  SET_PAGING(state, payload) {
    state.paging = payload;
  },
  SET_STUDENT_ID_SELECTED(state, payload) {
    state.studentIdSelected = payload;
  },
};

const actions = {
  async getFeeExemptions({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.get(`FeeExemptions`);
      commit(acs.SET_FEE_EXEMPTIONS_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      // handleError(error.response);
    }
  },
  async getFeeExemptionPaging({ commit, state }) {
    try {
      const paging = state.paging;
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.post(`FeeExemptions/paging`, paging);
      commit(acs.SET_FEE_EXEMPTIONS_MUTATION, res.data.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.response);
    }
  },
  async removeExemption({ commit }, feeExemptionID) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.delete(`FeeExemptions/${feeExemptionID}`);
      handleError(res);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.response);
    }
  },
  async removeExemptions({ commit }, feeExemptionIDs) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.put(`FeeExemptions/MultiDelete`, {
        IDs: feeExemptionIDs,
      });
      handleError(res);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.response);
    }
  },
  async updatePaging({ commit }, paging) {
    commit(acs.SET_PAGING_MUTATION, paging);
  },
  async getFeeExemptionByStudentID({ commit }, studentId) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.post(`FeeExemptions/paging`, {
        filters: [{ column: "fe.StudentID", operator: "=", value: studentId }],
      });
      commit(acs.SET_LOADING_MUTATION, false);
      return res.data.data;
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(error.response);
    }
  },
  setStudentIdSelected({ commit }, id) {
    commit(SET_STUDENT_ID_MUTATION, id);
  },
  async updateFeeExemptions({ commit, state }, data) {
    try {
      const res = await HTTP.put(`FeeExemptions/multiple`, data);
      // handleError(res);
      commit(acs.SET_LOADING_MUTATION, false);
      handleError(res);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      debugger;
      handleError(error.response);
    }
  },
};

const getters = {
  feeExemptions: (state) => state.feeExemptionList,
  studentIdSelected: (state) => state.studentIdSelected,
  paging: (state) => state.paging,
  periods: (state) => state.periods,
};

const feeExemptionModule = {
  state,
  mutations,
  actions,
  getters,
};

export default feeExemptionModule;
