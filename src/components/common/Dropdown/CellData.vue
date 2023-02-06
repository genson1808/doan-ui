<template>
  <td v-if="buildWithProps" v-for="(v, i) in propsMapping" :key="i + 'a'">
    {{ data[`${v}`] }}
  </td>
  <td v-else v-for="(v, i) in arrData" :key="i">{{ v }}</td>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";

const props = defineProps({
  data: {
    type: Object,
    require: true,
    default: () => {},
  },
  buildWithProps: {
    type: Boolean,
    default: false,
  },
  propsMapping: {
    type: Array,
    default: () => [],
  },
});

const arrData = ref([]);
onMounted(() => {
  arrData.value = Object.values(props.data);
});
</script>
<style scoped lang="scss">
td {
  padding: 8px 16px;
}
</style>
