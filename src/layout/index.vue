<template>
    <el-config-provider :locale="locale">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Menu></Menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="item in settingStore.title" :key="item" :to="{ name: item.name }">
                            {{ item.currentNameZH }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-config-provider>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import Menu from './components/DiyMenu.vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/setting';

const settingStore = useSettingStore();
const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
    margin-bottom: 5px;
}

.el-container {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}

.el-breadcrumb {
    margin-bottom: 10px;
}
</style>
