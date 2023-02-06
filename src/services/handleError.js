import store from "@/store";

import * as rs from "@/resources/resources.vi";
import * as acs from "@/store/modules/consts.js";

export const handleError = (res) => {
  // const store = useStore();
  const statusCode = res.status;
  const rx5xx = /^5\d{2}/g;
  const rx2xx = /^2\d{2}/g;
  const rx4xx = /^4\d{2}/g;

  if (statusCode.toString().match(rx5xx)) {
    let msg = rs.COMMON_ERR;
    if (res.data.UserMsg) {
      msg = res.data.UserMsg;
    }
    store.dispatch(acs.ADD_TOAST_ACTION, {
      title: rs.TOAST_TITLE_ERROR,
      type: rs.TOAST_TYPE_ERROR,
      message: msg,
    });
  }

  if (statusCode.toString().match(rx2xx)) {
    store.dispatch(acs.ADD_TOAST_ACTION, {
      title: rs.TOAST_TITLE_SUCCESS,
      type: rs.TOAST_TYPE_SUCCESS,
      message: rs.COMMON_SUCCESS,
    });
  }

  if (statusCode.toString().match(rx4xx)) {
    let msg = [];
    if (res.data.UserMsg) {
      msg.push(res.data.UserMsg);
      for (const [key, value] of Object.entries(res.data.MoreInfo)) {
        msg.push(value);
      }
    } else {
      msg.push(rs.COMMON_ERR);
    }
    store.dispatch(acs.SET_ERRORS_ACTION, msg);
  }
};
