import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './index.scss';

const app = createApp(App);

// 使用路由
app.use(router);

// 挂载节点
app.mount('#app');
