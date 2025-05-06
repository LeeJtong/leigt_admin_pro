import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin, refreshUserInfo } from '@/api/user';
import router from '@/router';

export interface UserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: Array<string>;
}

export type LoginRequest = {
    username: string;
    password: string;
};

export const useUserStoreHook = defineStore('userInfo', {
    state: (): UserState => ({
        username: 'GingTung',
        accessToken: '',
        roles: ['common']
    }),
    getters: {},
    actions: {
        // 用户登录
        storeUserLogin(data: LoginRequest) {
            console.log('调用');
            return userLogin(data).then((res) => {
                console.log(res, 'store的');
                this.username = res.data.username;
                this.roles = res.data.roles;
                this.accessToken = res.data.accessToken;
                return res;
            });
        },
        // 用户登出
        logout() {
            sessionStorage.removeItem('userInfo');
            this.accessToken = '';
            router.push('/login');
        },
        // 刷新用户信息
        storeRefreshUserInfo() {
            // 修正拼写错误 stroe -> store
            if (this.username === 'GingTung' && this.accessToken !== '') {
                refreshUserInfo({
                    accessToken: this.accessToken
                })
                    .then((res) => {
                        this.username = res.data.username;
                        this.roles = res.data.roles;
                        this.accessToken = res.data.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = '';
                    });
            }
        },
        test(data?: any) {
            console.log('测试', data);
        }
    },
    // 持久化配置
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        paths: ['accessToken']
    }
});

// 导出该Store
export function useUserStore() {
    return useUserStoreHook(pinia);
}
