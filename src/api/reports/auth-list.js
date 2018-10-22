import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /authorization/record/pg
// 授权记录分页查询
export function getAuthList(obj) {
	return request({
        url: `${BASE_URL}/authorization/record/pg`,
		method: `post`,
		data: obj
	})
}
// /authorization/record/count
// 授权记录统计
export function getRecordCount() {
	return request({
        url: `${BASE_URL}/authorization/record/count`,
		method: `get`
	})
}

// /authorizat/ion/record/{ids}
// 批量删除授权记录
export function deleteRecord(ids) {
	return request({
        url: `${BASE_URL}/authorization/record/${ids}`,
		method: `delete`
	})
}