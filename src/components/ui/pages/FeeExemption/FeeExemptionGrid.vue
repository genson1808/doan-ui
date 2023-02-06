<template>
  <div class="wrapper">
    <div class="outer-wrapper">
      <div class="table-wrapper">
        <table class="table-data">
          <thead>
            <tr>
              <td title="Khoản thu" class="w" style="--w: 200">Khoản thu</td>
              <td title="Diện miễn giảm" class="w" style="--w: 250">
                Diện miễn giảm
              </td>
              <td title="Mức miễn giảm" class="w" style="--w: 180">
                Mức miễn giảm
              </td>
              <td title="Thời gian miễn giảm" class="w" style="--w: 150">
                Thời gian miễn giảm
              </td>
              <td title="Từ tháng">Từ tháng</td>
              <td title="Đến tháng">Đến tháng</td>
              <td class="w" style="--w: 29"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in data" :key="i">
              <td title="Khoản thu" @click="handle" class="w" style="--w: 200">
                <div class="wrapper--dropdown">
                  <BaseDropdown
                    :key="'fee-' + i"
                    :width="200"
                    :height="35"
                    :optionHeight="200"
                    v-model:value="r['feeID']"
                    key-for-value="feeID"
                    :options="feeList"
                    :props-mapping="['feeName']"
                    v-model:optionIndex="r['feeIndex']"
                    displayProperty="feeName"
                    :rounded="false"
                    :auto-hide-caret="true"
                  />
                </div>
              </td>
              <td title="Diện miễn giảm" class="w" style="--w: 250">
                <BaseDropdown
                  :key="'policy-' + i"
                  :width="250"
                  :height="35"
                  :optionHeight="200"
                  :options="policyList"
                  v-model:optionIndex="r['policyIndex']"
                  v-model:value="r['policyID']"
                  key-for-value="policyID"
                  :headers="['Diện miễn giảm', 'Mức miễn giảm', 'Loại']"
                  :props-mapping="['policyName', 'discountValue', 'policyType']"
                  :isMultipleColumn="true"
                  :hasShowHeader="true"
                  displayProperty="policyName"
                  :rounded="false"
                  :auto-hide-caret="true"
                />
              </td>
              <td title="Mức miễn giảm" class="w td-discount" style="--w: 180">
                <DiscountInput
                  :key="'discount-value-' + i"
                  v-model="r['discountValue']"
                  v-model:type="r['discountType']"
                />
              </td>
              <td title="Thời gian miễn giảm" class="w" style="--w: 150">
                <BaseDropdown
                  :width="150"
                  :height="35"
                  :drop-height="120"
                  :key="'period-' + i"
                  :options="periods"
                  v-model:optionIndex="r['periodIndex']"
                  v-model:value="r['period']"
                  key-for-value="value"
                  displayProperty="label"
                  :rounded="false"
                  :props-mapping="['label']"
                  :auto-hide-caret="true"
                />
              </td>
              <td class="for-p" title="Từ tháng">
                <DateFormat
                  :year1="yearSelected.value[0]"
                  :year2="yearSelected.value[1]"
                  v-model:value="r.startDate"
                  :period="r.period"
                  :isStart="true"
                />
              </td>
              <td title="Đến tháng">
                <DateFormat
                  :year1="yearSelected.value[0]"
                  :year2="yearSelected.value[1]"
                  v-model:value="r.toDate"
                  :period="r.period"
                  :is-start="false"
                />
              </td>
              <td class="w remove-outline" style="--w: 29" align="center">
                <div class="remove-btn pointer" @click="removeRow(i)"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div ref="addRef" class="add--row pointer" @click="addRow">
          <div class="add__btn">
            <div class="btn__icon"></div>
            Thêm miễn giảm
          </div>
        </div>
        <div class="no-data" v-show="!data.length">Không có dữ liệu...</div>
      </div>
    </div>
    <div class="bottom__bar">
      <div class="wrap__actions">
        <div
          tabindex="0"
          @keyup.enter.prevent="close"
          class="btn btn--white cancel"
          @click="handleClose"
        >
          Đóng
        </div>
        <div
          tabindex="0"
          @keyup.enter.prevent="save"
          class="btn btn--green save"
          @click="save"
        >
          Lưu
        </div>
      </div>
    </div>
  </div>
  <PopupConfirm
    :msg="ALERT_DATA_CHANGE"
    labelConfirm="Đồng ý"
    :handle-close="closeConfirm"
    v-model:show="showPopupCf"
    :handle-accept="confirmSave"
  />
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import BaseDropdown from "@/components/common/BaseDropdown.vue";
import { calculatePeriodStart, calculatePeriodTo } from "@/helper/helper.js";
import {
  ADD_TOAST_ACTION,
  GET_FEE_EXEMPTIONS_BY_STUDENT_ID_ACTION,
  SET_NOTICES_ACTION,
  UPDATE_FEE_EXEMPTIONS_ACTION,
} from "@/store/modules/consts.js";
import moment from "moment";
import { GUID_EMPTY, PERIOD_ANNUAL } from "@/resources/constants.js";
import DiscountInput from "@/components/ui/pages/FeeExemption/DiscountInput.vue";
import * as acs from "@/store/modules/consts.js";
import DateFormat from "@/components/ui/pages/FeeExemption/DateFormat.vue";
import {
  ALERT_DATA_CHANGE,
  FEE_OVERSLAP_MSG,
  NOT_BLANK,
  NOTICE_LABEL,
  REQUIRE_SELECT_STUDENT,
  TOAST_TYPE_WARNING,
} from "@/resources/resources.vi.js";
import PopupConfirm from "@/components/common/PopupConfirm.vue";

