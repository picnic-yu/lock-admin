import request from '../../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';

//短信保存
export function saveMessage(obj) {
    return request({
        url: `${BASE_URL}/mails/message`,
		method: `post`,
		data: obj
	})
}
//参数保存
export function saveParams(obj) {
    return request({
        url: `${BASE_URL}/mails/param`,
		method: `post`,
		data: obj
	})
}

//查询参数列表
export function requestParamsList(obj) {
	return request({
        url: `${BASE_URL}/mails/list`,
		method: `post`,
		data: obj
	})
}

//短信分页查询
export function requestMessageList(obj) {
	return request({
        url: `${BASE_URL}/mails/pg`,
		method: `post`,
		data: obj
	})
}

