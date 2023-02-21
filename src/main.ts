/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-02-21 23:19:13
 */
import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';

function bootStrap() {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
}

bootStrap();
