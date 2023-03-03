<!--
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-03-04 00:48:04
-->

## dialog-edit-img

基于 konva.js 的简易编辑图片弹窗组件

## 功能

-   [ ] 添加文字
-   [ ] 图片旋转
-   [x] Filters
    -   [x] blur
    -   [x] invert
    -   [x] enhance
    -   [x] grayscale
    -   [x] posterize
    -   [x] sepia
-   [ ] 输出处理
    -   [x] base64
    -   [ ] blob
    -   [ ] image
-   [ ] 配置上传处理
-   [x] 构建 npm 包

## 使用

```bash
# 安装依赖
yarn add ie-dialog # or npm install ie-dialog or pnpm install ie-dialog
```

```javascript
// main.js
import ieDialog from 'ie-dialog';
import 'ie-dialog/dist/style.css';

app.use(ieDialog);
```