import request from '@/libs/utils/request';

import BASE_URL from '@/api/config.js';
// /task/execute/record/pg
// 任务执行记录分页查询
export function getTaskList(obj) {
	return request({
        url: `${BASE_URL}/task/execute/record/pg`,
		method: `post`,
		data: obj
	})
}
// /task/execute/record/count
// 任务执行记录统计
export function getTaskCount() {
	return request({
        url: `${BASE_URL}/task/execute/record/count`,
		method: `get`
	})
}

// /task/execute/record/{ids}
// 批量删除任务执行记录
export function deleteTasks(ids) {
	return request({
        url: `${BASE_URL}/task/execute/record/${ids}`,
		method: `delete`
	})
}