import request from '../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';


// 请求所属组织
export function requestOrganizationList(obj) {
    return request({
        url: `${BASE_URL}/organizations/list`,
        method: 'post',
        data: obj
    })
}
// 远程加载客户
export function requestCustomerSelect(obj) {
    return request({
        url: `${BASE_URL}/customer/list`,
        method: 'post',
        data: obj
    })
}
// 远程加载公司
export function requestCompanySelect(obj) {
    return request({
        url: `${BASE_URL}/organizations/list`,
        method: 'post',
        data: obj
    })
}
// 远程加载供应商
export function requestSupplierSelect(obj) {
    return request({
        url: `${BASE_URL}/supplier/list`,
        method: 'post',
        data: obj
    })
}
// 远程加载合同编号
export function requestContractSelect(obj) {
    return request({
        url: `${BASE_URL}/contract/list`,
        method: 'post',
        data: obj
    })
}



// 校验客户统一社会信用代码
export function checkCustomerSocialUnityCd(num) {
    return request({
        url: `${BASE_URL}/customer/socialUnityCd/${num}`,
        method: 'get',
    })
}
// 校验供应商统一社会信用代码
export function checkSupplierSocialUnityCd(num) {
    return request({
        url: `${BASE_URL}/supplier/socialUnityCd/${num}`,
        method: 'get',
    })
}
// 校验合同编号
export function checkContractNumber(num) {
    return request({
        url: `${BASE_URL}/contract/contractNumber/${num}`,
        method: 'get',
    })
}
// 校验申请单编号
export function checkInstallNumber(num) {
    return request({
        url: `${BASE_URL}/install/applications/applicationNumber/${num}`,
        method: 'get',
    })
}

// 获取位置信息
export function requestGetAddress(obj) {
    return request({
        url: `${BASE_URL}/customer/address/resolve`,
        method: 'post',
        data:obj
    })
}
// 获取设备位置信息
export function requestGetEquAddress(obj) {
    return request({
        url: `${BASE_URL}/unEquipment/address/resolve`,
        method: 'post',
        data: obj
    })
}

// 获取合同列表
export function requestCustomerContract(obj) {
    return request({
        url: `${BASE_URL}/contract/list`,
        method: 'post',
        data: obj
    })
}