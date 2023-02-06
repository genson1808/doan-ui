//--------------------------- actions -------------------------------
// department
export const GET_STUDENTS_ACTION = "getStudents";
export const SET_STUDENTS_MUTATION = "SET_STUDENTS";

export const GET_FEES_ACTION = "getFees";
export const SET_FEES_MUTATION = "SET_FEES";

export const GET_POLICIES_ACTION = "getPolicies";
export const SET_POLICIES_MUTATION = "SET_POLICIES";

export const GET_FEE_EXEMPTIONS_ACTION = "getFeeExemptions";
export const SET_FEE_EXEMPTIONS_MUTATION = "SET_FEE_EXEMPTIONS";

export const GET_FEE_EXEMPTIONS_PAGING_ACTION = "getFeeExemptionPaging";
export const GET_FEE_EXEMPTIONS_BY_STUDENT_ID_ACTION =
  "getFeeExemptionByStudentID";
export const SET_PAGING_MUTATION = "SET_PAGING";
export const UPDATE_PAGING_ACTION = "updatePaging";
export const REMOVE_FEE_EXEMPTION_ACTION = "removeExemption";
export const REMOVE_FEE_EXEMPTIONS_ACTION = "removeExemptions";
export const UPDATE_FEE_EXEMPTIONS_ACTION = "updateFeeExemptions";
export const SET_STUDENT_ID_MUTATION = "SET_STUDENT_ID_SELECTED";
export const SET_STUDENT_ID_ACTION = "setStudentIdSelected";
export const SET_NOTICES_MUTATION = "SET_NOTICES";
export const SET_NOTICES_ACTION = "setNotices";
export const GET_SAMPLE_FILE_ACTION = "getSampleFile";

export const GET_IP_ACTION = "getIP";
export const SET_IP_MUTATION = "SET_IP";

export const SET_YEAR_SELECTED_ID_MUTATION = "SET_YEAR_SELECTED_ID";
export const UPDATE_YEAR_SELECTED_ACTION = "updateYearSelectedID";
// room
export const GET_ROOMS_ACTION = "getRooms";

// subject
export const GET_SUBJECTS_ACTION = "getSubjects";

// employee
export const GET_EMPLOYEES_ACTION = "getEmployees";
export const REMOVE_EMPLOYEES_ACTION = "removeEmployees";
export const REMOVE_EMPLOYEE_ACTION = "removeEmployee";
export const LOAD_EMPLOYEES_ACTION = "loadEmployees";
export const CREATE_EMPLOYEE_ACTION = "createEmployee";
export const UPDATE_EMPLOYEE_ACTION = "updateEmployee";
export const SET_PAGING_ACTION = "setPaging";
export const RELOAD_PAGING_ACTION = "reloadPaging";
export const GET_RECOMMEND_CODE_ACTION = "getRecommendCode";
export const EXPORT_EMPLOYEE_ACTION = "exportEmployees";

// global
export const SET_LOADING_ACTION = "setLoading";
export const ADD_TOAST_ACTION = "addToast";
export const SET_ERRORS_ACTION = "setErrors";
export const CLEAR_TOAST_ACTION = "clearToast";
export const SET_NO_DATA_ACTION = "setNoData";
export const SET_COLLAPSED_ACTION = "setCollapsed";

//--------------------------- actions -------------------------------

//--------------------------- mutations-------------------------------
// employee
export const GET_EMPLOYEES_MUTATION = "GET_EMPLOYEES";
export const SET_RECOMMEND_CODE_MUTATION = "SET_RECOMMEND_CODE";
export const SET_EMPLOYEES_MUTATION = "SET_EMPLOYEES";

// global
export const SET_ERRORS_MUTATION = "SET_ERRORS";
export const ADD_TOAST_MUTATION = "ADD_TOAST";
export const CLEAR_TOAST_MUTATION = "CLEAR_TOAST";
export const SET_NO_DATA_MUTATION = "SET_NO_DATA";
export const SET_LOADING_MUTATION = "SET_LOADING";
export const SET_COLLAPSED_MUTATION = "SET_COLLAPSED";

// department
export const SET_DEPARTMENTS_MUTATION = "SET_DEPARTMENTS";

// room
export const SET_ROOMS_MUTATION = "SET_ROOMS";

// subject
export const SET_SUBJECTS_MUTATION = "SET_SUBJECTS";

//--------------------------- mutations-------------------------------

//--------------------------- getters -------------------------------
// employee
export const GETTER_GET_EMPLOYEES = "employees";
export const GETTER_PAGING = "employeePaging";
export const GETTER_GET_RECOMMEND_CODE = "recommendCode";

// global
export const GETTER_LOADING = "isLoading";
export const GETTER_TOASTS = "toasts";
export const GETTER_NO_DATA = "noData";
export const GETTER_ERRORS = "errs";
export const GETTER_COLLAPSED = "collapsed";

// department
export const GETTER_DEPARTMENTS = "departments";

// room
export const GETTER_ROOMS = "rooms";

// subject
export const GETTER_SUBJECTS = "subjects";

//--------------------------- getters -------------------------------

export const BASE_URL = "http://128.199.94.149:8089";
