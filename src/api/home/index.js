import request from '../../libs/utils/request';
import store from '@/store/index';
// const BASE_URL = 'https://easy-mock.com/mock/5a65b37707c2c26fa621b84a/leasing-api';    //
import BASE_URL from '@/api/config.js';

// 请求联网设备列表
export function requestWaitPosition(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/reference/positioning`,
        method: 'post',
        data: obj
    })
}
//  关机预警
export function requestCloseWarning(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/warning/closed/customer/count`,
        method: 'post',
        data: obj
    })
}
// 位移预警
export function requestMoveWarning(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/warning/moving/equipment/count`,
        method: 'post',
        data: obj
    })
}

// 稼动率预警
export function requestUrWarning(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/warning/ur/customer/count`,
        method: 'post',
        data: obj
    })
}

// 设备联网
export function requestLinkEquipment(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/equipment/count`,
        method: 'post',
        data: obj
    })
}

// 锁机设备
export function requestLockedEquipment(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/equipment/locked/count`,
        method: 'post',
        data: obj
    })
}

// 观察户
export function requestObserver(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/observer/count`,
        method: 'post',
        data: obj
    })
}

// 法诉客户
export function requestLitigation(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/litigation/count`,
        method: 'post',
        data: obj
    })
}
// 客户分析
export function requestCustomerAnalysis(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/customer/analysis`,
        method: 'post',
        data: obj
    })
}

// 观察户分析
export function requestObserverAnalysis(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/observer/analysis`,
        method: 'post',
        data: obj
    })
}
// 法诉客户分析
export function requestLitigationAnalysis(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/litigation/analysis`,
        method: 'post',
        data: obj
    })
}

export function getInstallFinish(obj) {
    return request({
        url: `${BASE_URL}/index/statistics/install/finish`,
        method: 'post',
        data: obj
    })
}
