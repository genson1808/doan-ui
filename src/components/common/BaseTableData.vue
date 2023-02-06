<template>
  <div class="table-wrapper">
    <table class="table-data">
      <thead>
        <tr>
          <td align="center" v-if="hasCheckbox">
            <div class="checkbox" ref="pr" tabindex="0">
              <input
                v-model="checkedAll"
                type="checkbox"
                :id="_uid"
                class="checkbox__input"
                @change="onCheckAll"
              />
              <label :for="_uid" class="checkbox__checkmark"></label>
            </div>
          </td>
          <td
            v-for="(v, i) in headers"
            :title="v.tooltip ? v.tooltip : ''"
            :key="i"
            :style="v.hStyle ? v.hStyle : ''"
            :class="v.headerClassStyle && [...v.headerClassStyle]"
          >
            {{ v.value }}
          </td>
          <td v-if="enableEditAction || enableRemoveAction" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in data"
          :key="idx"
          :class="[
            idx % 2 !== 0 ? 'odd-row' : '',
            selected.includes(item[checkboxBind]) ? 'checked' : '',
          ]"
          @dblclick="onDoubleClickRow(item)"
        >
          <td v-if="hasCheckbox" align="center" :key="idx">
            <div class="checkbox" ref="pr" tabindex="0">
              <input
                v-model="itemSelected"
                :value="item[checkboxBind]"
                type="checkbox"
                :id="item[checkboxBind] + '-' + idx"
                class="checkbox__input"
              />
              <label
                :for="item[checkboxBind] + '-' + idx"
                class="checkbox__checkmark"
              ></label>
            </div>
          </td>
          <td
            :align="h.align ? h.align : 'left'"
            class="ellipsis"
            v-for="(h, i) in headers"
            :key="i"
            :class="h.classStyle && [...h.classStyle]"
            @click="h.handleClick ? h.handleClick(item) : () => {}"
            :style="h.style ? h.style : ''"
          >
            {{
              h.preprocessor
                ? handleProperty(() => h.preprocessor(item), item[h.bind])
                : item[h.bind]
            }}
          </td>
          <td v-if="enableRemoveAction || enableEditAction">
            <div class="btn-action-wrapper">
              <div
                v-if="enableEditAction"
                class="btn-action btn-edit"
                @click="handleEditAction(item)"
              ></div>
              <div
                v-if="enableRemoveAction"
                class="btn-action btn-remove"
                @click="handleRemoveAction(item)"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { nextTick, ref, toRef, watch } from "vue";
import { useStore } from "vuex";
import { nanoid } from "nanoid";

