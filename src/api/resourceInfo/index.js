import request from '../../libs/utils/request';
import BASE_URL from '@/api/config.js';
export function addResource(pid) {
	return request({
		url: `${BASE_URL}/${pid}/resources`,
		method: 'post',
		data: obj
	})
}
// 获取资源树
export function queryResource() {
	return request({
		url: `${BASE_URL}/resources/tree`,
		method: 'get'
	})
}
// 更新资源
export function updataResource(obj) {
	return request({
		url: `${BASE_URL}/resources/`,
		method: 'put',
		data:obj
	})
}
// 删除资源
export function deleteResource(id) {
	return request({
		url: `${BASE_URL}/resources/${id}`,
		method: 'delete'
	})
}
export function addResourceTree(obj) {
	return request({
		url: `${BASE_URL}/resources/`,
		method: 'post',
		data:obj
	})
}


// 资源列表
export function getMenuList() {
	return request({
		url: `${BASE_URL}/resources/principal`,
		method: 'get'
	})
}
export function getButtonList () {
	return request({
		url: `${BASE_URL}/resources/list`,
		method: 'get'
	})
}