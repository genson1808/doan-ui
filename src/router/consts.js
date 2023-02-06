// path
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const OVERVIEW_PATH = "/overview";
export const FEE_PLAN_PATH = "/feePlan";
export const FPLAN_PROCESS_PATH = "/feePlan/process";
export const FPLAN_FEE_LIST_PATH = "/feePlan/feeList";
export const FPLAN_FEE_REGISTRATION_PERIOD_PATH =
  "/feePlan/feeRegistrationPeriod";
export const FPLAN_FEE_REGISTRATION_PATH = "/feePlan/feeRegistration";
export const FPLAN_FEE_EXEMPTION_PATH = "/feePlan/feeExamption";
export const FPLAN_FEE_PRICE_POLICY_PATH = "/feePlan/feePricePolicy";

export const FEE_MANAGEMENT_PATH = "/feeManagement";
export const INVOICE_MANAGEMENT_PATH = "/invoiceManagement";
export const FEE_LEDGER_PATH = "/feeLedger";
export const REPORT_PATH = "/reportLedger";
export const FEE_REGISTER_PAYMENT_ONLINE_PATH = "/feeRegisterPaymentOnline";
export const SYSTEM_PATH = "/system";
export const TRAINING_EMIS_PATH = "/trainingEmis";

// Name
export const HOME_NAME = "home";
export const LOGIN_NAME = "login";
export const OVERVIEW_NAME = "overview";
export const FEE_PLAN_NAME = "feePlan";
export const FPLAN_PROCESS_NAME = "feePlan-process";
export const FPLAN_FEE_LIST_NAME = "feePlan-feeList";
export const FPLAN_FEE_REGISTRATION_PERIOD_NAME =
  "feePlan-feeRegistrationPeriod";
export const FPLAN_FEE_REGISTRATION_NAME = "feePlan-feeRegistration";
export const FPLAN_FEE_EXEMPTION_NAME = "feePlan-feeExamption";
export const FPLAN_FEE_PRICE_POLICY_NAME = "feePlan-feePricePolicy";

export const FEE_MANAGEMENT_NAME = "feeManagement";
export const INVOICE_MANAGEMENT_NAME = "invoiceManagement";
export const FEE_LEDGER_NAME = "feeLedger";
export const REPORT_NAME = "reportLedger";
export const FEE_REGISTER_PAYMENT_ONLINE_NAME = "feeRegisterPaymentOnline";
export const SYSTEM_NAME = "system";
export const TRAINING_EMIS_NAME = "traningEmis";

export const MenuItems = [
  {
    id: 0,
    iconSrc: "ic_TongQuan_32",
    text: "Tổng quan",
    name: OVERVIEW_NAME,
  },
  {
    id: 1,
    iconSrc: "ic_LapKeHoachThu_32",
    text: "Lập kế hoạch thu",
    name: FEE_PLAN_NAME,
    submenu: [
      {
        id: 0,
        text: "Quy trình",
        name: FPLAN_PROCESS_NAME,
      },
      {
        id: 1,
        text: "Lập danh sách khoản thu",
        name: FPLAN_FEE_LIST_NAME,
      },
      {
        id: 2,
        text: "Phụ huynh đăng ký",
        name: FPLAN_FEE_REGISTRATION_PERIOD_NAME,
      },
      {
        id: 3,
        text: "Đăng ký khoản thu",
        name: FPLAN_FEE_REGISTRATION_NAME,
      },
      {
        id: 4,
        text: "Danh sách miễn giảm",
        name: FPLAN_FEE_EXEMPTION_NAME,
      },
      {
        id: 5,
        text: "Danh sách áp dụng chính sách giá",
        name: FPLAN_FEE_PRICE_POLICY_NAME,
      },
    ],
  },
  {
    id: 2,
    iconSrc: "ic_QuanLyThu_32",
    text: "Quản lý thu",
    name: FEE_MANAGEMENT_NAME,
  },
  {
    id: 3,
    iconSrc: "ic_HoaDon_32",
    text: "Quản lý hóa đơn",
    name: INVOICE_MANAGEMENT_NAME,
  },
  {
    id: 4,
    iconSrc: "ic_SoThu_32",
    text: "Sổ phải thu, phải trả",
    name: FEE_LEDGER_NAME,
  },
  {
    id: 5,
    iconSrc: "ic_BaoCao_32",
    text: "Báo cáo",
    name: REPORT_NAME,
  },
  {
    id: 6,
    iconSrc: "ic_paymentgateway",
    text: "Thanh toán online",
    name: FEE_REGISTER_PAYMENT_ONLINE_NAME,
  },
  {
    id: 7,
    iconSrc: "ic_HeThong_32",
    text: "Hệ thống",
    name: SYSTEM_NAME,
  },
];
