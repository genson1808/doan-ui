<template>
  <div class="toast" :class="toastStyle">
    <div class="toast__icon"></div>
    <div class="toast__content">
      <h5 class="toast__title">
        {{ toast.title }}
      </h5>
      <p class="toast__message">{{ toast.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
import * as acs from "@/store/modules/consts.js";
import * as rs from "@/resources/resources.vi";

const props = defineProps({
  toast: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const toastStyle = computed(() => {
  switch (props.toast.type) {
    case rs.TOAST_TYPE_SUCCESS:
      return "toast--success";
    case rs.TOAST_TYPE_ERROR:
      return "toast--error";
    case rs.TOAST_TYPE_WARNING:
      return "toast--warning";
    default:
      return "toast--info";
  }
});

onBeforeMount(() => {
  // Automatically dismiss toast after 5 seconds
  setTimeout(() => {
    dismissToast();
  }, 5000);
});

function dismissToast() {
  store.dispatch(acs.CLEAR_TOAST_ACTION, props.toast.title);
}
</script>

<style lang="scss" scoped>
.toast {
  margin-top: 30px;
  line-height: 1.6;
  background-color: #fff;
  min-width: 300px;
  max-height: 80px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
  -webkit-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
  -moz-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
  animation: slideInLeft ease 0.3s, fadeOut linear 1s 3s forwards;
}

@keyframes slideInLeft {
  from {
    transform: translateX(calc(100% + 32px));
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.toast .toast__content {
  margin: 18px;
}

.toast .toast__title {
  font-size: 16px;
}

.toast .toast__icon {
  width: 50px;
  height: 50px;
  margin-left: 18px;
}

/*toast success*/
.toast--success {
  border-left: 4px solid var(--toast-success);
}

.toast--success .toast__icon {
  background: url("@/assets/Icons/ic_ToastMessage_Success.png") no-repeat center;
}

/*toast error*/
.toast--error {
  border-left: 4px solid var(--toast-error);
}

.toast--error .toast__icon {
  background: url("@/assets/Icons/ic_ToastMessage_Fail.png") no-repeat center;
}

/*toast warning*/
.toast--warning {
  border-left: 4px solid var(--toast-warning);
}

.toast--warning .toast__icon {
  background: url("@/assets/Icons/ic_ToastMessage_Warning.png") no-repeat center;
}

/*toast notification*/
.toast--info {
  border-left: 4px solid var(--toast-notification);
}

.toast--info .toast__icon {
  background: url("@/assets/Icons/ic_ToastMessage_Info.png") no-repeat center;
}
</style>
