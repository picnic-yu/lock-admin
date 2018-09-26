// 转换千分位金额   接收3个参数    vue 实例 this, 转换的form  ,转换的值

export default{
    transferRMB(el, form, params){
        if (el[form][params] !== null) {
            if (el[form][params] >= 100000000) {
                el['$message']({
                    message: '请输入0到99999999.99之间的数字',
                    type: 'error'
                });
                el[form][params] = ''

            }
            if (el[form][params] != '') {
                return el[form][params] = el.$accounting.formatMoney(el[form][params], "", 2, ",", ".");
            }

        } else {
            el[form][params] = null
        }
    },
    unTransferRMB(el, form, params){
        if (el[form][params] !== null && el[form][params] != '') {
            return el[form][params] = el.$accounting.unformat(el[form][params], "", 2, ",", ".");
        }
    },
    unTransferAloneBMB(el, params){
        if (el[params] !== null && el[params] != '') {
            return el[params] = el.$accounting.unformat(el[params], "", 2, ",", ".");
        }
    }
}