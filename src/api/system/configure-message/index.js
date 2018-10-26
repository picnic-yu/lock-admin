import request from '../../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';


// /messages/
// 加载短信配置
export function getMessages() {
    return request({
        url: `${BASE_URL}/messages/`,
		method: `get`
	})
}

// /messages/
// 保存短信配置

export function saveMessage(obj) {
    return request({
        url: `${BASE_URL}/messages/`,
		method: `post`,
		data: obj
	})
}
// /messages/test
// 测试发送
export function testMessages(obj) {
    return request({
        url: `${BASE_URL}/messages/test`,
		method: `post`,
		data: obj
	})
}

//参数保存
export function saveParams(obj) {
    return request({
        url: `${BASE_URL}/messages/params/`,
		method: `post`,
		data: obj
	})
}
// 参数更新
export function updateParams(obj) {
    return request({
        url: `${BASE_URL}/messages/params/`,
		method: `put`,
		data: obj
	})
}
//查询参数列表
export function requestParamsList(obj) {
	return request({
        url: `${BASE_URL}/messages/list`,
		method: `post`,
		data: obj
	})
}

//短信分页查询
export function requestMessageList(obj) {
	return request({
        url: `${BASE_URL}/pg`,
		method: `post`,
		data: obj
	})
}

// 获取模板列表
export function getMessagesTemplate(obj) {
	return request({
        url: `${BASE_URL}/messages/template/list`,
		method: `post`,
		data: obj
	})
}


// 启用/禁用模板
export function deleteMessagesTemplate(id) {
	return request({
        url: `${BASE_URL}/messages/templates/${id}`,
		method: `delete`
	})
}
// /messages/templates/
// 编辑模板
export function updateMessagesTemplate(obj) {
	return request({
        url: `${BASE_URL}/messages/templates/`,
		method: `put`,
		data:obj
	})
}
