<template>
  <div class="wrapper">
    <Sidebar />
    <div class="container">
      <Header />
      <div class="main-content-wrapper">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layout/home/Sidebar.vue";
import Header from "@/components/layout/home/Header.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: calc(100% - 220px);
  }

  .toggle {
    width: 50px;
  }
}

.main-content-wrapper {
  flex: 1;

  .content {
    width: inherit;
    height: 100%;

    position: relative;
  }

  .content .dflex {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 48px);
  }

  .center {
    text-align: center;
  }
}
</style>
