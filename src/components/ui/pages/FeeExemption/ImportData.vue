<template>
  <teleport to="#loading-container" :disabled="!show" v-if="show">
    <div class="overlay">
      <div class="import-wrapper" ref="divRef">
        <div class="container">
          <div class="container__top">
            <div class="import__steps">
              <div class="step step--1 active">Chọn tệp nguồn</div>
              <div class="step step--2">Xác nhận và nhập khẩu</div>
            </div>
          </div>
          <div class="container__body">
            <div class="import__row1 row">
              <div class="import__title">Chọn tệp nhập khẩu</div>
              <div class="file-source">
                <div class="file-name">{{ fileName }}</div>
                <div class="import-btn">
                  <label for="file-data" class="pointer">
                    <i class="fa-sharp fa-solid fa-folder-open"></i>
                  </label>
                  <input
                    type="file"
                    name="file-data"
                    id="file-data"
                    @change="handleFileChange"
                    accept=".xlsx, .xls, .csv"
                  />
                </div>
              </div>
            </div>
            <div class="import__row2 row">
              <div class="icon"></div>
              <div class="info">
                <span>
                  Tệp dữ liệu phải có dạng .xls và dung lượng &lt; 2MB. Vui lòng
                  tải tệp đúng định dạng để hệ thống có thể nhận diện thông tin
                  trên tệp.
                  <a
                    href="https://localhost:7145/api/v1/FeeExemptions/export-fee-exemptions"
                    download
                  >
                    Tải tệp mẫu</a
                  >
                </span>
              </div>
            </div>
          </div>
          <div class="bottom__bar">
            <div class="wrap__actions">
              <div
                tabindex="0"
                @keyup.enter.prevent="close"
                class="btn btn--white cancel"
                @click="handleClose"
              >
                Đóng
              </div>
              <div tabindex="0" class="btn btn--green save">Lưu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { GET_FEE_EXEMPTIONS_ACTION } from "@/store/modules/consts.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();
const emit = defineEmits(["update:show"]);

const fileName = ref("");

const handleFileChange = (e) => {
  fileName.value = e.target.files[0].name;
};

function handleClose() {
  emit("update:show", false);
}

const download = () => {
  store.dispatch(GET_FEE_EXEMPTIONS_ACTION);
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

  .import-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 776px;
    height: 440px;
    background-color: #fff;
    border-radius: 4px;

    .container {
      padding: 24px;
      width: 100%;
      height: 100%;

      .container__top {
        width: 100%;
        margin-bottom: 40px;

        .import__steps {
          height: 39px;
          font-size: 16px;
          font-family: "OpenSans", Helvetica, Tahoma, Arial, sans-serif;
          font-weight: 600;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .step {
            width: 360px;
            display: flex;
            align-items: center;
            background-color: #afb4bb;
            height: 39px;

            &.step--1 {
              position: relative;
              padding-left: 18px;
              &:before {
                content: "";
                position: absolute;
                right: -20px;
                bottom: 0;
                width: 0;
                height: 0;
                border-left: 20px solid #0997eb;
                border-top: 20px solid transparent;
                border-bottom: 20px solid transparent;
                z-index: 1;
              }
            }

            &.step--2 {
              position: relative;
              padding-left: 44px;
              &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 0;
                border-left: 20px solid #fff;
                border-top: 20px solid transparent;
                border-bottom: 20px solid transparent;
              }
            }

            &.active {
              background-color: #0997eb !important;
            }
          }
        }
      }
      .container__body {
        width: 100%;
        height: 271px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .row {
          width: 100%;
          height: 40px;
        }

        .import__row1 {
          .import__title {
            font-size: 12px;
            color: #757575;
            margin-bottom: 8px;
          }

          .file-source {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .file-name {
              width: 691px;
              height: 32px;
              padding: 5px 10px;
              background-color: #f5f5f5 !important;
              border: 1px solid;
              border-color: #ccc !important;
              color: grey;
              display: flex;
              align-items: center;
            }

            .import-btn {
              width: 30px;
              height: 30px;
              background-color: #fff;
              border: 1px solid #ccc;

              label {
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                  color: #777b71;
                  font-size: 16px;
                }

                width: 30px;
                height: 30px;
              }
              input {
                display: none;
              }
            }
          }
        }

        .import__row2 {
          height: 52px;
          padding: 8px 17px;
          display: flex;
          align-items: center;
          background-color: #f5f6fa;

          .icon {
            width: 40px;
            height: 29px;
            background-image: url("@/assets/Icons/ic_ToastMessage_Info.svg");
            background-size: cover;
            background-repeat: no-repeat;
            margin-right: 20px;
          }

          .info {
            line-height: 1.5;

            a {
              color: rgba(9, 151, 235, 0.95);
              cursor: pointer;
              text-decoration: none;
            }
          }
        }
      }
      .bottom__bar {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: end;
        .wrap__actions {
          display: flex;
          justify-content: end;
          align-items: center;
        }

        .btn {
          width: 96px !important;
        }

        .save {
          &:focus {
            outline: none;
            border: 1px solid var(--green-border);
            background-color: var(--btn-green-hover);
          }
        }

        .cancel {
          margin-right: 8px;
          &:hover {
            color: #fff;
            background-color: #2f2e50;
          }
        }
      }
    }
  }
}
</style>
