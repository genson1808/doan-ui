<template>
  <span class="display" v-if="period !== PERIOD_OPTIONAL">{{ display }}</span>

  <BaseDropdown
    v-else
    :width="170"
    :height="35"
    :drop-height="120"
    :options="listData"
    v-model:optionIndex="dateSelected"
    v-model:value="dateValue"
    key-for-value="DateValue"
    displayProperty="label"
    :rounded="false"
    :props-mapping="['label']"
    :auto-hide-caret="true"
  />
</template>

<script setup>
import {
  calculatePeriodStart,
  calculatePeriodTo,
  formatPeriodDate,
} from "@/helper/helper.js";
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, ref, toRef, watch } from "vue";
import { PERIOD_OPTIONAL } from "@/resources/constants.js";
import dayjs from "dayjs";
import BaseDropdown from "@/components/common/BaseDropdown.vue";

const props = defineProps({
  period: {
    type: Number,
    default: 0,
  },
  value: {
    type: [Date, String],
    require: true,
  },
  year1: {
    type: Number,
    require: true,
  },
  year2: {
    type: Number,
    require: true,
  },
  isStart: {
    type: Boolean,
    default: false,
  },
});

// period: {
//   type: Number,
// default: 0,
// },
// value: {
//   type: Date,
//       require: true,
// },
// year: {
//   type: [Number | String],
//       required: true,
// },

onBeforeMount(() => {
  let date = props.value;
  let fdate = dayjs(date).format("DD/MM/YYYY");
  dateValue.value = fdate;
});

const store = useStore();
const emit = defineEmits(["update:value"]);

const display = computed(() => formatPeriodDate(props.value));

const yearSelected = computed(() => store.getters.yearSelected);
const year1 = computed(() => yearSelected.value.value[0]);
const year2 = computed(() => yearSelected.value.value[1]);

const dateSelected = ref(-1);
const dateValue = ref("");

const listData = computed(() => {
  let rs = [];
  for (let i = 1; i <= 12; i++) {
    let label = `${i < 10 ? "0" : ""}${i}/${year1.value}`;
    let DateValue = dayjs(`${year1.value}/${i}/10`).format("DD/MM/YYYY");
    rs.push({ label, DateValue });
  }
  for (let i = 1; i <= 12; i++) {
    let label = `${i < 10 ? "0" : ""}${i}/${year2.value}`;
    let DateValue = dayjs(`${year2.value}/${i}/10`).format("DD/MM/YYYY");
    rs.push({ label, DateValue });
  }
  return rs;
});

function compare(val1, val2) {
  let a1 = val1.split("/");
  let a2 = val2.split("/");
  return a1[1] === a2[1] && a1[2] === a2[2];
}

onBeforeMount(() => {
  // if (!props.value && props.period !== PERIOD_OPTIONAL) {
  //   let d = calculatePeriodStart(props.period, 1, props.year1, props.year2);
  //   if (!props.isStart) {
  //     d = calculatePeriodTo(props.period, 1, props.year1, props.year2);
  //   }
  //   emit("update:value", d);
  // }
  // if (props.value && props.period === PERIOD_OPTIONAL) {
  //   // emit("update:value", props.value);
  // }
});

watch(toRef(props, "period"), () => {
  if (props.period == PERIOD_OPTIONAL) {
    emit("update:value", "");
  }
});

watch(toRef(props, "value"), () => {
  if (props.period == PERIOD_OPTIONAL) {
    dateValue.value = dayjs(props.value).format("DD/MM/YYYY");
  }
});

onMounted(() => {
  if (props.period !== PERIOD_OPTIONAL) {
    display.value = dayjs(props.value).format("MM/YYYY");
  }
});

watch(toRef(props, "period"), () => {
  if (props.period !== PERIOD_OPTIONAL) {
    let d = calculatePeriodStart(props.period, year1, year2);
    if (!props.isStart) {
      d = calculatePeriodTo(props.period, year1, year2);
    }
    emit("update:value", d);
  }
});

watch(dateValue, () => {
  if (props.period === PERIOD_OPTIONAL) {
    let val = dayjs(dateValue.value, "DD/MM/YYYY").format();
    emit("update:value", val);
  }
});
</script>

<style lang="scss" scoped>
.display {
  padding: 10px;
}
.input-date {
  height: 35px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;

  &:focus {
    border: 1px solid var(--green-border);
    padding: 10px;
  }
}
</style>
