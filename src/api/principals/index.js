import request from '@/libs/utils/request';
import BASE_URL from '@/api/config.js';
// 获取用户信息
export function getPrincipals(obj) {
	return request({
		url: `${BASE_URL}/principals/list`,
		method: 'post',
		data:obj
	})
}

// 获取用户分页查询列表
export function getPrincipalList(obj) {
	return request({
		url: `${BASE_URL}/principals/pg`,
		method: 'post',
		data:obj
	})
}
// 新增部门用户
export function addUserByOrganizationId(obj) {
	return request({
		url: `${BASE_URL}/principals/`,
		method: 'post',
		data: obj
	})
}
// 修改部门用户
export function updateUserByOrganizationId(obj) {
	return request({
		url: `${BASE_URL}/principals/`,
		method: 'put',
		data: obj
	})
}

// 获取当前登录用户
export function getLoginPrincipal(obj) {
	return request({
		url: `${BASE_URL}/principals/login`,
		method: 'get'
	})
}

// 获取组织管理员
export function getAdminByOrganizationId(organizationId) {
    return request({
        url: `${BASE_URL}/principals/${organizationId}/admin`,
        method: 'get'
    })
}

// 获取组织管理员
export function getRoleListOfOrganization() {
    return request({
        url: `${BASE_URL}/principals/organization/roles`,
        method: 'get'
    })
}

// 查看用户名是否存在
export function checkUserName(obj) {
    return request({
        url: `${BASE_URL}/principals/check/`,
        method: 'post',
        data: obj
    })
}