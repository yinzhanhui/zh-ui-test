import Home from '../view/home/index.vue';
import ZhButton from '../view/button/index.vue';
import ZhDialog from '../view/dialog/index.vue';
import ZhCollapse from '../view/collapse/index.vue';
import ZhScrollBar from '@/view/scroll-bar/index.vue';

const routes = [
  { path: '/', component: Home, name: '主页 home' },
  { path: '/button', component: ZhButton, name: '按钮 button' },
  { path: '/dialog', component: ZhDialog, name: '弹窗 dialog' },
  { path: '/collapse', component: ZhCollapse, name: '折叠面板 collapse' },
  { path: '/scrollBar', component: ZhScrollBar, name: '滚动条  scrollBar' },
];

export default routes;
