import service from '@/http/request';

export const getProjectList = async (data?) => {
    return service({
        url: '/projects',
        method: 'get',
        data
    });
};
