<template>
  <div class="menu-item">
    <div class="menu-icon">
      <img class="icon" :src="icon" :alt="text" />
    </div>
    <div class="menu-text" :class="isCollapsed ? 'collapsed' : ''">
      {{ text }}
    </div>

    <div class="submenu" v-if="subMenu.length">
      <div class="submenu__title">{{ text }}</div>
      <ul>
        <RouterLink
          class="routerLink"
          v-for="v in subMenu"
          :key="v.id"
          :to="{ name: v.name }"
          @click="onActive(v.id)"
        >
          <li :class="activated === v.id ? 'activated-subitem' : ''">
            {{ v.text }}
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";

// props
const props = defineProps({
  iconSrc: {
    type: String,
  },
  text: {
    type: String,
  },
  subMenu: {
    type: Array,
    default: [],
  },
});

const store = useStore();
const isCollapsed = computed(() => store.getters.collapsed);
const activated = ref(0);

const onActive = (id) => {
  if (id >= 0) {
    activated.value = id;
  }
};

// Icons
const icon = computed(() => {
  return new URL(`../../../assets/Icons/${props.iconSrc}.svg`, import.meta.url)
    .href;
});
</script>

<style lang="scss" scoped>
.menu-item {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  border-left: 4px;
  border-style: solid;
  border-color: transparent;
  padding-left: 8px;
  color: #fff;
  position: relative;

  &:hover {
    background-color: var(--bgc-active-menu-sidebar);
    cursor: pointer;
  }

  &:hover > .submenu {
    display: block;
  }

  .submenu {
    color: #fff;
    top: 0px;
    right: 0;
    width: 275px;
    max-height: 415px;
    position: absolute;
    z-index: 9;
    background-color: var(--bgc-active-menu-sidebar);
    transform: translateX(100%);
    display: none;
    padding: 10px;

    .routerLink {
      color: #fff;
      text-decoration: none;
      padding: 9px 24px 9px 21px;
      display: inline-block;
      font-weight: normal;

      &:hover {
        color: var(--active-sidebar);
      }
    }

    .submenu__title {
      font-size: 18px;
      padding: 20px;
      cursor: default;
      pointer-events: none;
    }

    & > ul > li {
      padding: 9px 24px 9px 21px;

      &:hover {
        color: var(--active-sidebar);
      }
    }

    .activated-subitem {
      color: var(--active-sidebar);
    }
  }

  .ttb {
    top: -50px;
  }

  .btt {
    bottom: -50px;
  }

  .menu-icon {
    width: 32px;
    height: 32px;

    .icon {
      width: 100%;
      height: 100%;
    }
  }

  .menu-text {
    margin-left: 11px;
  }

  .collapsed {
    display: none;
  }
}
</style>
