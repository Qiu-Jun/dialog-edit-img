/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-03 17:43:07
 * @LastEditors: June
 * @LastEditTime: 2023-03-03 18:06:13
 */
import type { App } from 'vue';
import ieDialog from './ie-dialog.vue';
import './styles/index.scss';

const ieDialogzCom = {
    install(app: App<Element>) {
        app.component('IeDialog', ieDialog);
    },
};

export default ieDialogzCom;
