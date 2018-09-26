import request from '../../libs/utils/request';
import store from '@/store/index';
// const BASE_URL = 'https://easy-mock.com/mock/5a65b37707c2c26fa621b84a/leasing-api';    //
import BASE_URL from '@/api/config.js';
//新增字典
export function addLookupValues(obj) {
	return request({
        url: `${BASE_URL}/lookupValues/lookupValues`,
		method: 'post',
		data: obj
	})
}

// 更新字典
export function updateLookupValues(id,obj) {
	return request({
        url: `${BASE_URL}/lookupValues/lookupValues/${id}`,
		method: 'put',
		data: obj
	})
}
// 删除字典
export function deleteLookupValues(id) {
	return request({
        url: `${BASE_URL}/lookupValues/lookupValues/${id}`,
		method: 'delete'
	})
}

