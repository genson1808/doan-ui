<template>
  <teleport
    to="#loading-container"
    :disabled="!notices.show"
    v-if="notices.show"
  >
    <div class="overlay">
      <div class="popup_cf">
        <div class="header">
          <div class="label">{{ notices.label }}</div>
          <div class="close__icon pointer" @click="close"></div>
        </div>
        <div class="body">
          <div class="message">
            {{ notices.message }}
          </div>
        </div>
        <div class="action__group">
          <div class="wrap__actions">
            <div class="div btn btn--green accept" @click="close">Đồng ý</div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { SET_NOTICES_ACTION } from "@/store/modules/consts.js";

const store = useStore();
const notices = computed(() => store.getters.notices);
const close = () => {
  let { label, message } = notices;
  store.dispatch(SET_NOTICES_ACTION, { show: false, label, message });
};
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

  .popup_cf {
    position: absolute;
    width: 408px;
    min-height: 162px;
    top: 50%;
    left: 50%;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    background-color: #fff;

    .header {
      width: 100%;
      height: 60px;
      padding: 24px 24px 0 24px;
      display: flex;
      justify-content: space-between;

      .label {
        width: 330px;
        height: 36px;
        padding: 8px 0;
        font-size: 20px;
        color: #6a6a6a;
        font-family: OpenSans Semibold, serif;
      }

      .close__icon {
        background-image: url(@/assets/Icons/ic_close_16.png);
        width: 17px;
        height: 17px;
        margin-left: 6px;
      }
    }

    .body {
      min-width: 46px;
      padding: 8px 24px 16px;

      .message {
        font-family: "OpenSans", Helvetica, Tahoma, Arial, sans-serif !important;
        line-height: 1.5;
      }
    }

    .action__group {
      width: 100%;
      padding: 24px;

      .wrap__actions {
        display: flex;
        justify-content: end;
        align-items: center;
      }

      .btn {
        width: 96px;
      }

      .cancel {
        &:hover {
          color: #fff;
          background-color: #2f2e50;
        }

        margin-right: 10px;
      }
    }
  }
}
</style>
