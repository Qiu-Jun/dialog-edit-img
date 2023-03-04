/*
 * @Author: June
 * @Description:
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-04 23:50:13
 */
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import ieDialog from '../src/index';
import '../src/styles/index.scss';

function bootStrap() {
    const app = createApp(App);
    app.use(ieDialog);
    app.use(router);
    app.mount('#app');
}

bootStrap();
