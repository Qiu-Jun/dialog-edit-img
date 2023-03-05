<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-05 20:39:30
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
        @result="editOnChange"
    >
    </ie-dialog>
</template>

<script setup>
import { ref } from 'vue';
const ieDialogRef = ref(null);
const imgData = ref(null);
const onChange = (e) => {
    const imgFile = e.target.files[0];
    const readerBlob = URL.createObjectURL(imgFile);
    imgData.value = readerBlob;
};

const editOnChange = (e) => {
    console.log(e);
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
