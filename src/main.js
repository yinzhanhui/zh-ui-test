import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/fonts/font.scss';
import './assets/reset.css';

import ZhButton from './view/button/zh-button.vue';
import ZhDialog from './view/dialog/zh-dialog.vue';

// import vDrag from './lib/directive/drag';

const app = createApp(App);

// app.directive('drag', vDrag);

app.component(ZhButton.__name, ZhButton);
app.component(ZhDialog.__name, ZhDialog);
app.use(router).mount('#app');
