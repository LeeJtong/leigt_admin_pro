<template>
    <div>
        <!-- <el-menu :default-active="activeMenu" :ellipsis="false" router>
                        <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                            <span>{{ item.meta.title }}</span>
                        </el-menu-item>
                    </el-menu> -->
        <el-menu :default-active="activeMenu" :ellipsis="false" router>
            <template v-for="item in menuList" :key="item.path">
                <el-menu-item v-if="!item.children" :index="item.path">
                    <span>{{ item.meta!.title }}</span>
                </el-menu-item>
                <el-sub-menu v-else :index="item.path">
                    <template #title>
                        <span>{{ item.meta?.title }}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                        <span>{{ subItem.meta!.title }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
// const menuList = router.getRoutes().filter((route) => {
//     return route.meta.isShow;
// });

const menuList = router.options.routes[0].children?.filter((item) => {
    return item.meta?.isShow;
});
// console.log('menuList', menuList);

const activeMenu = route.path;
</script>

<style lang="less" scoped>
.el-menu {
    height: 100%;
}
</style>
