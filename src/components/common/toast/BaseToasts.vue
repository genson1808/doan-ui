<template>
  <div class="toasts-wrapper" v-if="toasts.length">
    <Toast v-for="(toast, index) of toasts" :toast="toast" :key="index">
    </Toast>
  </div>
</template>

<script setup>
import Toast from "@/components/common/toast/BaseToast.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const toasts = computed(() => store.getters.toasts);
</script>

<style lang="scss" scoped>
.toasts-wrapper {
  min-width: 300px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 2rem;
  bottom: 1rem;
  z-index: 9999;
}
</style>
