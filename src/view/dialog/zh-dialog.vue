<template>
  <transition name="dialog-fade">
    <div class="zh-dialog__wrapper" v-show="modelValue">
      <!-- <div class="zh-dialog__wrapper" v-show="modelValue" @click.self="handleCloseDialog"> -->
      <div ref="dialog" class="zh-dialog" :style="initStyle">
        <div ref="dialogHeader" class="zh-dialog__header">
          <slot name="title">
            <span class="zh-dialog__title">{{ title }}</span>
          </slot>

          <button class="zh-dialog__headerbtn" @click="handleCloseDialog">
            <i class="zh-icon zh-icon-close"></i>
          </button>
        </div>
        <div class="zh-dialog__body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div class="zh-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, ref, toRef, defineProps, defineEmits, computed } from 'vue';
import useDraggable from '@/lib/hooks/use-draggable';
import useResizable from '@/lib/hooks/use-resizable';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '40vh',
  },
  top: {
    type: String,
    default: '15vh',
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  resizable: {
    type: Boolean,
    default: false,
  },
  keepSizeAndPosition: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const dialog = ref();
const dialogHeader = ref();
const draggable = toRef(props, 'draggable');
const resizable = toRef(props, 'resizable');
// 初始样式
// const initStyle = ref({
//   width: props.width,
//   height: 'auto',
//   marginTop: props.top,
// });

const initStyle = computed(() => {
  // 如果保留尺寸和位置，则在打开弹窗时不传入初始化值
  if (props.keepSizeAndPosition) return {};
  return {
    width: props.width,
    marginTop: props.top,
  };
});

const handleCloseDialog = () => {
  emit('update:modelValue', false);
  // 如果不保留尺寸和位置，则在关闭弹窗时清空其style样式
  if (!props.keepSizeAndPosition) dialog.value.style = {};
};

useDraggable(dialog, dialogHeader, draggable);
useResizable(dialog, resizable);
</script>

<style lang="scss" scoped>
.zh-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .zh-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    // sass语法，&代表上一级，此处等同于".zh-dialog__header"
    &__header {
      padding: 20px 20px 10px;
      .zh-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .zh-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      .zh-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.dialog-fade-enter-active {
  animation: fade 0.3s;
}

.dialog-fade-leave-active {
  animation: fade 0.3s reverse;
}
</style>
