<template>
  <div class="checkbox" ref="pr" tabindex="0">
    <input ref="input" type="checkbox" name="checkbox_input" class="checkbox__input" :checked="modelValue" :id="ipId"
      @change="$emit('update:modelValue', $event.target.checked)" />
    <label :for="ipId" class="checkbox__checkmark" :class="focus ? 'focus' : ''"></label>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

// unique id cho mỗi checkbox
const ipId = nanoid();

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const focus = ref(false);
</script>

<style lang="scss" scoped>
.checkbox__input {
  display: none;
  // visibility: hidden;

  &:checked {
    + {
      .checkbox__checkmark {
        &:before {
          background-color: #03ae66;
          border: none;
        }

        &:after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}

.checkbox {
  display: flex;
  width: 20px;
  height: 20px;
  box-sizing: border-box;

  &:focus .checkbox__checkmark::before {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }

  &:focus {
    outline: none;
  }

  .checkbox__checkmark {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    box-sizing: border-box;

    &:before {
      content: "";
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: 1px solid var(--line-gridpanel-color);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 4px;
      box-sizing: border-box;
    }

    &:after {
      content: "";
      position: absolute;
      width: 9px;
      height: 5px;
      top: 6px;
      left: 6px;
      transform: rotate(-45deg);
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      opacity: 0;
      visibility: hidden;
      transition: 0.25s linear;
      box-sizing: border-box;
    }
  }
}
</style>
