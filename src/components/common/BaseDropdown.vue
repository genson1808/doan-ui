<template>
  <div ref="dropdownRef" :style="{ width: width + 'px' }" class="FormSelect" @focus="isShowCaret = true">
    <!-- {{ options[optionIndex] }} -->
    <span :id="`${_uid}-label`">
      <!-- {{ label }} -->
    </span>
    <div @focus="isShowCaret = true" class="FormSelect__control"
      :class="[isRounded ? 'rounded' : '', isBorder ? 'border' : '']" :style="{
        width: width + 'px',
        height: height + 'px',
        backgroundColor: optionsVisible ? '#fff' : backgroundColor,
      }">
      <div class="FormSelect__selected__option" :style="{ 'max-height': height + 'px' }">
        <input @focusout="isShowCaret = false" @focus="isShowCaret = true" spellcheck="false" ref="buttonRef"
          :id="`${_uid}-button`" aria-haspopup="listbox" :aria-labelledby="`${_uid}-label ${_uid}-button`"
          :aria-expanded="optionsVisible" class="FormSelect__button ellipsis" @click="toggleOptions"
          @keyup.up.down.prevent="showOptions" @keyup.up.prevent="selectPrevOption"
          @keyup.down.prevent="selectNextOption" @keydown.enter.esc.prevent="reset" :value="displayOption" />
        <div v-show="autoHideCaret ? isShowCaret && autoHideCaret : true" @click="toggleOptions"
          class="icon-toggle pointer">
          <span><i class="fa-solid fa-angle-down"></i></span>
        </div>
      </div>
      <div v-show="optionsVisible" ref="optionsRef" class="tableFixHead" :style="{
        height: dropHeight + 'px',
        top: usingFixedStyle
          ? positionY + height + 'px'
          : 'calc( 100% + 2px)',
        left: usingFixedStyle ? positionX + 'px' : 0,
        position: usingFixedStyle ? 'fixed' : 'absolute',
      }">
        <table class="table" :style="{ minWidth: width + 'px' }">
          <thead v-if="hasShowHeader">
            <tr>
              <th v-for="(v, i) in tableHeaders" :key="i">
                {{ v }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, index) in options" :key="index" :id="`${_uid}-option-${index}`"
              :aria-selected="activeOptionIndex === index" :class="[
                activeOptionIndex === index && 'has-focus',
                index === optionIndex && 'selected',
              ]" class="FormSelect__option" role="option" ref="dropdownItems" @click="handleOptionClick(index)"
              @focus="setupFocus" @keyup.up.prevent="selectPrevOption" @keyup.down.prevent="selectNextOption"
              @keydown="search" @keydown.up.down.prevent @keydown.enter.esc.prevent="reset">
              <CellData :buildWithProps="buildWithProps" :propsMapping="propsMapping" :data="option" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CellData from "@/components/common/Dropdown/CellData.vue";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  toRef,
  watch,
} from "vue";
import { useClickOutside } from "@/use/useClickOutside";
import { nanoid } from "nanoid";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionIndex: {
    type: [String, Number],
    default: -1,
  },
  isMultipleColumn: {
    type: Boolean,
    default: false,
  },
  hasShowHeader: {
    type: Boolean,
    default: false,
  },
  headers: {
    type: Array,
    default: () => [],
  },
  propsMapping: {
    type: Array,
    default: () => [],
  },
  width: {
    type: Number,
    require: false,
    default: 200,
  },
  height: {
    type: Number,
    require: false,
    default: 32,
  },
  dropHeight: {
    type: Number,
    require: false,
    default: 200,
  },
  displayProperty: {
    type: String,
    default: "",
  },
  value: {
    type: [Object, String, Number],
    default: null,
    required: false,
  },
  keyForValue: {
    type: String,
    default: "",
    required: false,
  },
  isRounded: {
    type: Boolean,
    default: false,
  },
  isBorder: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  autoHideCaret: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function,
    default: () => true,
  },
  baseOnCompare: {
    type: Function,
    default: null,
  },
  usingFixedStyle: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:optionIndex", "update:value"]);

const _uid = nanoid();

const displayOption = computed(() => {
  let name = "";
  if (typeof props.options[props.optionIndex] !== "undefined") {
    name = props.options[props.optionIndex][props.displayProperty];
  }

  return name;
});

// biến giữ status show dropdown
let optionsVisible = ref(false);
// Biến giữ table header label
const tableHeaders = ref([""]);

const isShowCaret = ref(false);

const buildWithProps = ref(false);

