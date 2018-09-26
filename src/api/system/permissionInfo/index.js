import request from '../../../libs/utils/request';
import BASE_URL from '@/api/config.js';
export function addPermission(obj) {
	return request({
		url: `${BASE_URL}/permissions/`,
		method: 'post',
		data: obj
	})
}
export function queryPermission(obj) {
	return request({
		url: `${BASE_URL}/permissions/pg`,
		method: 'post',
		data: obj
	})
}

export function updataPermission(id,obj) {
	return request({
		url: `${BASE_URL}/permissions/${id}`,
		method: 'put',
		data: obj
	})
}
export function deletePermission(id) {
	return request({
		url: `${BASE_URL}/permissions/${id}`,
		method: 'delete'
	})
}

// 分配权限资源
export function distributeResource(id,obj) {
	return request({
		url: `${BASE_URL}/permissions/${id}/resources`,
		method: 'put',
		data: obj
	})
}
// permissions/tree/{id}
export function getPermissionsTree(id) {
	return request({
		url: `${BASE_URL}/permissions/tree/${id}`,
		method: 'get'
	})
}