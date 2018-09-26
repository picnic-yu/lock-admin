import request from '../../../libs/utils/request';
import store from '@/store/index';
// const BASE_URL = 'https://easy-mock.com/mock/5a65b37707c2c26fa621b84a/leasing-api';    //
import BASE_URL from '@/api/config.js';
//添加属性
export function addProperty(obj) {
	return request({
        url: `${BASE_URL}/sys/properties/`,
		method: 'post',
		data: obj
	})
}

export function queryProperty(obj) {
    return request({
        url: `${BASE_URL}/sys/properties/pg`,
		method: 'post',
		data: obj
    })
}

// 更新属性
export function updateProperty(id,obj) {
	return request({
        url: `${BASE_URL}/sys/properties/` + id,
		method: 'put',
		data: obj
	})
}
// 删除属性
export function deleteProperty(id) {
	return request({
        url: `${BASE_URL}/sys/properties/` + id,
		method: 'delete'
	})
}