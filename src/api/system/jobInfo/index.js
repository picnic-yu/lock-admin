import request from '../../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';
//添加计划任务
export function addJob(obj) {
	return request({
        url: `${BASE_URL}/job/`,
		method: `post`,
		data: obj
	})
}
//计划任务列表
export function queryJob(obj) {
    return request({
        url: `${BASE_URL}/job/pg`,
		method: `post`,
		data: obj
    })
}

// 更新计划任务
export function updateJob(id,obj) {
	return request({
        url: `${BASE_URL}/job/${id}`,
		method: `put`,
		data: obj
	})
}
// 删除计划任务
export function deleteJob(id) {
	return request({
        url: `${BASE_URL}/job/${id}`,
		method: `delete`
	})
}
//切换任务状态
export function changeStatus(id,status) {
    return request({
        url: `${BASE_URL}/job/${id}/status/${status}`,
        mothod: `get`
    })
}

//计划实体列表
export function queryBeanNameList() {
	return request({
        url: `${BASE_URL}/job/name/list`,
		method: `post`
	})
}
//根据id查计划任务
export function getJobById(id) {
    return request({
        url: `${BASE_URL}/job/${id}`,
        mothod: `get`
    })
}