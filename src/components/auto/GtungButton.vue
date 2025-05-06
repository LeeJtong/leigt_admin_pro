<template>
    <div class="znak_button-box">
        <button class="znak_button" type="button">
            <span ref="textRef" class="znak_button__text">
                <slot></slot>
            </span>
            <span ref="iconRef" class="znak_button__icon">
                <img :src="icon" alt="" />
            </span>
        </button>
    </div>
</template>
<script lang="ts">
export default {
    name: 'ZnakButton'
};
</script>
<script setup lang="ts" name="znak_button">
import ImportIcon from '@/assets/btn_icon/import.svg';
import AddIcon from '@/assets/btn_icon/add.svg';
import DeleteIcon from '@/assets/btn_icon/delete.svg';
import DownloadIcon from '@/assets/btn_icon/download.svg';
import UploadIcon from '@/assets/btn_icon/upload.svg';
import ExportIcon from '@/assets/btn_icon/export.svg';
import EditIcon from '@/assets/btn_icon/edit.svg';
import SearchIcon from '@/assets/btn_icon/search.svg';
import ClearIcon from '@/assets/btn_icon/clear.svg';
import Back from '@/assets/btn_icon/back.svg';
import Submit from '@/assets/btn_icon/submit.svg';
import { computed, nextTick, onMounted, ref } from 'vue';

interface I_props {
    icons:
        | 'Import'
        | 'Add'
        | 'Delete'
        | 'Download'
        | 'Export'
        | 'Edit'
        | 'Search'
        | 'Clear'
        | 'Upload'
        | 'Submit'
        | 'Back'
        | '';
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'pink' | 'sending';
}

const props = withDefaults(defineProps<I_props>(), {
    icons: '',
    type: 'primary'
});

enum color {
    // "primary" = "#0175de",
    'primary' = '#00945a',
    'success' = '#85e86a',
    'warning' = '#d58005',
    'danger' = '#c02626',
    'info' = '#c0bfbf',
    'pink' = '#a887e8',
    'sending' = '#5053ff'
}

const icon_list = {
    Import: ImportIcon,
    Delete: DeleteIcon,
    Download: DownloadIcon,
    Add: AddIcon,
    Export: ExportIcon,
    Edit: EditIcon,
    Clear: ClearIcon,
    Search: SearchIcon,
    Upload: UploadIcon,
    Back: Back,
    Submit: Submit
};

const textRef = ref<Element | any>();
const iconRef = ref<Element | any>();
const buttonWidth = ref((window.innerWidth / 1920) * 85 + 'px');
//
const icon = computed(() => icon_list[props.icons]);
const bg_color = computed(() => color[props.type]);
const border_color = computed(() => darkenColor(bg_color.value, 13));
const hover_color = computed(() => darkenColor(bg_color.value, 16));
const action_color = computed(() => darkenColor(bg_color.value, 30));

const darkenColor = (color: string, percent: number) => {
    color = color.replace('#', '');
    let num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        G = ((num >> 8) & 0x00ff) - amt,
        B = (num & 0x0000ff) - amt;
    return (
        '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0)).toString(16).slice(1)
    );
};

onMounted(() => {
    console.log(window.innerWidth);
    setTimeout(() => {
        nextTick(() => {
            buttonWidth.value = textRef.value?.clientWidth + iconRef.value?.clientWidth + 'px';
        });
    });
});
</script>
<style scoped lang="less">
.znak_button-box {
    display: inline-block;
    margin: 0 2px;
}
.znak_button {
    display: flex;
    height: 32px;
    background: v-bind(bg_color);
    border: 1px solid v-bind(border_color) !important;
    border-radius: 4px;
    padding: 0;
    width: v-bind(buttonWidth);
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    .znak_button__text {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        padding: 6px 16px;
        color: #ffffff;
        z-index: 0;
        font-size: 12px;
    }

    .znak_button__icon {
        position: absolute;
        right: 0;
        z-index: 1;
        height: 100%;
        width: 32px;
        background: v-bind(border_color);
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 16px;
        }
    }
}

.znak_button:hover {
    background: v-bind(border_color);

    .znak_button__text {
        color: transparent;
    }

    .znak_button__icon {
        width: calc(v-bind(buttonWidth) - 1px);
        transform: translateX(0);
        border-radius: 4px;
        transition: all 0.3s;
    }
}

.znak_button:active {
    border: 1px solid v-bind(action_color) !important;
    transition: all 0.1s;
    .znak_button__icon {
        background: v-bind(hover_color);
        transition: all 0.1s;
    }
}
</style>
