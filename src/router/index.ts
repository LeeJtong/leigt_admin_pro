import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getTitle } from '@/utils';
import { useSettingStore } from '@/store/setting';

// 配置路由
// const routes: Array<RouteRecordRaw> = [{
//   path: '/',
//   name: 'Home',
//   component: () => import('@/views/home/index.vue'),
//   meta: {},
//   children: [],
// }];

export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式  import.meta.glob 函数可以动态导入多个模块，并返回一个对象。这里导入的是modules目录下所有ts文件
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});

const routes: Array<RouteRecordRaw> = [];
// 配置路由 将路由全部导入数组中
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);

//导入生成的路由数据
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 白名单
const noStatusPage = ['/login', '/about'];
// 面包屑
const settingStore = useSettingStore();
const handlerRouters = (currentName: string) => {
    // console.log('currentName', currentName);
    // console.log('router.getRoutes()', router.getRoutes());
    const currentNameZH = router.getRoutes().find((route) => route.name === currentName)?.meta.title as string;
    const titles = getTitle(currentName, router.getRoutes(), currentNameZH);
    // console.log(titles, 'titles');
    settingStore.setTitle(titles);
};

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    // 从 sessionStorage 中获取用户信息（token）
    const token = sessionStorage.getItem('userInfo');
    // console.log(token, 'token');

    // 判断用户是否已登录（通过检查 token 是否存在）
    const userIsLogin = token ? true : false;

    // 如果用户已登录 或者 访问的是不需要登录的页面（noStatusPage 中的页面可以理解为是不需要token就可以访问的）
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        // console.log(userIsLogin, 'userIsLogin');

        next(); // 允许路由跳转
    } else {
        next('/login'); // 未登录则重定向到登录页
    }
    // 面包屑
    handlerRouters(_to.name as string);
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;
