import request from '../../libs/utils/request';
import store from '@/store/index';
import BASE_URL from '@/api/config.js';

//文件上传
export function upload(obj) {
    var formData = new FormData();
    formData.append('file', obj);    //将文件转成二进制形式
    return request({
        url: `${BASE_URL}/common/uploadFile/upload`,
        method: 'post',
        headers:{'Content-Type':'multipart/form-data;boundary=----WebKitFormBoundarygMA4j1ALlxMDETOB','path':'img'},
        data: formData
    })
}