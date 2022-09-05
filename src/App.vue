<template>
  <div class="body">
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup>
import Menu from './components/menu/index.vue';
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  display: flex;
  .left {
    width: 200px;
    // box-shadow: 2px 0px 2px 1px #cfcdcd33;
  }
  .center {
    flex: 1;
    // background-color: lightgreen;
  }
  .right {
    width: 150px;
    // background-color: aqua;
  }
}
</style>
