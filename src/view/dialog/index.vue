<template>
  <div class="demo">
    <div class="demo-row">
      <zh-button type="primary" @click="visible1 = true">title属性传入字符串</zh-button>
      <zh-dialog v-model="visible1" title="title属性"></zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible2 = true" width="200px" top="20px">title插槽</zh-button>
      <zh-dialog v-model="visible2">
        <template #title>
          <h1>title插槽</h1>
        </template>
        <div>这是弹窗的内容</div>
        <template #footer>
          <zh-button @click="visible2 = false">取消</zh-button>
          <zh-button type="primary" @click="visible2 = false">确定</zh-button>
        </template>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible3 = true">拖拽</zh-button>
      <zh-dialog v-model="visible3" title="拖拽弹窗" draggable>
        <div>具有拖拽效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible4 = true">伸缩</zh-button>
      <zh-dialog v-model="visible4" title="伸缩弹窗" resizable>
        <div>具有伸缩效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible5 = true">拖拽和伸缩</zh-button>
      <zh-dialog v-model="visible5" title="拖拽和伸缩弹窗" draggable resizable>
        <div>具有拖拽和伸缩效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible6 = true">保留尺寸和位置</zh-button>
      <zh-dialog v-model="visible6" title="保留尺寸和位置" draggable resizable keepSizeAndPosition>
        <div>拖拽和伸缩后，可以保留尺寸和位置</div>
      </zh-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
</script>

<style lang="scss" scoped>
.demo {
  margin: 10px;
  .demo-row {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .zh-button {
      margin-right: 10px;
    }
  }
}
</style>
