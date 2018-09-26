<style lang="less" scoped>
	@import './login.less';
</style>
    
<template>
	<div class="login" @keydown.enter="handleSubmit">
        <header>
            <div class="login-header">
                <div id='logo'>
                    <a href="">
                        <img src="../../images/leaselogo.png" alt="">
                    </a>    
                </div>
                <ul>
                    <li><a href="#">功能介绍</a><span>|</span></li>
                    <li><a href="#">官方微博</a><span>|</span></li>
                    <li><a href="#">问题反馈</a></li>
                </ul>

            </div>
        </header>
        <article>
            <div class="login-article">
                <div class="login-text">
                    <h1>租赁资产管理服务平台</h1>
                    <p>通过无线技术解决方案，实现租赁物的数据连接与有效的资产管理。通过连结智能工厂、数控机床、工业设备、
                智能楼宇...等，实现数据与资产的结合。共享物联网应
                用的数据和平台，对融资租赁行业趋势客观分析。</p>
                </div>
                <div class="login-bg"></div>
                <div class="login-con">
                    <Card :bordered="false">
                        <p slot="title">
                            <Icon type="log-in"></Icon>
                            欢迎登录
                        </p>
                        <div class="form-con">
                            <Form ref="loginForm" :model="form" :rules="rules">
                                <FormItem prop="userName">
                                    
                                    <Input v-model="form.userName" placeholder="请输入用户名">
                                    <span slot="prepend">
                                            <Icon :size="16" type="person"></Icon>
                                        </span>
                                    </Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="form.password" placeholder="请输入密码">
                                    <span slot="prepend">
                                            <Icon :size="14" type="locked"></Icon>
                                        </span>
                                    </Input>
                                </FormItem>
                                <FormItem>
                                    <Button @click="handleSubmit" type="primary" long>登录</Button>
                                    
                                    <Spin :fix='true' v-show='loadingStatus'>
                                        <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
                                        <!--<div>Loading</div>-->
                                    </Spin>
                                </FormItem>
                                </Form>
                            </div>
                    </Card>
                </div>
                <div class="login-line">

                </div>
            </div>

        </article>
        <section class="first-footer">
            <div>
                <span>创造一个互联互通的世界</span>
            </div>
        </section>
        <footer>
        <div class="footer-inner">
            <div>
                <a href="#">关于我们</a>
                <a href="#">法律声明</a>
                <a href="#">友情链接</a>
            </div>
            <div>
                <span>
                    Copyright 2006 - 2016 Jiazhan. All Rights Reserved. 嘉展科技 版权所有备案/许可证号：苏ICP备16035008号
                </span>
                <div>
                    <span>
                        服务热线：400 660 8237
                    </span>
                </div>
            </div>
        </div>

        </footer>

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
    


	import Cookies from 'js-cookie';
	export default {
		data() {
			return {
				form: {
					userName: '',
					password: ''
				},
				rules: {
					userName: [{
						required: true,
						message: '账号不能为空',
						trigger: 'change'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'change'
					}]
				},
				loadingStatus:  false
			};
        },
        mounted(){
			// this.form = this.$store.state.user.user;
		},
		watch: {
			'$store.state.user.loadStatus'(curVal,oldVal){
				if( curVal == 200 ){
					this.loadingStatus = true;
				}else{
					this.loadingStatus = false;
					this.$store.commit('UPDATE_LOADSTATUS','10');
				}
				if(curVal == oldVal){
					this.loadingStatus = false;
				}
			}
		},
		methods: {
			handleSubmit() {
				this.$refs.loginForm.validate((valid) => {
					if(valid) {
                        this.loadingStatus = true;
						this.$store.dispatch('Login', this.form).then(code => {
                            // Cookies.set('password', this.form.password);
                            if(code == 200) {
                                this.$store.commit('clearAllTags');
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                this.$router.push({
                                    name: 'home_index'
                                });
                                getMenuListAction(this);
                                getButtonListAction(this);
                                getCurrentOrganizationAction(this);
                                Cookies.set('user', this.form.userName);
                            }
                            this.loadingStatus = false; 
						}).catch((error) => {
                            this.loadingStatus = false; 
                            this.$Message.error('登录失败');
							throw error;
						});
					}
				});
			}
		}
	};
</script>

<style>
body{
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>