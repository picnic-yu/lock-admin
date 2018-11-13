import request from '../../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';


// /feedback/info
// 加载帮助与反馈
export function getFeedback() {
    return request({
        url: `${BASE_URL}/feedback/info`,
		method: `get`
	})
}
// /feedback/
// 保存
export function saveFeedback(obj) {
    return request({
        url: `${BASE_URL}/feedback/`,
        method: `post`,
        data:obj
	})
}