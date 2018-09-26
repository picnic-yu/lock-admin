import request from '../libs/utils/request';
import BASE_URL from '@/api/config.js';
export function getLookUpList(name) {
	
	return request({
		url: `${BASE_URL}/lookupLists/lookupName/` + name + '/lookupValues/',
		method: 'get'
	})
};