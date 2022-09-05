import { onBeforeUnmount, onMounted, watchEffect } from 'vue';

const useResizable = (targetRef, resizable, minWidth, minHeight) => {
  // console.log(targetRef, resizable);

  // 鼠标在目标元素上移动的监听事件
  const onTargetMouseMove = (e) => {
    // 目标元素的属性
    const targetRect = targetRef.value.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;
    // 鼠标所在位置
    const downX = e.clientX;
    const downY = e.clientY;
    // 鼠标是否在目标元素边框附近
    const isInLeft = downX < targetLeft + 10;
    const isInRight = downX > targetLeft + targetWidth - 10;
    const isInBottom = downY > targetTop + targetHeight - 10;
    // 目标元素的style属性
    const targetSty = targetRef.value.style;

    // 鼠标在目标元素上按下的监听事件
    const onMousedown = (e) => {
      // userSelect属性设置或返回是否可以选择元素的文本。如果双击某些文本，将选中/突出显示该文本。此属性可用于防止此情况
      targetSty.userSelect = 'none';
      // 鼠标位置参数
      const downX = e.clientX;
      const downY = e.clientY;
      // 目标元素参数
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      console.log(targetLeft);

      const onMousemove = (e) => {
        // 移动时禁用默认事件
        e.preventDefault();
        // 计算移动量
        // const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft);
        // const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop);

        // 1.因为dialog是position:relative，所以不能仅设置width，还要设置marginLeft
        // 2.应该设置marginLeft，而最好不设置left，因为relative元素的left是相对原来位置进行偏移，否则还得计算偏移量
        if (isInLeft) {
          const moveX = downX - e.clientX;
          targetSty.marginLeft = `${targetLeft - moveX}px`;
          targetSty.width = `${targetWidth + moveX}px`;
        }
        if (isInRight) {
          const moveX = e.clientX - downX;
          targetSty.marginLeft = `${targetLeft}px`;
          targetSty.width = `${targetWidth + moveX}px`;
        }
        if (isInBottom) {
          const moveY = e.clientY - downY;
          targetSty.marginTop = `${targetTop}px`;
          targetSty.height = `${targetHeight + moveY}px`;
        }
      };

      // 鼠标松开时移除监听事件
      const onMouseup = () => {
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('mouseup', onMouseup);
      };

      // 添加监听事件
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup);
    };

    targetRef.value.onmousedown = onMousedown;
    // 根据在目标元素的哪条边上进行鼠标样式设置和添加监听事件
    if (isInLeft && isInBottom) {
      targetSty.cursor = 'nesw-resize';
    } else if (isInRight && isInBottom) {
      targetSty.cursor = 'nwse-resize';
    } else if (isInLeft || isInRight) {
      targetSty.cursor = 'ew-resize';
    } else if (isInBottom) {
      targetSty.cursor = 'ns-resize';
    } else {
      targetSty.cursor = 'default';
      targetRef.value.onmousedown = null;
    }
  };

  const onResizable = () => {
    if (targetRef.value) {
      targetRef.value.addEventListener('mousemove', onTargetMouseMove);
    }
  };

  const offResizable = () => {
    if (targetRef.value) {
      targetRef.value.removeEventListener('mousemove', onTargetMouseMove);
    }
  };

  onMounted(() => {
    watchEffect(() => {
      if (resizable.value) {
        onResizable();
      } else {
        offResizable();
      }
    });
  });

  onBeforeUnmount(() => {
    offResizable();
  });
};

export default useResizable;
