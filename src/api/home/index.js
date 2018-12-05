import request from '../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';

// 统计
export function getTotal() {
    return request({
        url: `${BASE_URL}/index/total`,
        method: 'get'
    })
}
// 区域tree
export function getOrgTree() {
    return request({
        url: `${BASE_URL}/index/org/tree`,
        method: 'get'
    })
}

// 区域tree
export function getOrgLockMap(obj) {
    return request({
        url: `${BASE_URL}/index/org/lock/map`,
        method: 'post',
        data: obj
    })
}


