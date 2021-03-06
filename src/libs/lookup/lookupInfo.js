/*
 * @Author: Hano.zhang 
 * @Date: 2018-02-01 15:19:26 
 * @Last Modified by: chenboyu
 * @Last Modified time: 2018-11-29 13:43:57
 */
// 数据字典
export default {
    
    // 所属组织
    "organizationCode": [
        {
            "code": "001",
            "value": "新光租赁 (苏州) 有限公司"
        },
        {
            "code": "002",
            "value": "东莞分公司"
        },
        {
            "code": "003",
            "value": "苏州分公司"
        },
    ],
    
    "OrganizationTypeLookup": [
        {
            code: 'ORG',
            value: '组织'
        },
        {
            code: 'OFFICE',
            value: '办事处'
        },
        {
            code: 'DEPT',
            value: '部门'
        }
    ],
    "taskTypeLookup": [
        {
            code: '1',
            value: '单锁'
        },
        {
            code: '2',
            value: '组合'
        }
    ],
    // 设备解锁机申请状态
    "LockApplicationsStatusLookup": [
        {
            'code': 'UNCONFIRMED',
            'value': '待确认'
        },
        {
            'code': 'UNAUDITED',
            'value': '待审核'
        },
        {
            'code': 'FINISH',
            'value': '已完成'
        }
    ],
    "permissionLookup":[
        {
            'code': 'SL',
            'value': '系统登录'
        },
        {
            'code': 'AL',
            'value': 'APP登录'
        },
        {
            'code': 'AU',
            'value': '锁具授权'
        },
        {
            'code': 'LB',
            'value': '锁具绑定'
        },
        {
            'code': 'VE',
            'value': '实名认证审核'
        },
        {
            'code': 'LA',
            'value': '修改锁具地址'
        }
    ]
}