const root = ref(null);
const buttonRef = ref(null);
const dropdownRef = ref(null);
const optionsRef = ref(null);
const dropdownItems = ref(null);

const positionX = ref(0);
const positionY = ref(0);

onMounted(() => {
  getPosition();
});

function getPosition() {
  positionX.value = dropdownRef.value.getBoundingClientRect().left;
  positionY.value = dropdownRef.value.getBoundingClientRect().top;
}

/*
khi component mounted thì check có prop header không
nếu không có thì lấy tên properties làm header label
@Authors: SONTB(18/12/2022)
*/
onMounted(() => {
  let headersLength = props.headers.length;
  let propsMLength = props.propsMapping.length;
  let keysArr = [];
  if (props.options.length > 0) {
    keysArr = Object.keys(props.options[0]);
  }
  if (props.isMultipleColumn && headersLength) {
    if (headersLength > 0) {
      if (
        (headersLength !== propsMLength && headersLength === keysArr.length) ||
        headersLength === propsMLength
      ) {
        buildWithProps.value = headersLength === propsMLength;
        tableHeaders.value = props.headers;
      } else {
        tableHeaders.value = Object.keys(props.options[0]).map((val) => val);
      }
    } else {
      tableHeaders.value = Object.keys(props.options[0]).map((val) => val);
    }
  } else if (!props.isMultipleColumn) {
    buildWithProps.value = true;
  }
});

useClickOutside(optionsRef, dropdownRef, () => {
  hideOptions();
});

/* Index item đang active */
const activeOptionIndex = ref(-1);
// onMounted(() => {
//   activeOptionIndex.value = props.optionIndex;
// });

/* Index item trước đó */
const prevOptionIndex = computed(() => {
  const next = activeOptionIndex.value - 1;
  return next >= 0 ? next : props.options.length - 1;
});

/* Index item tiếp theo */
const nextOptionIndex = computed(() => {
  const next = activeOptionIndex.value + 1;
  return next <= props.options.length - 1 ? next : 0;
});

/* Định danh sử dụng cho accessibility */
const activeDescendant = computed(() => `${_uid}-option-${activeOptionIndex}`);

/* Theo dõi index của item active để scroll view dropdown */
watch(activeOptionIndex, () => {
  scrollIntoView();
});

watch(toRef(props, "optionIndex"), () => {
  updateValueMapped();
});

watch(toRef(props, "value"), () => {
  updateIndex();
});

onMounted(() => {
  updateIndex();
});

// update value mapping thi change item
async function updateValueMapped() {
  // check xem co value map hay khon
  if (props.value != null && typeof props.value !== "undefined") {
    // check xem co key hay ko
    if (props.keyForValue) {
      let obj = props.options[0];
      if (props.keyForValue in obj) {
        // let idx = props.options.findIndex(
        //   (e) => e[props.keyForValue] === props.value
        // );
        obj = props.options[props.optionIndex];
        let value = obj[props.keyForValue];
        emit("update:value", value);
      }
    } else {
      // if (activeOptionIndex.value >= 0) {
      //   emit("update:value", props.options[activeOptionIndex.value]);
      // }
    }
  }
}

onMounted(() => {
  activeOptionIndex.value = props.optionIndex;
  if (props.keyForValue == "DateValue") {
    // debugger;
  }
  // check xem co value map hay khon
  if (props.value && typeof props.value !== "undefined") {
    // check xem co key hay ko
    if (props.keyForValue) {
      let obj = props.options[0];
      if (props.keyForValue in obj) {
        let idx = props.options.findIndex((e) => {
          if (
            props.baseOnCompare != null &&
            typeof props.baseOnCompare === "function"
          ) {
            return props.baseOnCompare(props.keyForValue, props.value);
          } else {
            return e[props.keyForValue] === props.value;
          }
        });
        if (idx >= 0) {
          activeOptionIndex.value = idx;
        }
      }
    }
  } else {
    // if (activeOptionIndex.value >= 0) {
    //   emit("update:value", props.options[activeOptionIndex.value]);
    // }
  }
});

