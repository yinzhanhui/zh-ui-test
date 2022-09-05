import { onBeforeUnmount, onMounted, watchEffect } from 'vue';

const useDraggable = (targetRef, dragRef, draggable) => {
  // console.log(targetRef, dragRef, draggable);

  const transform = {
    offsetX: 0,
    offsetY: 0,
  };

  const onMousedown = (e) => {
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;

    const targetRect = targetRef.value.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;

    const { clientWidth } = document.documentElement;
    const { clientHeight } = document.documentElement;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;

    const onMousemove = (e) => {
      const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft);
      const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop);

      targetRef.value.style.marginLeft = `${targetLeft + moveX}px`;
      targetRef.value.style.marginTop = `${targetTop + moveY}px`;
    };

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown);
      // title部分加上可拖动cursor
      dragRef.value.style.cursor = 'move';
    }
  };

  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown);
    }
  };

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });

  onBeforeUnmount(() => {
    offDraggable();
  });
};

export default useDraggable;
