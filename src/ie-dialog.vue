<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-03 19:38:42
-->
<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-02 23:46:12
-->
<template>
    <div>12</div>
    <a-dialog
        v-model:model-value="data.a"
        :width="data.w + 'px'"
        @change="onChange"
    >
        <div class="wrapper">
            <div id="img-edit"></div>
            <div class="menu-wrap" @click.stop="handleMenu">
                <!-- <div class="menu-item" data-type="text">文字</div> -->
                <div class="menu-item" data-type="blur">模糊</div>
                <div class="menu-item" data-type="invert">反相</div>
                <div class="menu-item" data-type="enhance">深色</div>
                <div class="menu-item" data-type="grayscale">灰度</div>
                <div class="menu-item" data-type="posterize">分色</div>
                <div class="menu-item" data-type="sepia">深褐</div>

                <div class="menu-item" data-type="reset">还原</div>
            </div>
        </div>
    </a-dialog>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import Konva from 'konva';
import { debounce } from 'lodash-es';
import aDialog from '@/components/dialog.vue';
import tt from '@/assets/test.jpeg';
const data = reactive({
    a: true,
    w: 500,
    padding: 15,
});
let stage = null;
let kImg = null;

onMounted(() => {
    stage = new Konva.Stage({
        container: '#img-edit', // id of container <div> *包裹舞台的DIV元素的ID
        width: data.w,
        height: 370,
    });
    // 背景绘制
    const imgLayer = new Konva.Layer();
    const imgInfo = new Image();

    imgInfo.onload = function () {
        const cnavasH = (data.w * imgInfo.height) / imgInfo.width;
        const scale = imgInfo.width / imgInfo.height;
        stage.setAttrs({
            height: cnavasH / scale,
        });
        kImg = new Konva.Image({
            x: 0,
            y: 0,
            image: imgInfo,
            width: data.w - data.padding * 2,
            height: cnavasH / scale,
        });

        // kImg.cache();
        // kImg.filters([Konva.Filters.Threshold]);
        // kImg.threshold(0.1);
        // add the shape to the layer
        imgLayer.add(kImg);
        imgLayer.batchDraw();
    };
    imgInfo.src = tt;
    // 'https://www.gelifood.com/upload/goods/20220415/6300790574881aa47673e61649986298goods_img.png';

    stage.add(imgLayer);
});

const handleMenu = debounce(function (event) {
    const typeObj = event.target.dataset || event.srcElement.dataset;
    if (!typeObj || !typeObj.type) throw new Error('type is undefined');
    if (!kImg) throw new Error('kImg is null');
    console.log(typeObj);
    switch (typeObj.type) {
        case 'text':
            var layer = new Konva.Layer();
            let addText = new Konva.Text({
                x: 19,
                y: 15,
                text: 'Simple Text',
                fontSize: 30,
                fontFamily: 'Calibri',
                fill: 'green',
            });
            layer.add(addText);
            stage.add(layer);
            break;
        case 'blur':
            kImg.cache();
            kImg.filters([Konva.Filters.Blur]);
            kImg.blurRadius(10);
            break;
        case 'invert':
            kImg.cache();
            kImg.filters([Konva.Filters.Invert]);
            break;
        case 'enhance':
            kImg.cache();
            kImg.filters([Konva.Filters.Enhance]);
            kImg.enhance(0.4);
            break;
        case 'grayscale':
            console.log('grayscale');
            kImg.cache();
            kImg.filters([Konva.Filters.Grayscale]);
            break;
        case 'posterize':
            kImg.cache();
            kImg.filters([Konva.Filters.Posterize]);
            kImg.levels(0.8); // between 0 and 1
            break;
        case 'sepia':
            kImg.cache();
            kImg.filters([Konva.Filters.Sepia]);
            break;
        case 'reset':
            kImg.filters([]);
            kImg.batchDraw();
            break;
        default:
            break;
    }
}, 300);

const onChange = (key) => {
    try {
        console.log(key);
        const img = stage
            ? stage[key]({
                  mimeType: 'image/png', // the output format
                  quality: 1, // the quality of the output image (0–1)
                  pixelRatio: 1, // the pixel ratio of the canvas
              })
            : null;

        console.log(img);
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    .menu-wrap {
        width: 26px;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        .menu-item {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            margin-bottom: 4px;
            font-size: 12px;
            color: #333;
            border-radius: 4px;
            padding: 0 4px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.8);
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
