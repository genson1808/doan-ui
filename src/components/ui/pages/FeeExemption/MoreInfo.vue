<template>
  <div class="mi-wrapper">
    <div class="item">
      <div @click="onClickImport">
        <span class="icon-import"></span>Nhập khẩu
      </div>
    </div>
    <div class="item">
      <div>
        <span class="icon-copy"></span>
        Sao chép danh sách miễn giảm
      </div>
    </div>

    <div class="item">
      <div>
        <span class="icon-zoom"></span>
        Phóng to/phu nhỏ màn hinh (F11)
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  onClickImport: Function,
  default: () => true,
});
</script>

<style lang="scss" scoped>
.mi-wrapper {
  box-sizing: border-box;
  width: 256px;
  height: 128px !important;
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--line-gridpanel-color);
  border-radius: 4px;
  z-index: 3;
  top: calc(100% + 2px);
  right: 0;
  padding: 0;

  .item {
    width: 256px;
    height: 42px;
    padding: 0 5px;
    &:hover {
      background-color: #f5f6fa;
    }
    div {
      padding: 5px 0;
      display: flex;
      align-items: center;
      height: 42px;

      span {
        display: inline-block;
        background-size: cover;
        background-repeat: no-repeat;
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }

      .icon-import {
        background-image: url("@/assets/Icons/ic_Import.svg");
      }

      .icon-copy {
        background-image: url("@/assets/Icons/ic_Duplicate_24.svg");
      }

      .icon-zoom {
        background-image: url("@/assets/Icons/ic_zoom.png");
      }
    }
  }
}
</style>
