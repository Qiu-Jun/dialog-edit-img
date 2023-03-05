<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-06 00:14:24
-->
<template>
    <label for="pic">选择图片:</label>

    <input
        id="pic"
        type="file"
        name="pic"
        accept="image/*"
        @change="onChange"
    />

    <ie-dialog
        ref="ieDialogRef"
        v-model:imgSrc="imgData"
        v-model:visible="show"
        @result="editOnChange"
    >
    </ie-dialog>
</template>

<script setup>
import { ref } from 'vue';
const ieDialogRef = ref(null);
const imgData = ref(null);

const show = ref(false);

const onOpen = () => {
    show.value = true;
};
const onClose = () => {
    show.value = false;
};

const onChange = (e) => {
    try {
        console.log('9999');
        const imgFile = e.target.files[0];
        const readerBlob = URL.createObjectURL(imgFile);
        console.log(readerBlob);
        imgData.value = readerBlob;
        show.value = true;
        console.log(imgData.value, show.value);
    } catch (error) {
        console.log(error);
    }
};

const editOnChange = (e) => {
    console.log(e);
    onClose();
};
</script>

<style scoped>
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: 0.4rem 0;
}
</style>
