/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-02-21 23:27:23
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue(), viteCompression()],
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            // 忽略后缀名的配置
            // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/styles/variable.scss";',
                },
            },
        },
        server: {
            // 设置 https 代理
            proxy: {
                '/api': {
                    target: 'http://110.41.150.71:3000',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
    };
};
