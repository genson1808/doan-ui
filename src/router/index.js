import * as cns from "@/router/consts";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import FeeExemption from "@/views/home/FeePlan/FeeExemption.vue";

const routes = [
  {
    path: cns.HOME_PATH,
    name: cns.HOME_NAME,
    component: HomeView,
    children: [
      { path: cns.SYSTEM_PATH, component: FeeExemption, name: cns.SYSTEM_NAME },
      { path: cns.REPORT_PATH, component: FeeExemption, name: cns.REPORT_NAME },
      {
        path: cns.OVERVIEW_PATH,
        component: FeeExemption,
        name: cns.OVERVIEW_NAME,
      },
      {
        path: cns.FEE_LEDGER_PATH,
        component: FeeExemption,
        name: cns.FEE_LEDGER_NAME,
      },
      {
        path: cns.FEE_MANAGEMENT_PATH,
        component: FeeExemption,
        name: cns.FEE_MANAGEMENT_NAME,
      },

      {
        path: cns.FEE_PLAN_PATH,
        component: FeeExemption,
        name: cns.FEE_PLAN_NAME,

        children: [
          {
            path: cns.FPLAN_PROCESS_PATH,
            component: FeeExemption,
            name: cns.FPLAN_PROCESS_NAME,
          },
          {
            path: cns.FPLAN_FEE_LIST_PATH,
            component: FeeExemption,
            name: cns.FPLAN_FEE_LIST_NAME,
          },
          {
            path: cns.FPLAN_FEE_REGISTRATION_PERIOD_PATH,
            component: FeeExemption,
            name: cns.FPLAN_FEE_REGISTRATION_PERIOD_NAME,
          },
          {
            path: cns.FPLAN_FEE_REGISTRATION_PATH,
            component: FeeExemption,
            name: cns.FPLAN_FEE_REGISTRATION_NAME,
          },
          {
            path: cns.FPLAN_FEE_EXEMPTION_PATH,
            component: FeeExemption,
            name: cns.FPLAN_FEE_EXEMPTION_NAME,
          },
          {
            path: cns.FPLAN_FEE_PRICE_POLICY_PATH,
            component: FeeExemption,
            name: cns.FPLAN_FEE_PRICE_POLICY_NAME,
          },
        ],
      },

      {
        path: cns.INVOICE_MANAGEMENT_PATH,
        component: FeeExemption,
        name: cns.INVOICE_MANAGEMENT_NAME,
      },
      {
        path: cns.FEE_REGISTER_PAYMENT_ONLINE_PATH,
        component: FeeExemption,
        name: cns.FEE_REGISTER_PAYMENT_ONLINE_NAME,
      },
      {
        path: cns.TRAINING_EMIS_PATH,
        component: FeeExemption,
        name: cns.TRAINING_EMIS_NAME,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
