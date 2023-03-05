<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-05 22:50:40
-->
<template>
    <c-dialog
        ref="ieDialog"
        v-model:model-value="show"
        :width="props.canvasW + 'px'"
        @on-confirm="onConfirm"
        @close="onClose"
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
    </c-dialog>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed, watchEffect } from 'vue';
import Konva from 'konva';
import { debounce } from 'lodash-es';
import cDialog from './components/dialog.vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    outType: {
        type: String,
        default: 'toDataURL', // toDataURL, toBlob, toJSON  konva支持的导出类型
    },
    canvasW: {
        type: [String, Number],
        default: 500,
    },
    imgH: {
        type: Number,
        default: 370,
    },
    imgSrc: {
        type: String,
        default: '',
    },
});

const emits = defineEmits(['update:imgSrc', 'updata:visible', 'result']);
const show = computed(() => props.visible);
const ieDialog = ref<InstanceType<typeof cDialog> | null>(null);

let stage: any = null;
let kImg: any = null;

const init = () => {
    const w: number = ~~props.canvasW;
    stage = new Konva.Stage({
        container: '#img-edit', // id of container <div> *包裹舞台的DIV元素的ID
        width: w,
        height: props.imgH,
    });
    // 背景绘制
    const imgLayer = new Konva.Layer();
    const imgInfo = new Image();

    imgInfo.onload = function () {
        const cnavasH = (w * imgInfo.height) / imgInfo.width;
        const scale = imgInfo.width / imgInfo.height;
        stage.setAttrs({
            height: cnavasH / scale,
        });
        kImg = new Konva.Image({
            x: 0,
            y: 0,
            image: imgInfo,
            width: w,
            height: cnavasH / scale,
        });
        imgLayer.add(kImg);
        imgLayer.batchDraw();
    };
    imgInfo.src = props.imgSrc;
    stage.add(imgLayer);
};

const open = (img: string) => {
    if (!img) return;
    nextTick(init);
};

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

const onClose = () => {
    emits('update:imgSrc', null);
};

const onConfirm = async () => {
    const type = props.outType;
    try {
        const img = stage
            ? await stage[type]({
                  mimeType: 'image/png', // the output format
                  quality: 1, // the quality of the output image (0–1)
                  pixelRatio: 1, // the pixel ratio of the canvas
              })
            : null;
        emits('result', img);
        ieDialog.value?.close();
        emits('updata:visible', false);
    } catch (error) {
        console.log(error);
    }
};

watchEffect(() => {
    if (props.visible) {
        nextTick(init);
    }
});

defineExpose({
    open,
});
</script>

<style lang="scss" scoped>
.wrapper {
    .menu-wrap {
        width: 36px;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        .menu-item {
            display: inline-block;
            text-align: center;
            margin-bottom: 4px;
            font-size: 12px;
            color: #333;
            border-radius: 4px;
            padding: 2px 4px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.8);
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
