/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-04 23:56:07
 * @LastEditors: June
 * @LastEditTime: 2023-03-05 00:04:46
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue()],
    };
};
