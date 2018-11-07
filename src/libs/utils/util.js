/**
 * 全局工具类
 */

import axios from 'axios';
import env from '../../../build/env';
import semver from 'semver';
import packjson from '../../../package.json';
import momentjs from 'moment'

let util = {

};
util.title = function (title) {
    title = title || 'SmartLock';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.getApplyStatusColor = (code) => {
    let color = '';
    switch (code) {
        // 待确认
        case 'UNCONFIRMED':	
            color = '#ff3333';   
        break;      
        // 待审核
        case 'UNAUDITED':	
            color = '#ff6600';   
        break;  
        // 已完成
        case 'FINISH':	
            color = '#339933';   
        break;
    }
    return color;
}

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    // vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

// util.onWheel = function (ele, callback) {
//     ele.addEventListener('mousewheel', function (e) {
//         callback(e, e.wheelDelta);
//     });
//     ele.addEventListener('DOMMouseScroll', function (e) {
//         callback(e, e.detail * 40);
//     });
// };

// util.offWheel = function (ele, callback) {
//     ele.removeEventListener('mousewheel', callback)
// }
/*
 * 方法作用：【计算某个日期几天后或者几天前的日期】  也可以用作时间format，可用用。第二个参数传入为0就是转换
 * 传入格式：yyyy-mm-dd 或者 date
 * 使用方法：dateUtil.addDate(date,days);
 * @date {Date}起始日期
 * @days {number}天数
 * @return yyyy-mm-dd - 
 */
util.addDate = function(date,days){
    var d = new Date(date);
    // setDate() 方法用于设置一个月的某一天。
    d.setDate(d.getDate() + days);
    var m = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1 ):d.getMonth() + 1
        , day = (d.getDate() ) < 10 ? '0'+(d.getDate() ):d.getDate() 
        , year = d.getFullYear();
    return year + '-' + m + '-' + day;


}
/**
* 函数功能简述
*@param    {string}  code     色块需要传入的code 
*/
util.getColorAndTextByCode = function (code) {
    let obj = {
        color:'',
        text:''
    };
    switch(code){
        case 1:	
            Object.assign(obj,{
                color:'#336633',
                text:'是'
            });
        break;
        case 0:	
            Object.assign(obj,{
                color:'#ff6600',
                text:'否'
            });
        break;
        case "CLOSED":	
            Object.assign(obj,{
                color:'#7d7e7e',
                text:'关机'
            });
        break;
        case "FREE":	
            Object.assign(obj,{
                color:'#fdc426',
                text:'空闲'
            });
        break;
        case "DEBUGGING":	
            Object.assign(obj,{
                color:'#00a3b5',
                text:'调试'
            });
        break;
        case "WARNING":	
            Object.assign(obj,{
                color:'#eb5b72',
                text:'故障'
            });
        break;
        case "RUNNING":	
            Object.assign(obj,{
                color:'#78a442',
                text:'运行'
            });
        break;
    }
    return obj;
}
/**
* 函数功能简述
*@param    {string}  code     色块需要传入的code 
*/
util.getRunningStateColor = function (code) {
    let color = '';
    switch(code){
        // 关机
        case 'CLOSED':	
            color = '#7d7e7e';   

        break;
        // 空闲
        case 'FREE':	
            color = '#fdc426';
        break;
        // 调试
        case 'DEBUGGING':	
            color = '#00a3b5';
        break;
        // 故障
        case 'WARNING':	
            color = '#ec6b80';
        break;
        // 运行
        case 'RUNNING':	
            color = '#78a442';
        break;
    }
    return color;
}
//获得两个日期之间相差的天数
util.getDays = function (date1 , date2){  
    date1 = util.addDate(date1,0);
    date2 = util.addDate(date2,0);
    var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
    //根据年 . 月 . 日的值创建Date对象
    var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);  
    var date2Str = date2.split("-");  
    var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);  
    var t1 = date1Obj.getTime();  
    var t2 = date2Obj.getTime();  
    var dateTime = 1000*60*60*24; //每一天的毫秒数
    var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
    var days = Math.abs(minusDays);//取绝对值
    return days;  
}


/**
 * @description 计算合同剩余期数
 * @param {Sring | Date} startDate 开始日期
 * @param {Number} periods 租赁期数
 * @returns {Number} surplus 剩余期数
 */

util.calcuteSurplus = function(startDate, periods) {
    
    let surplus = 0; //剩余租期
    let pattern = 'YYYY-MM-DD';//日期格式
    if(startDate && periods > 0){
        startDate = momentjs(startDate).format(pattern);

        let year=new Date().getFullYear(); //当前年
        let month=new Date().getMonth()+1; //当前月
        let day=new Date().getDate(); //当前日

        let time_start = new Date(startDate);//起租日期
        let year_start = time_start.getFullYear(); //起租年
        let month_start = time_start.getMonth()+1; //起租月
        let day_start = time_start.getDate(); //起租日

        
        if (momentjs(time_start).isBefore(momentjs().format(pattern))) {
            if (month>=month_start && day>day_start) {
                surplus = periods - ((year-year_start)*12 + (month-month_start+1));
            }
            if (month>=month_start && day<=day_start) {
                surplus = periods - ((year-year_start)*12 + (month-month_start));
            }
            if (month<month_start && day>day_start) {
                surplus = periods - ((year-year_start)*(12-month_start) + (month+1));
            }
            if (month<month_start && day<=day_start) {
                surplus = periods - ((year-year_start)*(12-month_start) + month);
            }
        } else {
            surplus = periods;
        }
        surplus = surplus<0 ? 0 : surplus;
    } else if (startDate && periods == 0) {
        surplus = 0;
    } else {
        surplus ='';
    }
    return surplus;
}
/**
* 函数功能简述 根据当前路由name 获取当前路由模块下面按钮的权限列表
*@param    {Array}  list     所有按钮集合 
*@param    {string}  name     当前路由的name 
*@return   {Array}  buttonList 当前路由模块下面按钮的权限列表
*/
util.getButtonList = function(list,name){
    let buttonList = [];
    list.forEach((item) => {
        if(item.name == name){
            buttonList = item.buttons;
        }
    });
    return buttonList;
}
/**
* 函数功能简述 千分位转换
*@param    {String}  转换的数据
*@return   {String}  转换后的数据
*/
util.thousandth = (item) => {
    return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export default util;
