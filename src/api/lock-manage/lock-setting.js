import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
//lockInfo/pg
export function getLockSettingInfo(obj) {
	return request({
        url: `${BASE_URL}/lock/group/pg`,
		method: `post`,
		data: obj
	})
}

// /lock/group/{id}/details
// 根据顺序开锁ID查询开锁明细
export function getGroupDetails(id) {
	return request({
        url: `${BASE_URL}/lock/group/${id}/details`,
		method: `get`
	})
}
// /lock/group/{id}
// 根据顺序开锁ID查询基本信息
export function getGroupInfo(id) {
	return request({
        url: `${BASE_URL}/lock/group/${id}`,
		method: `get`
	})
}

// /lock/group/{id}
// 删除顺序开锁
export function deleteGroup(id) {
	return request({
        url: `${BASE_URL}/lock/group/${id}`,
		method: `delete`
	})
}
// /lock/group/details/
// 新增顺序开锁明细
export function addGroupDetail(obj) {
	return request({
        url: `${BASE_URL}/lock/group/details/`,
		method: `post`,
		data: obj
	})
}
// /lock/group/
// 新增顺序开锁
export function addGroup(obj) {
	return request({
        url: `${BASE_URL}/lock/group/`,
		method: `post`,
		data: obj
	})
}
// /lock/group/
// 修改顺序开锁
export function updateGroup(obj) {
	return request({
        url: `${BASE_URL}/lock/group/`,
		method: `put`,
		data: obj
	})
}
// /lock/group/details/{id}
// 删除开锁明细
export function deleteGroupDetails(id) {
	return request({
        url: `${BASE_URL}/lock/group/details/${id}`,
		method: `delete`
	})
}












