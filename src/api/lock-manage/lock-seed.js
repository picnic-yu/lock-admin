import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /lock/seed/pg
// 锁具种子分页查询
export function getLockSeed(obj) {
	return request({
        url: `${BASE_URL}/lock/seed/pg`,
		method: `post`,
		data: obj
	})
}
// /lock/seed/{id}
// 根据ID查询
export function getLockSeedInfo(id) {
	return request({
        url: `${BASE_URL}/lock/seed/${id}`,
		method: `get`
	})
}
// /lock/seed/
// 修改锁具种子
export function updateLockSeedInfo(obj) {
	return request({
        url: `${BASE_URL}/lock/seed/`,
        method: `put`,
        data:obj
	})
}

// /lock/seed/{id}
// 删除锁具种子
export function deletelockSeed(id) {
	return request({
        url: `${BASE_URL}/lock/seed/${id}`,
		method: `delete`
	})
}

// /lock/seed/send
// 批量分发
export function sendSeed(obj) {
	return request({
        url: `${BASE_URL}/lock/seed/send`,
		method: `post`,
		data: obj
	})
}