function updateIndex() {
  activeOptionIndex.value = props.optionIndex;
  if (props.keyForValue == "DateValue") {
  }
  // check xem co value map hay khon
  if (props.value && typeof props.value !== "undefined") {
    // check xem co key hay ko
    if (props.keyForValue) {
      let obj = props.options[0];
      if (props.keyForValue in obj) {
        let idx = props.options.findIndex((e) => {
          if (
            props.baseOnCompare != null &&
            typeof props.baseOnCompare === "function"
          ) {
            return props.baseOnCompare(props.keyForValue, props.value);
          } else {
            return e[props.keyForValue] === props.value;
          }
        });
        if (idx >= 0) {
          emit("update:optionIndex", idx);
        }
      }
    }
  } else {
    // if (activeOptionIndex.value >= 0) {
    //   emit("update:value", props.options[activeOptionIndex.value]);
    // }
  }
}

/* Tính toán scroll dropdown */
function scrollIntoView() {
  nextTick();
  dropdownItems.value[activeOptionIndex.value]?.scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

/**
 * @param {any} option
 * Xử lý khi selected item
 */
function handleOptionClick(option) {
  activeOptionIndex.value = option;
  reset();
}

function handleBlur(e) {
  hideOptions();
}

useClickOutside(optionsRef, dropdownRef, () => {
  hideOptions();
});

/* Toggle options */
function toggleOptions() {
  optionsVisible.value ? hideOptions() : showOptions();
}

/* Handle show options */
async function showOptions() {
  await nextTick();
  optionsVisible.value = true;
  getPosition();
  optionsRef.value.focus();
}

/* Handle hide options */
function hideOptions() {
  optionsVisible.value = false;
}

/* Reset options */
// au
async function reset() {
  props.onChange();
  hideOptions();
  await nextTick();
  buttonRef.value.focus();
  emit("update:optionIndex", activeOptionIndex.value);
}

/* Focus item selected */
function setupFocus() {
  if (props.optionIndex) return;
  emit("update:optionIndex", 0);
}

/* Handle select previous option */
function selectPrevOption() {
  const prev = activeOptionIndex.value - 1;
  prev >= 0
    ? (activeOptionIndex.value = prev)
    : (activeOptionIndex.value = props.options.length - 1);
}

/* Handle select nect option */
function selectNextOption() {
  const next = activeOptionIndex.value + 1;
  next <= props.options.length - 1
    ? (activeOptionIndex.value = next)
    : (activeOptionIndex.value = 0);
}
</script>

<style lang="scss" scoped>
.FormSelect {
  &__control {
    display: block;
    width: 100%;
    border: solid 1px transparent;
    //background-color: #fff;
    background-color: transparent;
    //border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1;
    position: relative;
    height: 32px;

    &.rounded {
      border-radius: 4px;
    }

    &.border {
      border: solid 1px #ebebf2;
    }

    &:focus,
    &:focus-within,
    &--focus {
      border-color: var(--main-color);
      background-color: #fff;
      // box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    position: relative;
    padding: 0;
  }

  &__selected__option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding-right: 10px;

    .icon-toggle {
      span>i {
        font-size: 13px;
        color: grey;
      }
    }

    input {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      background-color: transparent;
      border: none;
      outline: none;
      align-items: center;
      padding: 10px;
    }
  }

  &__placeholder {
    color: #979797;
  }

  &__options {
    position: fixed;
    //top: calc(100% + 3px);
    z-index: 9;
    min-width: fit-content;
    background-color: #fff;
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
    border-radius: 4px;
    box-shadow: rgb(136 136 136) 0px 0px 6px;
    overflow-y: auto;
    max-height: 200px;

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
  }

  &__option {
    padding: 0.75em;
    cursor: default;

    &.has-focus {
      background-color: #ceebdc !important;
    }

    &.selected {
      background-color: #eee;
    }

    &:hover {
      background-color: #ceebdc !important;
    }
  }

  .tableFixHead {
    overflow-y: auto;
    height: 100px;
    // position: absolute;
    position: fixed;
    // top: calc(100% + 1px);
    // left: 0;
    border-radius: 4px;
    z-index: 9;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 26%);
  }

  .tableFixHead thead th {
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: #eee;
    white-space: nowrap;
  }

  /* Just common table stuff. Really. */
  table {
    /* border-collapse: collapse; */
    /* border: 0px; */
    width: max-content;
    background-color: #fff;
  }

  table tr {
    height: 26px;
  }

  th,
  td {
    padding: 8px 16px;
  }

  th {
    background: #eee;
  }

  /* width */
  .tableFixHead::-webkit-scrollbar {
    max-width: 5px;
  }

  /* Track */
  .tableFixHead::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 40px;
  }

  /* Handle */
  .tableFixHead::-webkit-scrollbar-thumb {
    background: #acacac;
    border-radius: 20px;
  }

  /* Handle on hover */
  .tableFixHead::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
}
</style>
