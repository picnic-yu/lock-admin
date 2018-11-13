/*
 * @Author: chenboyu 
 * @Date: 2018-01-29 10:24:39 
 * @Last Modified by: chenboyu
 * @Last Modified time: 2018-11-13 09:26:24
 */
/**
 * 路由配置
 */

import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'SmartLock'
    },
    // component: resolve => { require(['@/views/login/index.vue'], resolve); }
    // component: resolve => { require(['@/views/login/indexFirst.vue'], resolve); }
    component: resolve => { require(['@/views/login/indexSecond.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/components/lock-screen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/login',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/index.vue'], resolve); } },
        // { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/indexDemo.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/index.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/lock-manage',
        icon: 'android-settings',
        name: 'lock-list',
        title: '锁具管理',
        component: Main,
        children: [
            {
                path: 'lock-info',
                title: '锁信息管理',
                name: 'lock-info',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/lock-manage/lock-info/info-list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'lock-setting',
                title: '顺序开锁设置',
                name: 'lock-setting',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/lock-manage/lock-setting/list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'lock-seed',
                title: '锁具种子管理',
                name: 'lock-seed',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/lock-manage/lock-seed/seed-list.vue'],
                        resolve
                    );
                }
            },
      
        ]
    },
    {
        path: '/task',
        icon: 'android-settings',
        name: 'task',
        title: '任务管理',
        component: Main,
        children: [
            {
                path: 'task-list',
                title: '任务管理',
                name: 'task-list',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/task/task-list.vue'],
                        resolve
                    );
                }
            }
        ]
    },
    {
        path: '/principal',
        icon: 'android-settings',
        name: 'principal',
        title: '用户管理',
        component: Main,
        children: [
            {
                path: 'certification',
                title: '任务管理',
                name: 'certification',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/principal/certification/list.vue'],
                        resolve
                    );
                }
            }
        ]
    },
    {
        path: '/reports',
        icon: 'android-settings',
        name: 'reports',
        title: '数据报表',
        component: Main,
        children: [
            {
                path: 'auth-list',
                title: '授权记录',
                name: 'auth-list',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/reports/auth-list/list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'performing-tasks',
                title: '任务执行记录',
                name: 'performing-tasks',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/reports/performing-tasks/list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'unlock-list',
                title: '开锁记录',
                name: 'unlock-list',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/reports/unlock-list/list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'login-list',
                title: '系统登录记录',
                name: 'login-list',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/reports/login-list/list.vue'],
                        resolve
                    );
                }
            }
      
        ]
    },
    {
        path: '/system',
        icon: 'android-settings',
        name: 'system',
        title: '系统设置',
        component: Main,
        children: [
            {
                path: 'resources',
                title: '系统资源',
                name: 'resources',
                icon: 'ios-paw',
                component: resolve => {
                    require(
                        ['@/views/system/resources/resources-list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'permission',
                title: '系统权限',
                name: 'permission',
                icon: 'ios-locked',
                component: resolve => {
                    require(
                        ['@/views/system/permission/permission-list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'role',
                title: '系统角色',
                name: 'role',
                icon: 'ios-body',
                component: resolve => {
                    require(
                        ['@/views/system/role/role-list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'property-list',
                title: '系统属性',
                name: 'property-list',
                icon: 'podium',
                component: resolve => {
                    require(
                        ['@/views/system/property-configuration/property-list.vue'],
                        resolve
                    );
                }
            },
            {
                path: 'lookup-list',
                title: '数据字典',
                name: 'lookup-list',
                icon: 'podium',
                component: resolve => {
                    require(
                        ['@/views/system/lookup-lists/lookup-list.vue'],
                        resolve
                    );
                }
            },      
            {
                path: 'planned-task',
                title: '计划任务',
                name: 'planned-task',
                icon: 'card',
                component: resolve => {
                    require(
                        ['@/views/system/planned-task/task-list.vue'],
                        resolve
                    );
                }
            },   
            {
                path: 'principal-list',
                title: '用户管理',
                name: 'principal-list',
                icon: 'ios-people',
                component: resolve => {
                    require(['@/views/system/principal/principal-list.vue'], resolve);
                }
            },
            {
				path: 'configure-mail',
				title: '配置邮件',
				name: 'configure-mail',
				icon: 'compose',
				component: resolve => {
					require(['@/views/system/configure-mail/mail-form.vue'], resolve);
				}
			},         
            {
				path: 'configure-message',
				title: '短信通知',
				name: 'configure-message',
				icon: 'email',
				component: resolve => {
					require(['@/views/system/configure-message/message-list.vue'], resolve);
				}
            },  
            {
				path: 'message-template',
				title: '短信通知',
				name: 'message-template',
				icon: 'email',
				component: resolve => {
					require(['@/views/system/message-template/list.vue'], resolve);
				}
            },   
            {
				path: 'feedback',
				title: '短信通知',
				name: 'feedback',
				icon: 'email',
				component: resolve => {
					require(['@/views/system/feedback/form.vue'], resolve);
				}
            }, 
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
//  preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
