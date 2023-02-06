<template>
  <div class="wrapper">
    <div class="tool__bar">
      <div class="tool__left">
        <span class="view__label">Xem theo</span>
        <div class="radio__group">
          <div class="view__by__student">
            <label class="container">
              <input
                type="radio"
                value="view-by-student"
                checked="checked"
                name="view-by"
                v-model="viewBy"
              />
              <span class="checkmark"></span>
            </label>
            <span class="label">Học sinh </span>
          </div>
          <div class="view__by__fee">
            <label class="container">
              <input
                type="radio"
                value="view-by-fee"
                name="view-by"
                v-model="viewBy"
              />
              <span class="checkmark"></span>
            </label>
            <span class="label">Khoản thu </span>
          </div>
        </div>
      </div>
      <div class="tool__right">
        <div class="btn btn__add btn--green ml-8" @click="onCreate">Thêm</div>
        <div class="btn btn__quick_add btn--green ml-8">Thêm nhanh</div>
        <div
          class="btn btn__delete btn--white ml-8"
          @click="handleRemoveMulti"
        ></div>
        <div class="btn btn__print btn--white ml-8">
          <span class="icon__delete"></span>
        </div>
        <div class="btn btn__more btn--white ml-8">
          <span
            ref="moreInfoBtnRef"
            class="icon__more"
            @click="showMoreInfo = true"
          ></span>
          <MoreInfo
            :on-click-import="showImportData"
            ref="moreInfoRef"
            v-show="showMoreInfo"
          />
        </div>
      </div>
    </div>

    <div class="wrap-table">
      <BaseTableData
        v-model:selected="selectedExemptions"
        :has-checkbox="true"
        checkbox-bind="feeExemptionID"
        :headers="
          viewBy === VIEW_FEE_EXEMPTION_BY_FEE
            ? headersViewByFee
            : headersViewByStudent
        "
        :data="feeExemptions.data"
        :handle-edit-action="handleEdit"
        :handle-remove-action="handleRemove"
        :on-click-row="reselectItem"
        :on-double-click-row="handleEdit"
      />
    </div>
    <Paging
      v-model="paging.pageNumber"
      :total="feeExemptions.total"
      :page-size="paging.pageSize"
      :max-page="feeExemptions.maxPage"
    />
  </div>

  <FeeExemptionForm :is-create="isCreate" v-model:show="isShowForm" />
  <PopupConfirm
    v-model:show="showPopupCf"
    :handle-accept="
      () => {
        removeFeeExemptionConfirmed(itemToRemove);
      }
    "
  />
  <ImportData v-model:show="isShowImportData" />
</template>

<script setup>
import { computed, onBeforeMount, onMounted, provide, ref, watch } from "vue";
import FeeExemptionForm from "@/components/ui/pages/FeeExemption/FeeExemptionForm.vue";
import * as cns from "@/store/modules/consts.js";
import { useStore } from "vuex";
import BaseTableData from "@/components/common/BaseTableData.vue";
import {
  formatDate,
  formatPeriodDate,
  getFormatTypeValue,
} from "@/helper/helper.js";
import Paging from "@/components/common/Paging.vue";
import * as acs from "@/store/modules/consts.js";
import PopupConfirm from "@/components/common/PopupConfirm.vue";
import {
  PERIOD_ANNUAL,
  PERIOD_SEMESTER_I,
  PERIOD_SEMESTER_II,
  VIEW_FEE_EXEMPTION_BY_FEE,
  VIEW_FEE_EXEMPTION_BY_STUDENT,
} from "@/resources/constants.js";
import {
  SET_NOTICES_ACTION,
  SET_STUDENT_ID_ACTION,
  UPDATE_PAGING_ACTION,
} from "@/store/modules/consts.js";
import MoreInfo from "@/components/ui/pages/FeeExemption/MoreInfo.vue";
import { useClickOutside } from "@/use/useClickOutside.js";
import ImportData from "@/components/ui/pages/FeeExemption/ImportData.vue";
import {
  NOTICE_LABEL,
  REQUIRE_SELECT_EMPL_MSG,
  REQUIRE_SELECT_ITEM_MSG,
} from "@/resources/resources.vi.js";

// Sử dụng store để dispatch các actions
const store = useStore();
const isCreate = ref(false);

// Khởi tạo các biến reactive
const selectedExemptions = ref([]);
const itemToRemove = ref(null);
const isRemoveMulti = ref(false);
const isShowImportData = ref(false);

const viewBy = ref("view-by-student");

// Thiết lập một watcher cho biến viewBy
watch(viewBy, async () => {
  if (viewBy.value === VIEW_FEE_EXEMPTION_BY_STUDENT) {
    let newPaging = paging.value;
    newPaging.sorts = [{ column: "s.ModifiedDate", direction: "DESC" }];
    await store.dispatch(UPDATE_PAGING_ACTION, newPaging);
  } else if (viewBy.value === VIEW_FEE_EXEMPTION_BY_FEE) {
    let newPaging = paging.value;
    newPaging.sorts = [{ column: "f.ModifiedDate", direction: "DESC" }];
    await store.dispatch(UPDATE_PAGING_ACTION, newPaging);
  }
});

