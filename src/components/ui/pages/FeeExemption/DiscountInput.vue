<template>
  <div
    @click="focusIn"
    tabindex="0"
    @focus="focused = true"
    @keydown.tab.prevent="handleBlur"
    ref="optionDiscount"
    class="wrapper"
    :class="focused ? 'focused' : 'unFocused'"
  >
    <input
      ref="ipRef"
      v-show="focused"
      @focusin="focusIn"
      type="text"
      max="100"
      :maxlength="option == 0 ? 6 : 18"
      :value="displayValue"
      @keydown.enter.prevent="clickOutSide"
      @keydown.delete.prevent="deleteAll"
      @input="inputChange"
    />
    <div v-if="focused" class="wrap__option">
      <label :for="idForPercent" class="label percent__label">
        <input
          tabindex="-1"
          v-model="option"
          value="0"
          type="radio"
          name="discountValue"
          :id="idForPercent"
          class="percent--ip"
        />
        <span class="info" :class="option == 0 ? 'activated' : ''">%</span>
      </label>
      <label class="label money__label" :for="idForMoney">
        <input
          class="money--ip"
          v-model="option"
          value="1"
          type="radio"
          name="discountValue"
          :id="idForMoney"
        />
        <span class="info" :class="option == 1 ? 'activated' : ''">đ</span>
      </label>
    </div>
    <span v-show="!focused" class="display">
      {{ getFormatTypeValueRaw(option, modelValue)
      }}{{ option == 1 ? "đ" : "%" }}
    </span>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, toRef, watch } from "vue";
import { nanoid } from "nanoid";
import { useClickOutside } from "@/use/useClickOutside.js";
import { getFormatTypeValueRaw } from "@/helper/helper.js";
import debounce from "@/helper/Debounce.js";

const optionDiscount = ref(null);
const ipRef = ref(null);
const focused = ref(false);
const displayValue = ref(0);
function focusIn() {
  focused.value = true;
}

function handleBlur() {
  if (focused.value) {
    focused.value = false;
  }
}

useClickOutside(optionDiscount, null, () => {
  clickOutSide();
});

function clickOutSide() {
  focused.value = false;
}

const idForPercent = nanoid();
const idForMoney = nanoid();

const props = defineProps({
  type: {
    type: [Number],
    default: 0,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  width: {
    type: Number,
    default: 200,
    required: false,
  },
  height: {
    type: Number,
    default: 200,
    required: false,
  },
});

onMounted(() => {
  option.value = props.type;
  formatDisplay(props.modelValue);
});

const emit = defineEmits(["update:modelValue", "update:type"]);

function inputChange(e) {
  if (option.value == 1) {
    let removeChar = e.target.value.replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let rs = removeDot.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    displayValue.value = rs;
    let val = parseInt(displayValue.value.replace(/[^\d]/g, ""));
    emit("update:modelValue", val);
  } else {
    let removeChar = e.target.value.replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let data = removeDot.replace(/^(100|\d{2})/g, "$1,00");
    displayValue.value = data;
    emit("update:modelValue", parseInt(displayValue.value));
  }
}

function deleteAll() {
  displayValue.value = "";
}

const option = ref(0);
const valueIp = ref(0);
// const input = (e) => {
//   debounce(() => {
//     emit("update:value", e.target.value);
//   }, 300)();
// };
watch(option, () => {
  let t = parseInt(option.value, 10);
  emit("update:type", t);
});

watch(focused, () => {
  if (option.value == 0) {
    nextTick(() => {
      ipRef.value.focus();
      ipRef.value.setSelectionRange(1, 1);
    });
  }
});

function formatDisplay(inVal) {
  if (option.value == 1) {
    let removeChar = inVal.toString().replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let rs = removeDot.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    displayValue.value = rs;
  } else {
    let removeChar = inVal.toString().replace(/[^0-9\.]/g, "");
    let removeDot = removeChar.replace(/\./g, "");
    let data = removeDot.replace(/^(100|\d{2})/g, "$1,00");
    displayValue.value = data.slice(0, 5);
  }
}

function deformat() {
  if (option.value == 1) {
    let val = parseInt(displayValue.value.replace(/[^\d]/g, ""));
    emit("update:modelValue", val);
  } else {
    emit("update:modelValue", parseInt(displayValue.value));
  }
}
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.wrapper {
  background-color: transparent;
  height: 32px;
  border: 1px solid transparent;
  display: flex;

  &:focus {
    outline: none;
  }

  &:focus + input {
    display: block;
  }

  &.unFocused {
    background-color: transparent;
    height: 32px;
    border: 1px solid transparent;
  }

  &.focused {
    border: 1px solid #0fb95e;
    background-color: #fff;
  }
  input {
    width: 80%;
    height: 32px;
    text-align: end;
    padding: 10px;
    border: none;
    outline: none;
    background-color: transparent;

    &.select {
      user-select: all;
    }
  }

  .display {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .wrap__option {
    display: flex;

    .label {
      height: 32px;
      width: 32px;
      position: relative;

      input {
        position: absolute;
        opacity: 0;
      }

      .info {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        border: 1px solid var(--line-gridpanel-color);
      }
      .activated {
        background-color: #0fb95e;
        color: #fff;
      }
      //
      //& input:checked ~ .info {
      //  background-color: green;
      //}
    }
    .activated {
      background-color: #0fb95e;
      color: #fff;
    }
  }
}
</style>
