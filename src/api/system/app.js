import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /app/version/list
// 版本列表
export function getAppList() {
	return request({
        url: `${BASE_URL}/app/version/list`,
		method: `get`
	})
}

