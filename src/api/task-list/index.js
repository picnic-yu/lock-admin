import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /task/pg
// 任务分页查询
export function getTaskByPg(obj) {
	return request({
        url: `${BASE_URL}/task/pg`,
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

// /task/{ids}
// 删除任务执行记录
export function deleteTaskByIds(ids) {
	return request({
        url: `${BASE_URL}/task/${ids}`,
		method: `delete`
	})
}


// /task/
// 新增任务
export function addTask(obj) {
	return request({
        url: `${BASE_URL}/task/`,
		method: `post`,
		data: obj
	})
}

// /task/
// 编辑任务
export function editTask(obj) {
	return request({
        url: `${BASE_URL}/task/`,
		method: `put`,
		data: obj
	})
}