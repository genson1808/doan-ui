import axios from "axios";
import * as acs from "@/store/modules/consts";
import { HTTP } from "../../../services/axios";

const state = {
  studentList: [],
  paging: {
    pageNumber: 1,
    pageSize: 20,
    filters: {},
    sorts: {},
  },
  recommendCode: "",
};

const mutations = {
  SET_STUDENTS(state, payload) {
    state.studentList = payload;
  },
  SET_PAGING(state, payload) {
    state.paging = payload;
  },
  SET_RECOMMEND_CODE(state, payload) {
    state.recommendCode = payload;
  },
};

const actions = {
  async getStudents({ commit }) {
    try {
      commit(acs.SET_LOADING_MUTATION, true);
      const res = await HTTP.get(`Students`);
      commit(acs.SET_STUDENTS_MUTATION, res.data);
      commit(acs.SET_LOADING_MUTATION, false);
    } catch (error) {
      commit(acs.SET_LOADING_MUTATION, false);
      // handleError(error.response);
    }
  },
};

const getters = {
  students: (state) => state.studentList,
};

const studentModule = {
  state,
  mutations,
  actions,
  getters,
};

export default studentModule;
