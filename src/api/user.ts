import { LoginRequest, LoginResponse, reLoginRequest } from './user/type';
import service from '@/http/request';

// 定义的接口

export function userLogin(data: LoginRequest) {
    return service({
        url: '/login',
        method: 'POST',
        data
    });
}

//  获取所有的用户
export function getUserList(data?) {
    return service({
        url: '/getUserList',
        method: 'get',
        data
    });
}

export function refreshUserInfo(data?: reLoginRequest) {
    return service({
        url: '/getUserList',
        method: 'get',
        data
    });
}