// Khởi tạo biến reactive show popup confirm
const showPopupCf = ref(false);

// Watcher theo dõi show popup
watch(showPopupCf, () => {
  if (showPopupCf.value === false) {
    itemToRemove.value = null;
    isRemoveMulti.value = false;
  }
});

// show popup import data
function showImportData() {
  isShowImportData.value = true;
}

// Biến reactive cho trạng thái show form create/edit fee exemption
const isShowForm = ref(false);
const showForm = () => {
  isShowForm.value = true;
};

function onCreate() {
  isCreate.value = true;
  showForm();
}

const feeExemptionSelected = ref(null);
provide("feeExemption", {
  feeExemptionSelected: feeExemptionSelected,
  clear: () => {
    feeExemptionSelected.value = null;
  },
  change: (val) => {
    feeExemptionSelected.value = val;
  },
});

// function được gọi khi click button edit
// item: object fee exemption
const handleEdit = (item) => {
  isCreate.value = false;
  store.dispatch(SET_STUDENT_ID_ACTION, item.studentID);
  isShowForm.value = true;
  reselectItem(item);
};

// function được gọi khi click button delete
const handleRemove = async (item) => {
  showPopupCf.value = true;
  itemToRemove.value = item;
  reselectItem(item);
};

const reselectItem = (item) => {
  selectedExemptions.value = [];
  selectedExemptions.value.push(item.feeExemptionID);
};

// Phương thức được gọi khi click button multi delete
const handleRemoveMulti = () => {
  if (!selectedExemptions.value.length) {
    store.dispatch(SET_NOTICES_ACTION, {
      show: true,
      label: NOTICE_LABEL,
      message: REQUIRE_SELECT_ITEM_MSG,
    });
  } else {
    isRemoveMulti.value = true;
    showPopupCf.value = true;
  }
};

// Xử lý khi chấp nhận xóa
const removeFeeExemptionConfirmed = async (item) => {
  if (null != item && isRemoveMulti.value === false) {
    await store.dispatch(cns.REMOVE_FEE_EXEMPTION_ACTION, item.feeExemptionID);
    await store.dispatch(cns.GET_FEE_EXEMPTIONS_PAGING_ACTION);
  } else if (isRemoveMulti.value === true) {
    await store.dispatch(
      cns.REMOVE_FEE_EXEMPTIONS_ACTION,
      selectedExemptions.value
    );
    await store.dispatch(cns.GET_FEE_EXEMPTIONS_PAGING_ACTION);
  }
  showPopupCf.value = false;
};

// get data từ store
const feeExemptions = computed(() => store.getters.feeExemptions);
const paging = computed(() => store.getters.paging);

// trước khi mount call api lấy data
onBeforeMount(async () => {
  await store.dispatch(cns.GET_STUDENTS_ACTION);
  await store.dispatch(cns.GET_FEES_ACTION);
  await store.dispatch(cns.GET_POLICIES_ACTION);
  await store.dispatch(cns.GET_FEE_EXEMPTIONS_PAGING_ACTION);
});

/**
 * theo dõi page thay đổi và load lại data
 * @author SOTB (21/12/2022)
 */
watch(
  paging,
  () => {
    store.dispatch(acs.GET_FEE_EXEMPTIONS_PAGING_ACTION);
  },
  { deep: true }
);

const showMoreInfo = ref(false);
const moreInfoRef = ref(null);
const moreInfoBtnRef = ref(null);

useClickOutside(moreInfoRef, moreInfoBtnRef, () => {
  showMoreInfo.value = false;
});

