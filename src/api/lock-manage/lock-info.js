import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
//lockInfo/pg
export function getLockInfo(obj) {
	return request({
        url: `${BASE_URL}/lockInfo/pg`,
		method: `post`,
		data: obj
	})
}
// /lockInfo/{id}/binding/staff
// 根据锁具id获取锁具绑定人员
export function getBindingStaff(id) {
	return request({
        url: `${BASE_URL}/lockInfo/${id}/binding/staff`,
		method: `get`
	})
}
// /lockInfo/{id}
// 启用/禁用锁具
export function deletelockInfo(id) {
	return request({
        url: `${BASE_URL}/lockInfo/${id}`,
		method: `delete`
	})
}


// /lockInfo/{id}
// 根据锁具ID查询
export function getLockInfoById(id) {
	return request({
        url: `${BASE_URL}/lockInfo/${id}`,
		method: `get`
	})
}
// /lockInfo/staff/
// 添加锁具人员绑定
export function bindlockStall(obj) {
	return request({
        url: `${BASE_URL}/lockInfo/staff/`,
		method: `post`,
		data: obj
	})
}
// /lockInfo/staff/{id}
// 删除锁具人员绑定
export function deleteBindStaff(id) {
	return request({
        url: `${BASE_URL}/lockInfo/staff/${id}`,
		method: `delete`
	})
}
// /lockInfo/
// 修改锁具
export function updateLockinfo(obj) {
	return request({
        url: `${BASE_URL}/lockInfo/`,
		method: `put`,
		data: obj
	})
}

// /lockInfo/list
// 锁具列表
export function getLockinfoList(obj) {
	return request({
        url: `${BASE_URL}/lockInfo/list`,
		method: `post`,
		data: obj
	})
}