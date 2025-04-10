import service from '@/http/request';

// 角色列表接口
export const getAuthList = async (data) => {
    return service({
        url: '/getAuthList',
        method: 'get' //post put del
    });
};
