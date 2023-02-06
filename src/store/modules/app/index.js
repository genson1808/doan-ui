import * as acs from "@/store/modules/consts.js";
import { SET_YEAR_SELECTED_ID_MUTATION } from "@/store/modules/consts.js";
import { HTTPR } from "../../../services/axios";
import { SET_IP_MUTATION } from "../consts";

const state = {
  loading: false,
  toasts: [],
  errs: [],
  isCollapsed: false,
  yearSchoolList: [
    { label: "2021-2022", value: [2021, 2022] },
    { label: "2022-2023", value: [2022, 2023] },
    { label: "2023-2024", value: [2023, 2024] },
  ],
  yearSelectedID: 0,
  yearSelected: { label: "2021-2022", value: [2021, 2022] },
  notices: {
    show: false,
    message: "",
    label: "Thông báo",
  },
  IP: "",
};

const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERRORS(state, payload) {
    state.errs = payload;
  },
  ADD_TOAST(state, payload) {
    state.toasts.push(payload);
  },
  CLEAR_TOAST(state, payload) {
    const index = state.toasts.findIndex((toast) => toast.title === payload); // find toast
    state.toasts.splice(index, 1); // remove toast from array
    state.toasts = [];
  },
  SET_COLLAPSED(state, payload) {
    state.isCollapsed = payload;
  },
  SET_YEAR_SELECTED_ID(state, payload) {
    state.yearSelectedID = payload;
    state.yearSelected = state.yearSchoolList[payload.value];
  },
  SET_NOTICES(state, payload) {
    state.notices = payload;
  },
  SET_IP(state, payload) {
    state.IP = payload;
  },
};

const actions = {
  setLoading({ commit }, isLoading) {
    commit(acs.GET_EMPLOYEES_MUTATION, isLoading);
  },
  setErrors({ commit }, errors) {
    commit(acs.SET_ERRORS_MUTATION, errors);
  },
  addToast({ commit }, toast) {
    commit(acs.ADD_TOAST_MUTATION, toast);
  },
  clearToast({ commit }, title) {
    commit(acs.CLEAR_TOAST_MUTATION, title);
  },
  setNoData({ commit }, { name, value }) {
    commit(acs.SET_NO_DATA_MUTATION, { name, value });
  },
  setCollapsed({ commit }, value) {
    commit(acs.SET_COLLAPSED_MUTATION, value);
  },
  updateYearSelectedID({ commit }, value) {
    commit(acs.SET_YEAR_SELECTED_ID_MUTATION, { name, value });
  },
  setNotices({ commit }, value) {
    commit(acs.SET_NOTICES_MUTATION, value);
  },
  async getIP({ commit }) {
    try {
      let res = await HTTPR.get();
      commit(SET_IP_MUTATION, res.data);
    } catch {}
  },
};

const getters = {
  isLoading: (state) => state.loading,
  toasts: (state) => state.toasts,
  noData: (state) => state.noData,
  errs: (state) => state.errs,
  collapsed: (state) => state.isCollapsed,
  yearSchoolList: (state) => state.yearSchoolList,
  yearSelectedID: (state) => state.yearSelectedID,
  yearSelected: (state) => state.yearSelected,
  notices: (state) => state.notices,
  IP: (state) => state.IP,
};

const appModule = {
  state,
  mutations,
  actions,
  getters,
};

export default appModule;
