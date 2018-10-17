import request from '../libs/utils/request';
import BASE_URL from '@/api/config.js';
// 获取组织列表
export function getOrganizations(obj) {
	return request({
		url: `${BASE_URL}/organizations/list`,
		method: 'post',
		data:obj
	})
}
// 获取组织树
export function getOrganizationTrees() {
	return request({
		url: `${BASE_URL}/organizations/tree`,
		method: 'get'
	})
}
// 根据id获取组织
export function getOrganizationById(id) {
	return request({
		url: `${BASE_URL}/organizations/${id}`,
		method: 'get'
	})
}
// 新增组织
export function addOrganization(obj) {
	return request({
		url: `${BASE_URL}/organizations/`,
		method: 'post',
		data:obj
	})
}
// 删除组织
export function deleteOrganization(id) {
	return request({
		url: `${BASE_URL}/organizations/${id}`,
		method: 'delete'
	})
}

// 更新组织
export function updateOrganization(id, obj) {
	return request({
		url: `${BASE_URL}/organizations/${id}`,
		method: 'put',
		data: obj
	})
}

// 获取当前组织
export function getCurrentOrganization() {
	return request({
		url: `${BASE_URL}/organizations/current`,
		method: 'get'
	})
}
// /organizations/list
// 用户查询单位组
export function getOrgList(obj) {
	return request({
		url: `${BASE_URL}/organizations/list`,
		method: 'post',
		data:obj
	})
}


