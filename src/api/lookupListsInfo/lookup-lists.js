import request from '../../libs/utils/request'
import store from '@/store/index'
import BASE_URL from '@/api/config.js';
//新增字典
export function addLookupLists(obj) {
	return request({
        url: `${BASE_URL}/lookupLists/`,
		method: 'post',
		data: obj
	})
}
//字典列表
export function queryLookupLists(obj) {
    return request({
        url: `${BASE_URL}/lookupLists/pg`,
		method: 'post',
		data: obj
    })
}
// 更新字典
export function updateLookupLists(id,obj) {
	return request({
        url: `${BASE_URL}/lookupLists/${id}`,
		method: 'put',
		data: obj
	})
}
// 删除字典
export function deleteLookupLists(id) {
	return request({
        url: `${BASE_URL}/lookupLists/${id}`,
		method: 'delete'
	})
}
//根据字典Name查询字典数据项
export function queryValuesByName(lookupName) {
    return request({
        url: `${BASE_URL}/lookupLists/lookupName/${lookupName}/lookupValues`,
        method: 'get'
    })
}
//根据字典Id查询字典数据项
export function queryValuesById(id) {
    return request({
        url: `${BASE_URL}/lookupLists/${id}/lookupValues`,
        method: 'get'
    })
}
