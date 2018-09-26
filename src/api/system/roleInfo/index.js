import request from '../../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';
// 新增角色
export function addRole(obj) {
	return request({
		url: `${BASE_URL}/roles/`,
		method: `post`,
		data: obj
	})
}
export function queryRole(obj) {
	return request({
		url: `${BASE_URL}/roles/pg`,
		method: `post`,
		data: obj
	})
}
// 更新角色
export function updataRole(id,obj) {
	return request({
		url: `${BASE_URL}/roles/` + id,
		method: `put`,
		data: obj
	})
}
// 删除角色
export function deleteRole(id) {
	return request({
		url: `${BASE_URL}/roles/` + id,
		method: `delete`
	})
}
// 获取角色授权
export function getPermissions(id) {
	return request({
		url: `${BASE_URL}/roles/`+id+`/permissions`,
		method: `get`
	})
}
// 分配权限
export function addPermissions(id,obj) {
	return request({
		url: `${BASE_URL}/roles/`+id+`/permissions`,
		method: `put`,
		data: obj
	})
}
// 获取角色树
export function getRoleTree() {
	return request({
		url: `${BASE_URL}/roles/tree`,
		method: `get`
	})
}
export function getAllRoles(obj) {
	return request({
		url: `${BASE_URL}/roles/all`,
        method: `post`,
        data: obj
	})
}