const props = defineProps({
  close: {
    type: Function,
    required: true,
  },
});

const store = useStore();
const dataChange = ref(false);

const feeList = computed(() => store.getters.fees);
const policyList = computed(() => store.getters.policies);

const periods = computed(() => store.getters.periods);
const yearSelected = computed(() => store.getters.yearSelected);

const data = ref([]);
let dataForDelete = [];
const studentIdSelected = computed(() => store.getters.studentIdSelected);

watch(studentIdSelected, async () => {
  if (studentIdSelected.value) {
    await getFeeExemption();
    dataForDelete = [];
  }
});

onMounted(async () => {
  await getFeeExemption();
});

async function getFeeExemption() {
  if (studentIdSelected.value) {
    let rs = await store.dispatch(
      GET_FEE_EXEMPTIONS_BY_STUDENT_ID_ACTION,
      studentIdSelected.value
    );
    rs.data.forEach(function (e, i) {
      e.feeIndex = i;
      e.policyIndex = i;
      e.periodIndex = i;
    });
    data.value = rs.data;
  }
}

const year1 = computed(() => yearSelected.value.value[0]);
const year2 = computed(() => yearSelected.value.value[1]);
const addRow = () => {
  data.value.push({
    feeIndex: -1,
    feeID: -1,
    policyIndex: -1,
    policyID: -1,
    periodIndex: 0,
    period: 0,
    discountValue: 0,
    startDate: calculatePeriodStart(PERIOD_ANNUAL, year1, year2),
    toDate: calculatePeriodTo(PERIOD_ANNUAL, year1, year2),
    feeExemptionID: GUID_EMPTY,
  });
  dataChange.value = true;
  scrollIntoView();
};

const removeRow = (index) => {
  let feeExemptionID = data.value[index]["feeExemptionID"];
  if (feeExemptionID && feeExemptionID !== GUID_EMPTY) {
    dataForDelete.push(feeExemptionID);
  }
  data.value.splice(index, 1);
  dataChange.value = true;
};

const showPopupCf = ref(false);
function handleClose() {
  if (dataChange.value) {
    showPopupCf.value = true;
  } else {
    dataForDelete = [];
    props.close();
  }
}

function closeConfirm() {
  dataForDelete = [];
  props.close();
}

function confirmSave() {
  save();
  props.close();
}

const addRef = ref(null);

