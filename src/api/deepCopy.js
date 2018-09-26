/*
 * @Author: Hano.zhang 
 * @Date: 2017-12-16 14:57:08 
 * @Last Modified by: wangtengfei
 * @Last Modified time: 2018-04-09 14:38:29
 */
/**
 * 
 * @param {*}  用于进行数组内包含第二层的深拷贝. 
 * @param {*} o 传入的数组
 */
export const deepCopy = (o) => {
    if (o instanceof Array) {
        let n = [];
        for (let i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Object) {
        let n = {};
        for (let i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
};