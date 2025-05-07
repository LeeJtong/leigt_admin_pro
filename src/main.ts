import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import pinia from '@/store';
import '@/styles/index.less';

const app = createApp(App);

// 打印环境变量
console.log(import.meta.env.VITE_APP_NAME, '111');
app.use(router);
app.use(pinia);
app.mount('#app');
