import request from '../../libs/utils/request';
import BASE_URL from '@/api/config.js';
// 新增邮件配置请求
export function addConfigureMail(obj) {
	return request({
		url: `${BASE_URL}/mails/`,
		method: 'post',
		data:obj
	})
}
// 更新邮件配置接口
export function updateConfigureMail(obj) {
	return request({
		url: `${BASE_URL}/order/list`,
		method: 'put',
		data:obj
	})
}
// 发送接口
export function sendEmail(obj) {
	return request({
		url: `${BASE_URL}/mails/send`,
		method: 'put',
		data:obj
	})
}