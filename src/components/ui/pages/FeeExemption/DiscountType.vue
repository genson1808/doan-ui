<template>
  <div class="wrap__option">
    <label :for="idForPercent" class="label percent__label">
      <input
        tabindex="0"
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
        tabindex="-1"
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
</template>

<script setup>
import { ref, toRef, watch } from "vue";
import { nanoid } from "nanoid";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const idForPercent = nanoid();
const idForMoney = nanoid();
const option = ref(0);

watch(toRef(props, "value"), () => {
  option.value = props.value;
});
</script>

<style lang="scss" scoped>
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
</style>
