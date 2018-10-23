import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /unlock/record/pg
// 开关锁记录分页查询
export function getUnlockList(obj) {
	return request({
        url: `${BASE_URL}/unlock/record/pg`,
		method: `post`,
		data: obj
	})
}
// /unlock/record/count
// 开关锁记录统计
export function getUnlockCount() {
	return request({
        url: `${BASE_URL}/unlock/record/count`,
		method: `get`
	})
}

// /unlock/record/{ids}
// 批量删除开关锁记录
export function deleteUnlock(ids) {
	return request({
        url: `${BASE_URL}/unlock/record/${ids}`,
		method: `delete`
	})
}