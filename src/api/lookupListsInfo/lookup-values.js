import request from '../../libs/utils/request';
import store from '@/store/index';
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

