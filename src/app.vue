<template>
	<div id="main" class="app-main">
		<router-view></router-view>
	</div>
</template>

<script>
import {  getMenuList, getButtonList } from '@/api/resourceInfo/index';

import { getCurrentOrganization } from '@/api/organization';
/**
* 函数功能简述 获取左侧菜单权限列表
*@param    {object}  self     vue this 
*/
const getMenuListAction = (self) => {
	return new Promise((resolve, reject) => {
		getMenuList().then(response => {
			if(response.code == 200 ){
				self.$store.commit('updateMenulist',response.content);
			}
			resolve();
		}).catch(error => {
			reject(error)
		})
	});
};
/**
* 函数功能简述 获取按钮权限列表
*@param    {object}  self     vue this 
*/
const getButtonListAction = (self) => {
	return new Promise((resolve, reject) => {
		getButtonList().then(response => {
			if(response.code == 200 ){
				self.$store.commit('updateButtonList',response.content);
			}
			resolve();
		}).catch(error => {
			reject(error)
		})
	});
};
const getCurrentOrganizationAction = (self) => {
	return new Promise((resolve, reject) => {
		getCurrentOrganization().then(response => {
			if(response.code == 200 ){
				self.$store.commit('setCurrentOrganization',response.content);
			}
			resolve();
		}).catch(error => {
			reject(error)
		})
	});
};
export default {
	data() {
		return {
			theme: this.$store.state.app.themeColor
		};
	},
	created(){
		if(this.$store.state.user.token){
			getButtonListAction(this);
			getMenuListAction(this);
			
			getCurrentOrganizationAction(this);
		}
	},
	mounted() {

	},
	beforeDestroy() {

	},
	methods: {

	}
};
</script>

<style>
	@import './styles/index.less'; 
	.formvalidate-wrap{
		padding:25px 0;
		background: #fff;
        border-top: 4px solid #8CDDCD;
		position: relative;
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
	}
	.form-list{
		background: #fff;
        border-top: 4px solid #8CDDCD;
		position: relative;
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
	}
	.echart-wrap{
		background: #fff;
		position: relative;
		box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
	}
	.form-input-wrap{
		padding-top:20px;
	}
	/* 滚动条样式开始 */
	::-webkit-scrollbar {  
		width: 0px;  
		height: 14px;  
		opacity: 0;
	}  
  
	::-webkit-scrollbar-track,  
	::-webkit-scrollbar-thumb {  
	border-radius: 999px;  
	opacity: 0;
	border: 5px solid transparent;  
	}  
	
	::-webkit-scrollbar-track {  
	box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;  
	opacity: 0;
	}  
	
	::-webkit-scrollbar-thumb {  
	min-height: 20px;  
	background-clip: content-box;  
	box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset;  
	opacity: 0;
	}  
	
	::-webkit-scrollbar-corner {  
	background: transparent;  
	opacity: 0;
	} 
	/* 滚动条样式结束 */ 
	.border-wrap{
        border-top: 4px solid #8CDDCD;
	}
	/* 报表loading 去掉遮罩 */
	.chart-mask .ivu-spin-fix{
		
		background: hsla(0,0%,100%,0) !important;
	}
	/* 报表中loading样式 */
	.chart-mask .ivu-spin-fix .ivu-spin-main{
		top:50% !important;
	}
	/* 查看更多按钮div */
	.view-more{
		background-color: #fff;
		position: relative;
		height:50px;
	}
	.view-more span{
		position: absolute;
		right: 0px;
		margin:0px 0 10px;
		color:#2d8cf0;
		cursor: pointer;
	}
	/* chart查询条件select宽度 */
	.chart-select{
		width:350px;
	}
	.page-chart{
		position: relative;
		top:0;
		left:0;
		overflow-y: auto;
		height:100%;
		padding: 10px 30px;
		
	}
	
</style>