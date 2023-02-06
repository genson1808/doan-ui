<script setup>
import Loading from "@/components/common/BaseLoading.vue";
import BaseToasts from "@/components/common/toast/BaseToasts.vue";
import Notice from '@/components/ui/pages/FeeExemption/Notice.vue';
import { onMounted } from "vue";
import { useStore } from "vuex";
import { GET_IP_ACTION } from "@/store/modules/consts.js"

const store = useStore();

onMounted(() => {
  store.dispatch(GET_IP_ACTION);
});
</script>

<template>
  <router-view />
  <Loading />
  <BaseToasts />
  <Notice />
</template>

<style scoped></style>