/* Tính toán scroll dropdown */
async function scrollIntoView() {
  await nextTick();
  // addRef.value.scrollBy(0,1000)
  addRef.value.scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

const save = async () => {
  let rs = validate();
  if (rs) {
    const payLoad = {
      studentID: studentIdSelected.value,
      data: data.value.map((e) => {
        e.studentID = studentIdSelected.value;
        return e;
      }),
      dataForDelete,
    };
    await store.dispatch(UPDATE_FEE_EXEMPTIONS_ACTION, payLoad);
    await store.dispatch(acs.GET_FEE_EXEMPTIONS_PAGING_ACTION);
    dataForDelete = [];
    props.close();
  }
};

// validate list fee exemption
const validate = () => {
  if (!preValidate()) return false;
  for (let i = 0; i < data.value.length; i++) {
    let feeName = data.value[i].feeName;
    let start1 = moment(data.value[i].startDate).valueOf();
    let to1 = moment(data.value[i].toDate).valueOf();

    for (let j = i + 1; j < data.value.length; j++) {
      if (data.value[i].feeID === data.value[j].feeID) {
        let start2 = moment(data.value[j].startDate).valueOf();
        let to2 = moment(data.value[j].toDate).valueOf();
        let isOverlaps = dateRangeOverlaps(start1, to1, start2, to2);
        if (isOverlaps) {
          warningToast(FEE_OVERSLAP_MSG);
          return false;
        }
      }
    }
  }
  return true;
};

function preValidate() {
  let msg = "";
  if (!studentIdSelected.value || studentIdSelected.value == GUID_EMPTY) {
    store.dispatch(SET_NOTICES_ACTION, {
      show: true,
      label: NOTICE_LABEL,
      message: REQUIRE_SELECT_STUDENT,
    });
    return false;
  }
  for (let i = 0; i < data.value.length; i++) {
    let arrField = [];
    let feeName = data.value[i].feeName;
    let start1 = moment(data.value[i].startDate).valueOf();
    let to1 = moment(data.value[i].toDate).valueOf();
    let feeID = data.value[i].feeID;
    let policyID = data.value[i].policyID;
    let discountValue = data.value[i].discountValue;
    let period = data.value[i].period;

    if (feeID < 1) {
      data.value.splice(i, 1);
      i = i - 1;
      continue;
    }

    if (start1 >= to1) {
      warningToast(FEE_OVERSLAP_MSG);
      return false;
    }

    if (
      feeID >= 1 &&
      (policyID < 1 || !discountValue || discountValue <= 0 || !start1 || !to1)
    ) {
      if (policyID < 1) arrField.push("diện miễn giảm");
      if (!discountValue || discountValue <= 0) arrField.push("mức miễn giảm");
      if (!start1) arrField.push("từ tháng");
      if (!to1) arrField.push("đến tháng");
    }
    if (arrField.length) {
      msg = msg + "Thông tin " + arrField.join(", ");
    }
  }
  if (msg.length) {
    msg = msg + NOT_BLANK;

    store.dispatch(SET_NOTICES_ACTION, {
      show: true,
      label: NOTICE_LABEL,
      message: msg,
    });
    return false;
  }

  return true;
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

async function warningToast(msg) {
  await store.dispatch(ADD_TOAST_ACTION, {
    title: "MISA QLTH",
    type: TOAST_TYPE_WARNING,
    message: msg,
  });
}
</script>

<style lang="scss" scoped>
.wrapper--dropdown {
  &.has-error {
    border: 1px solid red;
    border-radius: 4px;
  }
}

.w {
  width: calc(1px * var(--w));
}

.wrap__discount {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-right: 10px;
  background-color: #fff;

  &:focus-within {
    border: 1px solid green;
  }

  .discount__ip {
    border: none;
    height: 32px;
    width: 150px;
    padding: 10px;
    outline: none;
  }
}

.wrapper {
  height: calc(100% - 70px);
}

.outer-wrapper {
  height: calc(100% - 100px);
  flex: 1;
  width: 100%;
  margin-top: 16px;
  border: 1px solid var(--line-gridpanel-color);
}

.table-wrapper {
  max-height: 100%;
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    max-width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 40px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #acacac;
    border-radius: 20px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }

  .add--row {
    width: 100%;
    height: 32px;
    border: 1px solid var(--line-gridpanel-color);
    color: #0997eb;
    display: flex;
    align-items: center;

    &:focus {
      border: 1px solid var(--green-border);
      outline: none;
    }

    .add__btn {
      display: flex;
      align-items: center;
      margin-left: 8px;

      .btn__icon {
        background-image: url(@/assets/Icons/ic_Plus_16.svg);
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }

  .no-data {
    color: #808080;
    padding: 10px;
  }
}

.table-data {
  // border-collapse: collapse;
  border-collapse: separate;
  min-width: max-content;
  width: 100%;
  table-layout: fixed;

  td:first-child,
  td:last-child {
    border-left: 0px;
  }

  thead {
    height: 32px;
    background-color: var(--header-gridpanel-color);
    font-family: OpenSans Semibold;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 2;

    tr {
      td {
        text-align: center;
        border-top: 0px;
      }

      td:first-child {
        padding-left: 5.5px;
      }
    }
  }

  tr:hover {
    background-color: #d1e6fd !important;
  }

  td {
    border: 0.5px solid var(--line-gridpanel-color);
    height: 100%;
  }

  tbody {
    tr {
      max-height: 32px !important;

      &.odd-row {
        background-color: #f5f6fa;
      }

      td {
        padding: 0 !important;

        .remove-btn {
          background-image: url(@/assets/Icons/ic_Remove.png);
          background-size: cover;
          background-repeat: no-repeat;
          width: 24px;
          height: 24px;

          &:hover {
            background-image: url(@/assets/Icons/ic_Remove_Hover.png);
          }
        }
      }

      td:nth-child(7) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      td:nth-child(6) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      td:last-child {
        width: 29px;
      }

      &.checked {
        background-color: #d1e6fd !important;
      }
    }
  }

  tr {
    td {
      vertical-align: middle;
    }
  }
}
.bottom__bar {
  margin-top: 15px;
  .wrap__actions {
    display: flex;
    justify-content: end;
    align-items: center;
  }

  .btn {
    width: 96px;
  }

  .save {
    &:focus {
      outline: none;
      border: 1px solid var(--green-border);
      background-color: var(--btn-green-hover);
    }
  }

  .cancel {
    margin-right: 8px;
    &:hover {
      color: #fff;
      background-color: #2f2e50;
    }
    &:focus {
      outline: none;
      border: 1px solid var(--green-border);
      color: #fff;
      background-color: #2f2e50;
    }
  }
}
</style>
