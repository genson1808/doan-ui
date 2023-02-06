import { createStore } from "vuex";
import app from "@/store/modules/app";
import student from "@/store/modules/student";
import fee from "@/store/modules/fee";
import policy from "@/store/modules/Policy";
import feeExemption from "@/store/modules/feeExemption";

export default createStore({
  modules: {
    app,
    student,
    fee,
    policy,
    feeExemption,
  },
});
