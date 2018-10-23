import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';

// /login/record/pg
// 系统登录记录分页查询
export function getLoginlist(obj) {
	return request({
        url: `${BASE_URL}/login/record/pg`,
		method: `post`,
		data: obj
	})
}
// /login/record/count
// 系统登录记录统计
export function getLoginCount() {
	return request({
        url: `${BASE_URL}/login/record/count`,
		method: `get`
	})
}

// /login/record/{ids}
// 批量删除系统登录记录
export function deleteLoginRecord(ids) {
	return request({
        url: `${BASE_URL}/login/record/${ids}`,
		method: `delete`
	})
}