// Định nghĩa headers cho bảng hiển thị miễn giảm học phí theo học sinh
const headersViewByStudent = [
  {
    bind: "studentName",
    value: "Học sinh",
    tooltip: "Học sinh",
    handleClick: handleEdit,
    classStyle: ["w", "hyperlink"],
    style: ["--w: 196"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 196"],
  },
  {
    bind: "dateOfBirth",
    preprocessor: function (val) {
      return formatDate(val[this.bind]);
    },
    value: "Ngày sinh",
    tooltip: "Ngày sinh",
    align: "center",
    classStyle: ["w"],
    style: ["--w: 150"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 150"],
  },
  {
    bind: "className",
    value: "Lớp",
    tooltip: "Lớp",
    classStyle: ["w"],
    style: ["--w: 120"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 120"],
  },
  {
    preprocessor: function (val) {
      return getFormatTypeValue(val.discountType, val[this.bind]);
    },
    bind: "discountValue",
    value: "Mức miễn giảm",
    tooltip: "Mức miến giảm",
    align: "center",
    classStyle: ["w"],
    style: ["--w: 90"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 90"],
  },
  {
    preprocessor: false,
    bind: "feeName",
    value: "Khoản thu",
    tooltip: "Khoản thu",
    classStyle: ["w"],
    style: ["--w: 200"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 200"],
  },
  {
    preprocessor: (val) => {
      if (val.period === PERIOD_ANNUAL) {
        return "Cả năm";
      } else if (val.period === PERIOD_SEMESTER_I) {
        return "Học kỳ I";
      } else if (val.period === PERIOD_SEMESTER_II) {
        return "Học kỳ II";
      } else {
        return `${formatPeriodDate(val.startDate)} - ${formatPeriodDate(
          val.toDate
        )}`;
      }
    },
    bind: "",
    value: "Thời gian miễn giảm",
    tooltip: "Thời gian miễn giảm",
    classStyle: ["w"],
    style: ["--w: 150"],
    headerClassStyle: ["w"],
    hStyle: ["--w: 150"],
  },
  {
    preprocessor: false,
    bind: "policyName",
    value: "Diện miễn giảm",
    tooltip: "Diện miễn giảm",
  },
];

// Định nghĩa headers cho bảng hiển thị miễn giảm học phí theo khoản thu
const headersViewByFee = [
  {
    preprocessor: false,
    bind: "feeName",
    value: "Khoản thu",
    tooltip: "Khoản thu",
    classStyle: [],
  },
  {
    bind: "studentName",
    value: "Học sinh",
    tooltip: "Học sinh",
    classStyle: ["hyperlink"],
    handleClick: handleEdit,
  },
  {
    bind: "dateOfBirth",
    preprocessor: function (val) {
      return formatDate(val[this.bind]);
    },
    value: "Ngày sinh",
    tooltip: "Ngày sinh",
    align: "center",
  },
  {
    bind: "className",
    value: "Lớp",
    tooltip: "Lớp",
  },
  {
    preprocessor: function (val) {
      return getFormatTypeValue(val.discountType, val[this.bind]);
    },
    bind: "discountValue",
    value: "Mức miễn giảm",
    tooltip: "Mức miến giảm",
    align: "center",
  },
  {
    preprocessor: (val) => {
      if (val.period == PERIOD_ANNUAL) {
        return "Cả năm";
      } else if (val.period == PERIOD_SEMESTER_I) {
        return "Học kỳ I";
      } else if (val.period == PERIOD_SEMESTER_II) {
        return "Học kỳ II";
      } else {
        return `${formatPeriodDate(val.startDate)} - ${formatPeriodDate(
          val.toDate
        )}`;
      }
    },
    bind: "",
    value: "Thời gian miễn giảm",
    tooltip: "Thời gian miễn giảm",
  },
  {
    preprocessor: false,
    bind: "policyName",
    value: "diện miễn giảm",
    tooltip: "Diện miễn giảm",
  },
];
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 6px 12px 12px;
  height: calc(100% - 42px);
}
.wrap-table {
  height: calc(100vh - 148px);
  flex: 1;
  width: 100%;
  border-bottom: 1px solid var(--line-gridpanel-color);
}

.label__column {
  color: #000;
  margin-top: -1px;
  margin-bottom: 7px;
  text-align: center;
}

.cus-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool__bar {
  height: 33px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tool__left {
    display: flex;

    .view__label {
      margin-right: 26px;
      font-size: 13px;
    }

    .radio__group {
      display: flex;
      justify-content: center;

      .view__by__student {
        display: flex;
        margin-right: 8px;
        align-items: center;

        .label {
          padding-left: 4px;
        }
      }

      .view__by__fee {
        display: flex;

        .label {
          padding-left: 4px;
        }

        align-items: center;
      }
    }
  }

  .tool__right {
    display: flex;

    .ml-8 {
      margin-left: 8px;
    }

    .btn__delete {
      background-image: url(@/assets/Icons/ic_Delete_32.svg);
      background-size: cover;
      background-repeat: no-repeat;
      min-width: 32px;
      width: 32px;
      height: 32px;
      border: 0px;
    }

    .btn__print {
      min-width: 32px;
      height: 32px;

      .icon__delete {
        background: transparent url("@/assets/Icons/ic_sprites2.png") no-repeat -845px -450px !important;
        width: 20px !important;
        height: 18px;
      }
    }

    .btn__more {
      min-width: 32px;
      height: 32px;
      position: relative;

      .icon__more {
        width: 20px;
        height: 20px;
        background: url(@/assets/Icons/ic_More.png) -1106px -194px;
      }
    }
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.checkbox__btn {
  width: 20px;
  height: 20px;
}

.cb__icon {
  width: 20px;
  height: 20px;
  background-color: greenyellow;
}

/* radio custom */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-image: url(@/assets/Icons/ic_Ratio_inactive.svg);
  }

  & input:checked ~ .checkmark {
    background-image: url(@/assets/Icons/ic_Ratio_Active.svg);
  }
}

.ip__cb:checked + .cb__icon {
  background-image: url(@/assets/Icons/ic_Ratio_Active.svg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
}
</style>
