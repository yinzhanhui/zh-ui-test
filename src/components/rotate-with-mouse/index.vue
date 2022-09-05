<template>
  <div ref="containerRef" class="container">
    <div ref="elementRef" class="element">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

// 翻转倍数
const multiple = 40;
// ref
const containerRef = ref();
const elementRef = ref();
// 监听事件
let mouseMove = null;
let mouseLeave = null;

// 组件挂载时添加监听事件
onMounted(() => {
  const element = elementRef.value;
  const container = containerRef.value;

  function transformElement(x, y) {
    const box = element.getBoundingClientRect();
    const calcX = -(y - box.y - box.height / 2) / multiple;
    const calcY = (x - box.x - box.width / 2) / multiple;
    element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  }

  // 监听事件
  mouseMove = (e) => {
    window.requestAnimationFrame(function () {
      transformElement(e.clientX, e.clientY);
    });
  };

  mouseLeave = (e) => {
    window.requestAnimationFrame(function () {
      element.style.transform = 'rotateX(0) rotateY(0)';
    });
  };

  container.addEventListener('mousemove', mouseMove);
  container.addEventListener('mouseleave', mouseLeave);
});

// 组件卸载时移除监听事件
onBeforeUnmount(() => {
  containerRef.value.removeEventListener('mousemove', mouseMove);
  containerRef.value.removeEventListener('mouseleave', mouseLeave);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  transform-style: preserve-3d;
  perspective: 500px;
  cursor: pointer;
  .element {
    margin: auto;
    width: 200px;
    height: 200px;
    // background: #000;
    transform-style: preserve-3d;
    transition: all 0.1s;
  }
}
</style>
