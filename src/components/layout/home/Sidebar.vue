<template>
  <div class="wrapper-sidebar" :class="isCollapsed ? 'collapsed' : ''">
    <div class="sidebar">
      <div class="logo-container">
        <div class="header-logo" :class="isCollapsed ? 'collapsed' : ''">
          <div class="logo-icon"></div>
          <div class="logo-text">Khoản thu</div>
        </div>
        <div class="menu-toggle" @click="collapse"></div>
      </div>
      <RouterLink
        class="routerLink"
        v-for="e in items"
        :key="e.id"
        :to="{name: e.name}"
        @click="activeMenuItem(e.id)"
      >
        <MenuItem
          :subMenu="e.submenu"
          :iconSrc="e.iconSrc"
          :text="e.text"
          :class="menuItemActivated === e.id ? 'active' : ''"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import MenuItem from "@/components/layout/home/MenuItem.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import * as cns from "@/store/modules/consts.js";
import * as rts from "@/router/consts.js";

const store = useStore();

const isCollapsed = computed(() => store.getters.collapsed);

const collapse = () => {
  store.dispatch(cns.SET_COLLAPSED_ACTION, !isCollapsed.value);
};

const menuItemActivated = ref(0);

function activeMenuItem(id) {
  menuItemActivated.value = id;
}

const items = rts.MenuItems;
</script>

<style lang="scss" scoped>
.wrapper-sidebar {
  width: 205px;
  height: 100vh;
  background-color: var(--bgc-menu-sidebar);
  transition: all 0.2s;

  display: flex;
  flex-direction: column;

  .sidebar {
    width: 100%;
    background-color: var(--bgc-menu-sidebar);
    flex: 1;

    .active {
      border-left: 4px solid var(--active-sidebar);
      background-color: var(--bgc-active-menu-sidebar);
      color: var(--active-sidebar);
    }

    .logo-container {
      width: 100%;
      height: 59px;
      background-color: #24344b;
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;

      .header-logo {
        margin-left: 12px;
        display: flex;
        align-items: center;
        height: 50px;
        text-decoration: none;

        .logo-icon {
          background-image: url(@/assets/Icons/KhoanThu_Logo.svg);
          background-size: cover;
          width: 35px;
          height: 35px;
          background-repeat: no-repeat;
        }

        .logo-text {
          margin-left: 8px;
          font-size: 16px;
          font-family: OpenSans Semibold;
          color: #ffffff;
        }

        &.collapsed {
          display: none;
        }
      }

      .menu-toggle {
        background-image: url(@/assets/Icons/ic_sprites.svg);
        background-repeat: no-repeat;
        background-position: 0 0;
        width: 50px;
        height: 50px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .routerLink {
      text-decoration: none;
    }
  }

  &.collapsed {
    width: 50px;
  }
}
</style>
