import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /certification/pg
// 实名认证分页查询
export function getCertifications(obj) {
	return request({
        url: `${BASE_URL}/certification/pg`,
		method: `post`,
		data: obj
	})
}

// task统计
export function getTaskManageCount() {
	return request({
        url: `${BASE_URL}/task/count`,
		method: `get`
	})
}

// /certification/{ids}

export function deleteCertifications(ids) {
	return request({
        url: `${BASE_URL}/certification/${ids}`,
		method: `delete`
	})
}


// /certification/{id}
// 根据ID查询
export function getCertificationInfo(id) {
	return request({
        url: `${BASE_URL}/certification/${id}`,
		method: `get`
	})
}
// /certification/
// 实名认证编辑/审核通过/不予通过
export function editCertification(obj) {
	return request({
        url: `${BASE_URL}/certification/`,
		method: `put`,
		data: obj
	})
}