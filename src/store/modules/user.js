/**
 * 当前登录用户信息处理
 */

import Cookies from 'js-cookie';
import { Message } from 'iview'
import { login, logout, getInfo } from '../../api/login';
import { getToken, setToken, removeToken } from '../../libs/utils/auth';

const user = {
	state: {
		token: getToken(),
		name: '',
		roles: [],
		loadStatus: ''
	},
	mutations: {
		logout(state, vm) {
			Cookies.remove('user');
			Cookies.remove('password');
			Cookies.remove('access');
			// 恢复默认样式
			let themeLink = document.querySelector('link[name="theme"]');
			themeLink.setAttribute('href', '');
			// 清空打开的页面等数据，但是保存主题数据
			let theme = '';
			if(localStorage.theme) {
				theme = localStorage.theme;
			}
			localStorage.clear();
			if(theme) {
				localStorage.theme = theme;
			}
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		UPDATE_LOADSTATUS: (state, loadStatus) => {
			state.loadStatus = loadStatus;
		}
	},
	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
            
			const username = userInfo.userName.trim();
			
			return new Promise((resolve, reject) => {
				
				login(username, userInfo.password).then(response => {
					// console.log('hello', response.data)
					if (response.code == 200 ) {
						commit('UPDATE_LOADSTATUS', response.code);
						let data = response.content;
						Cookies.set('userRole', data.role);
						// if(response.code == 200) {
						//     alert('1    ')
							// const data = response.content;
							setToken(data.userId + '_' + data.token);
							commit('SET_TOKEN', data.userId + '_' + data.token);
							
							
						// }else{
						// 	Message.error(response.message);
							
						// }
					} else {
						Message.error(response.message);
					}
                    
					resolve(response.code);
				}).catch(error => {
					Message.error('登录失败');
					reject(error);
				})
			})
		},

		//	    // 获取用户信息
		//		GetInfo({ commit, state }) {
		//			return new Promise((resolve, reject) => {
		//				getInfo(state.token).then(response => {
		//					const data = response.content
		//					console.log(data)
		//					commit('SET_ROLES', data.role)
		//					commit('SET_NAME', data.userName)
		//					resolve(response)
		//				}).catch(error => {
		//					reject(error)
		//				})
		//			})
		//	    },
		//
		//	    // 登出
		//		LogOut({ commit, state }) {
		//			return new Promise((resolve, reject) => {
		//				logout(state.token).then(() => {
		//					commit('SET_TOKEN', '')
		//					commit('SET_ROLES', [])
		//					removeToken()
		//					resolve()
		//				}).catch(error => {
		//					reject(error)
		//				})
		//			})
		//		},
		//
		//	    // 前端 登出
		//		FedLogOut({ commit }) {
		//			return new Promise(resolve => {
		//				commit('SET_TOKEN', '')
		//				removeToken()
		//				resolve()
		//			})
		//	   }
	}
};

export default user;