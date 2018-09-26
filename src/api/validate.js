export default  {
    num: (rule, value, callback) => {
        if (!value ||value ==0) {
            callback()
        } else {
            if (!Number(value) ) {
                callback(new Error('请输入数字'));
            }else{
                callback()
            }
        }
        
    },
    phone: (rule, value, callback) => {
        if (value === '') {
        } else {
            if (!/^1\d{10}$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
            }
        }
        callback()
    },
    zip: (rule, value, callback) => {
        if (value === '') {
        } else {
            if (!/[0-9]{6}/.test(value)) {
                callback(new Error('请输入正确邮编'));
            }
        }
        callback()
    },
    
}
