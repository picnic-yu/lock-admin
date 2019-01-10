import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';

// /statistics/auth
// 远程授权统计

export function getAuthlist(obj) {
	return request({
        url: `${BASE_URL}/statistics/auth`,
		method: `post`,
		data: obj
	})
}
// /statistics/dormancy 锁具活跃度
export function getDormancylist(obj) {
	return request({
        url: `${BASE_URL}/statistics/dormancy`,
		method: `post`,
		data: obj
	})
}
// /statistics/open
// 锁具开启统计
export function getOpenlist(obj) {
	return request({
        url: `${BASE_URL}/statistics/open`,
		method: `post`,
		data: obj
	})
}
// /statistics/unlock
// 开锁人开锁统计
export function getUnlocklist(obj) {
	return request({
        url: `${BASE_URL}/statistics/unlock`,
		method: `post`,
		data: obj
	})
}

// /statistics/work/order
// 开锁工单统计
export function getOrderlist(obj) {
	return request({
        url: `${BASE_URL}/statistics/work/order`,
		method: `post`,
		data: obj
	})
}

// /organizations/list
// 用户查询单位组
export function getUserlist(obj) {
	return request({
        url: `${BASE_URL}/organizations/list`,
		method: `post`,
		data: obj
	})
}

// /statistics/search
export function getCount(obj) {
	return request({
        url: `${BASE_URL}/statistics/search`,
		method: `post`,
		data: obj
	})
}