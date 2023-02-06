<template>
  <teleport to="#loading-container" :disabled="!show" v-if="show">
    <div class="overlay">
      <div class="popup">
        <div class="popup__header">
          <div class="popup__label">
            {{ isCreate ? "Thêm học sinh được miễn giảm" : "Sửa" }}
          </div>
          <div class="popup--close pointer" @click="close"></div>
        </div>
        <div class="popup__body">
          <div class="student__panel">
            <div class="form-group">
              <label class="required" for="">Học sinh</label>
              <div :class="notPickStudent ? 'has-error' : ''">
                <BaseDropdown
                  autofocus
                  :width="250"
                  :height="30"
                  :optionHeight="200"
                  :options="studentList"
                  v-model:optionIndex="selectedIndex"
                  :headers="['Họ tên', 'Ngày sinh', 'Lớp']"
                  :propsMapping="['studentName', 'dateOfBirth', 'className']"
                  :isMultipleColumn="true"
                  :hasShowHeader="true"
                  displayProperty="studentName"
                  :is-rounded="true"
                  :is-border="true"
                  background-color="#fff"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="">Ngày sinh</label>
              <input
                :value="
                  moment(studentSelected?.DateOfBirth)
                    .utc()
                    .format('DD/MM/YYYY')
                "
                class="dateOfBirth__ip"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="">Lớp</label>
              <input
                :value="studentSelected?.className"
                class="class__ip"
                disabled
              />
            </div>
          </div>
          <FeeExemptionGrid :close="close" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  ref,
  toRef,
  watch,
} from "vue";
import { useStore } from "vuex";
import * as cns from "@/store/modules/consts.js";
import BaseDropdown from "@/components/common/BaseDropdown.vue";
import moment from "moment/moment.js";
import FeeExemptionGrid from "@/components/ui/pages/FeeExemption/FeeExemptionGrid.vue";
import { SET_STUDENT_ID_ACTION } from "@/store/modules/consts.js";
import debounce from "@/helper/Debounce.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  isCreate: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:show"]);
const store = useStore();

const selectedIndex = ref(-1);
const studentList = computed(() => store.getters.students);
const studentSelected = computed(() => studentList.value[selectedIndex.value]);
const studentIdSelected = computed(() => store.getters.studentIdSelected);

// flag cho check student selected
const notPickStudent = ref(false);

// handle close form
const close = async () => {
  await store.dispatch(SET_STUDENT_ID_ACTION, "");
  emit("update:show", false);
};

// handle check student đã select chưa khi show form
// @author SONTB (30/12/2022)
watch(toRef(props, "show"), () => {
  if (props.show === true) {
    if (!studentIdSelected.value || !selectedIndex.value) {
      notPickStudent.value = true;
      selectedIndex.value = -1;
    }
  }
});

// theo dõi select student và update state cho global
// @author SONTB (30/12/2022)
watch(studentIdSelected, () => {
  getStudentId();
});

// Lắng nghe select student và dispatch update global
// @author SONTB (28/12/2022)
watch(selectedIndex, () => {
  if (selectedIndex.value) {
    notPickStudent.value = false;
  }
  if (
    studentSelected.value != null ||
    studentSelected.value ||
    typeof studentSelected.value != "undefined"
  ) {
    let id = studentSelected.value.studentID;
    if (id) {
      debounce(() => {
        store.dispatch(SET_STUDENT_ID_ACTION, id);
      }, 300)();
    }
  }
});

// Trước khi mount get students data từ back end
// @author SONTB (28/12/2022)
onBeforeMount(async () => {
  await store.dispatch(cns.GET_STUDENTS_ACTION);
});

// trước khi mounted thì update student index
// @author SONTB (28/12/2022)
onBeforeMount(() => {
  getStudentId();
});

// lấy student index trong list theo student id
// @author SONTB (28/12/2022)
function getStudentId() {
  if (studentIdSelected.value) {
    selectedIndex.value = studentList.value.findIndex(
      (e) => e.studentID === studentIdSelected.value
    );
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 10;

  .popup {
    position: absolute;
    top: calc(50% - 300px);
    left: calc(50% - 600px);
    // transform: translate(-50%, -50%);
    width: 1200px;
    height: 600px;
    background-color: #fff;
    border-radius: 4px;

    .popup__header {
      padding: 12px 12px;
      display: flex;
      justify-content: space-between;

      .popup__label {
        color: #575757;
        font-weight: 500;
        font-family: OpenSans Semibold;
        font-size: 18px;
        line-height: 22px;
        padding-left: 12px;
        padding-top: 12px;
      }

      .popup--close {
        background-image: url(@/assets/Icons/ic_close_16.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 16px;
        height: 17px;
      }
    }

    .popup__body {
      padding: 24px;
      width: 100%;
      height: 100%;

      .student__panel {
        display: flex;
        justify-content: start;

        .form-group {
          display: flex;
          flex-direction: column;
          margin-right: 6px;

          .has-error {
            border: 1px solid red;
            border-radius: 4px;
          }

          label {
            padding: 5px 0;
          }

          label.required::after {
            content: "*";
            color: #d94e37;
            position: absolute;
            margin-left: 2px;
          }

          input {
            height: 30px;
          }

          .dateOfBirth__ip {
            width: 98px;
          }

          .class__ip {
            width: 148px;
          }
        }
      }
    }
  }
}
</style>
