/*
 * @Author: June
 * @Description:
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-02-22 22:01:45
 */
import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';
import '@/styles/index.scss';

function bootStrap() {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
}

bootStrap();
