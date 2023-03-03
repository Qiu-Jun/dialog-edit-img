/*
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-03-04 00:04:37
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue()],
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        build: {
            outDir: 'dist', //输出文件名称
            lib: {
                entry: path.resolve(__dirname, './src/index.ts'), //指定组件编译入口文件
                name: 'ie-dialog', // 起个名字，安装、引入用
                fileName: (format) => `ie-dialog.${format}.js`,
            }, //库编译模式配置
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue',
                    },
                },
            }, // rollup打包配置

            minify: 'terser',
            // terserOptions: {
            //     compress: {
            //         //生产环境时移除console
            //         drop_console: true,
            //         drop_debugger: true,
            //     },
            // },
        },
    };
};
