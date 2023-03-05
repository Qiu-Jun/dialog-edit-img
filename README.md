<!--
 * @Author: June
 * @Description:
 * @Date: 2023-01-17 12:46:35
 * @LastEditors: June
 * @LastEditTime: 2023-03-05 22:48:48
-->

## ie-dialog(Image edit dialog)

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
# yarn
yarn add ie-dialog
# npm
npm install ie-dialog
#pnpm
pnpm install ie-dialog
```

## 属性

| 参数    | 是否必填 | 类型           | 默认      | 可选值                                         |
| ------- | -------- | -------------- | --------- | ---------------------------------------------- |
| visible | 是       | Boolean        | false     | false ro true                                  |
| outType | 非       | String         | toDataURL | toDataURL, toBlob, toJSON konva 支持的导出类型 |
| canvasW | 非       | String, Number | 500       | width                                          |
| imgH    | 非       | Number         | 370       | 图片的高度                                     |
| imgSrc  | 非       | String         | ‘’        | base 64 or url                                 |

```javascript
// main.js
import ieDialog from 'ie-dialog';
import 'ie-dialog/dist/style.css';

app.use(ieDialog);

<ie-dialog
    v-model:imgSrc="state.imageUrl"
    v-model:visible="state.show"
    @result="editOnChange"
/>
```
