<template>
  <Teleport to="#loading-container" :disabled="!isLoading" v-if="isLoading">
    <div class="wrapper-loading">
      <div class="loading">
        <div class="wrapper-wave">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <div class="loading-text">Đang tải</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = computed(() => {
  return store.getters.isLoading;
});
</script>

<style lang="scss" scoped>
.wrapper-loading {
  background-color: rgba(168, 166, 166, 0.52);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 91;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
}

.wrapper-wave {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  margin-top: 10px;
}

.wave {
  width: 10px;
  height: 10px;
  animation: wave 1s linear infinite;
  border-radius: 50px;
}

.wave:nth-child(1) {
  background-color: #d26367;
  animation-delay: 0.1s;
}

.wave:nth-child(2) {
  background-color: #e58467;
  animation-delay: 0.2s;
}

.wave:nth-child(3) {
  background-color: #eeb475;
  animation-delay: 0.3s;
}

.wave:nth-child(4) {
  background-color: #afbb87;
  animation-delay: 0.4s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
