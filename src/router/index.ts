/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 13:21:40
 * @LastEditors: June
 * @LastEditTime: 2023-02-21 23:27:33
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
