<template>
    <div class="container">
        <ElForm ref="formRef"> </ElForm>
        <div>11</div>
    </div>
    <tag :text="text" :theme="theme"></tag>
</template>

<script lang="ts" setup>
import { useCompRef } from '@/hooks/useCompRef';
import { ElForm } from 'element-plus';
import { ref } from 'vue';
// import tag from '@/components/auto/diyTag.vue';

const formRef = useCompRef<typeof ElForm>();
const text = ref('123');
const theme = ref('#ccc');
</script>

<style lang="less" scoped>
.container {
    font-size: @font-size;
    color: @color;
    background-color: @bg;
}
</style>