const props = defineProps({
  selected: {
    type: Array,
    required: true,
  },
  hasCheckbox: {
    type: Boolean,
    default: false,
  },
  checkboxBind: {
    type: String,
    default: "",
  },
  headers: {
    //[{bind: '', value: '', tooltip: ''},.....]
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  tooltipFor: {
    type: String,
    default: "",
  },
  enableEditAction: {
    type: Boolean,
    default: true,
  },
  handleEditAction: {
    type: Function,
    default: () => true,
  },
  enableRemoveAction: {
    type: Boolean,
    default: true,
  },
  handleRemoveAction: {
    type: Function,
    default: () => true,
  },
  onClickRow: {
    type: Function,
    default: () => true,
  },
  onDoubleClickRow: {
    type: Function,
    default: () => true,
  },
});

const _uid = nanoid();
const checkedAll = ref(false);

const store = useStore();

// item đã checked
// @author SONTB (28/12/2022)
const itemSelected = ref([]);

const emit = defineEmits(["update:selected"]);

// theo dõi item checked, unchecked và emit lên parent
// @author SONTB (28/12/2022)
watch(
  () => itemSelected.value,
  () => {
    nextTick();
    if (itemSelected.value.length === props.data.length) {
      checkedAll.value = true;
    } else {
      checkedAll.value = false;
    }
    emit("update:selected", itemSelected.value);
  }
);

// Theo dõi item đã selected qua props và update
// @author SONTB (28/12/2022)
watch(toRef(props, "selected"), () => {
  itemSelected.value = props.selected;
});

/**
 * Xử lý sự kiện check all checkbox
 * @param {*} e event
 * @author SONTB (08/11/2022)
 */
function onCheckAll(e) {
  // nếu checked thì add hết value vào selected
  if (e.target.checked) {
    pushAll();
  } else {
    // Nếu unchecked thì remove các value đã checked
    removeAll();
  }
}

// xử lý checked all
// @author SONTB (28/12/2022)
const pushAll = () => {
  itemSelected.value = [];
  itemSelected.value = props.data.map((e) => e[props.checkboxBind]);
};

// xử lý uncheck all
// @author SONTB (28/12/2022)
const removeAll = () => {
  itemSelected.value = [];
};

// xử lý callback preprocessor
// @author SONTB (28/12/2022)
const handleProperty = (cb, defaultValue) => {
  if (typeof cb === "function") {
    let data = cb();
    if (data) {
      return data;
    }
  }
  return defaultValue;
};
</script>
<style lang="scss" scoped>
.w {
  width: calc(var(--w) * 1px) !important;
}

.center {
  text-align: center;
}

.df-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-checked {
  display: block;
  background-image: url(@/assets/Icons/ic_Check.png);
  background-repeat: no-repeat;
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
  margin: 0 auto;
}

.btn-action-wrapper {
  width: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.btn-action {
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer;
  }
}

.btn-edit {
  background-image: url(@/assets/Icons/ic_Edit.svg);
  background-repeat: no-repeat;
  background-size: 24px 24px;
}

.btn-remove {
  background-image: url(@/assets/Icons/ic_Remove2.svg);
  background-repeat: no-repeat;
  background-size: 24px 24px;

  &:hover {
    background-image: url(@/assets/Icons/ic_Remove_Hover.svg);
    background-repeat: no-repeat;
    background-size: 24px 24px;
  }
}

.table-wrapper {
  max-height: 100%;
  overflow-y: scroll;

  /* width */
  &::-webkit-scrollbar {
    max-width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 40px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #acacac;
    border-radius: 20px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
}

.table-data {
  border-collapse: separate;
  min-width: max-content;
  width: 100%;

  /* width */
  &::-webkit-scrollbar {
    max-width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 39px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #acacac;
    border-radius: 19px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #c1c2c2;
  }

  thead {
    height: 40px;
    background-color: var(--header-gridpanel-color);
    font-family: OpenSans Semibold, serif;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 1;

    tr {
      td:not(:first-child) {
        text-align: center;
      }
    }
  }

  td {
    border: 0.5px solid var(--line-gridpanel-color);
    height: 100%;

    &:first-child {
      border-left: 1px solid var(--line-gridpanel-color);
      width: 32px;
    }

    &.hyperlink {
      color: #0997eb !important;
      cursor: pointer;
    }
  }

  tbody {
    tr {
      height: 40px;

      &:hover {
        background-color: #d1e6fd !important;
      }

      &.odd-row {
        background-color: #f5f6fa;
      }

      td {
        padding: 7px 10px 6px;
        max-width: 300px;
      }

      td:nth-child(7) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      td:nth-child(6) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      td:last-child {
        width: 74px;
      }

      &.checked {
        background-color: #d1e6fd !important;
      }
    }
  }

  tr {
    td {
      vertical-align: middle;
    }
  }
}

.checkbox__input {
  display: none;
  // visibility: hidden;

  &:checked {
    + {
      .checkbox__checkmark {
        background-image: url(@/assets/Icons/ic_Checkbox_Active.svg);
      }
    }
  }
}

.checkbox {
  display: flex;
  width: 20px;
  height: 20px;

  &:focus {
    border-radius: 4px;
    outline: none;
  }

  &:focus .checkbox__checkmark::before {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }

  .checkbox__checkmark {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-image: url(@/assets/Icons/ic_Checkbox_Inactive.svg);
    background-repeat: no-repeat;
  }
}
</style>
