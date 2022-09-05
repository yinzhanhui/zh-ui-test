<template>
  <div class="home">
    <div class="title">
      <h1>ZH UI</h1>
      <div style="height: 6px"></div>
      <p>个人兴趣爱好❤️</p>
    </div>
  </div>
</template>

<script setup>
import rotateWithMouse from '@/components/rotate-with-mouse/index.vue';
import logo from '@/assets/logo.png';
</script>

<style lang="scss" scoped>
.home {
  padding: 20px 10px;
  text-align: center;
  .title {
    margin-top: 100px;
  }
  .logo {
    position: fixed;
    top: -400px;
    left: -150px;
    width: 500px;
    height: 500px;
  }
}
</style>
