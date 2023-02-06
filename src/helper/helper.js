import moment from "moment";
import {
  MONEY_TYPE,
  PERCENT_SYMBOL,
  PERCENT_TYPE,
  PERIOD_OPTIONAL,
  PERIOD_SEMESTER_I,
  PERIOD_SEMESTER_II,
  PERIOD_ANNUAL,
  VIETNAM_DONG_SYMBOL,
} from "@/resources/constants.js";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { computed } from "vue";

export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const getFormatTypeValue = (type, value) => {
  if (type == PERCENT_TYPE) {
    return Number(value / 100).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
  }
  if (type == MONEY_TYPE) {
    let removeChar = value.toString().replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let rs = removeDot.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    return `${rs}${VIETNAM_DONG_SYMBOL}`;
  }
};
export const getFormatTypeValueRaw = (type, value) => {
  if (type == PERCENT_TYPE) {
    let val = Number(value / 100).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
    return val.toString().slice(0, val.toString().length - 1);
  }
  if (type == MONEY_TYPE) {
    let removeChar = value.toString().replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let rs = removeDot.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    return rs;
  }
};

export const calculatePeriodStart = (val, year, year2) => {
  switch (val) {
    case PERIOD_ANNUAL:
      return dayjs(`${year.value}/09/01`).format();
    case PERIOD_SEMESTER_I:
      return dayjs(`${year.value}/09/01`).format();
    case PERIOD_SEMESTER_II:
      return dayjs(`${year2.value}/01/01`).format();
  }
};

export const calculatePeriodTo = (val, year, year2) => {
  switch (val) {
    case PERIOD_ANNUAL:
      return dayjs(`${year2.value}/05/28`).format();
    case PERIOD_SEMESTER_I:
      return dayjs(`${year.value}/12/28`).format();
    case PERIOD_SEMESTER_II:
      return dayjs(`${year2.value}/05/28`).format();
  }
};

export const formatPeriodDate = (date) => {
  return dayjs(date).format("MM/YYYY");
};
