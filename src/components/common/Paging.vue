<template>
  <div class="paging">
    <div class="info">
      Tổng số <b class="bold">{{ total }}</b> danh sách miễn giảm
    </div>
    <div class="page__info">
      <div>Trang</div>
      <div class="page--action">
        <input @input="onChangeDebounced" v-model="page" class="page-ip" />
        <div class="wrap__action">
          <div class="increase pointer" @click="goToNextPage">
            <i class="fa-solid fa-caret-up"></i>
          </div>
          <div class="decrease pointer" @click="goToPreviousPage">
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="page__number__info">
        trên tổng số <b class="bold">{{ maxPage }}</b> trang
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, watch } from "vue";
import debounce from "@/helper/Debounce.js";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 20,
    required: true,
  },
  maxPage: {
    type: Number,
    default: 1,
    required: true,
  },
});

watch(toRef(props, "maxPage"), () => {
  if (maxPage > page) {
    page.value = 1;
    emit("update:modelValue", page.value);
  }
});

/**
 * Khai báo biến emit cho việc emit các event map qua modelValue
 * @author SONTB (28/12/2022)
 */
const emit = defineEmits(["update:modelValue"]);

// Biến page bindings 2 chiều với input page
const page = ref(1);
const maxPage = toRef(props, "maxPage");

/**
 * Xử lý điều hướng cho phân trang
 * @author SONTB (28/12/2022)
 */
// đi đến trang tiếp theo
const goToNextPage = () => {
  if (page.value < props.maxPage && page.value >= 1) {
    page.value++;
    emit("update:modelValue", page.value);
  }
};

// Trở lại trang trước
const goToPreviousPage = () => {
  if (page.value > 1 && page.value <= props.maxPage) {
    page.value--;
    emit("update:modelValue", page.value);
  }
};

// Đến trang cuối cùng
const goToLastPage = () => {
  page.value = props.maxPage;
  emit("update:modelValue", page.value);
};

// Đến trang đầu tiên
const goToFirstPage = () => {
  page.value = 1;
  emit("update:modelValue", page.value);
};

watch(
  () => maxPage.value,
  () => {
    if (page.value > maxPage.value) {
      page.value = 1;
      emit("update:modelValue", page.value);
    }
  }
);

/**
 * Xử lý khi người dùng nhập tự nhập trang muốn đến sử dụng kỹ thuật debounce
 * để hạn chế việc all api backend nhiều lần
 * @author SONTB (28/12/2022)
 */
const onChangeDebounced = debounce(() => {
  let newPage = parseInt(page.value);
  if (!newPage || newPage < 1 || newPage > props.maxPage) {
    page.value = props.modelValue;
  } else {
    emit("update:modelValue", newPage);
  }
}, 500);
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}

.paging {
  width: 100%;
  height: 53px;
  background-color: #fff;
  padding: 12px 0px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
  }

  .page__info {
    display: flex;
    align-items: center;

    .page--action {
      width: 80px;
      height: 32px;
      display: flex;
      align-items: center;
      margin: 0 9px 0 5px;
      border: 1px solid var(--line-gridpanel-color);

      .page-ip {
        width: 46px;
        height: 25px;
        padding: 5px 10px;
        outline: none;
        border: none;
      }

      .wrap__action {
        width: 32px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .increase {
          width: 32px;
          height: 15px;
          position: relative;

          i {
            font-size: 16px;
            color: #c3c3c3;
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);

            &:hover {
              color: #acacac;
            }
          }
        }

        .decrease {
          width: 32px;
          height: 15px;
          position: relative;

          i {
            display: flex;
            font-size: 16px;
            color: #c3c3c3;
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);

            &:hover {
              color: #acacac;
            }
          }
        }
      }
    }
  }
}
</style>
