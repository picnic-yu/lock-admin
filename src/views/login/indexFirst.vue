<style lang="less" scoped>
  @import "./loginFirst.less";

</style>

<template>
  <section id="loginPage">

    <header>
      <a href="" class="logo-img"></a>
      <!-- <span>租赁管家</span> -->
    </header>
    <div class="login-logo">
      <a href="" class="">
        <img src="../../images/logo.png" alt="">
      </a>
      <!-- <br> 为您提供最合适的产品和解决方案，全面提升租赁行业的管理能力！ -->
    </div>

    <article>
      <div class="login" @keydown.enter="handleSubmit">
        <!-- <div class="login-switch">
          <div class="loginWeb" v-show='loginWeb' @click='loginWeb=!loginWeb'>
          </div>
          <div class="loginWx" v-show='!loginWeb' @click='loginWeb=!loginWeb'>
          </div>
        </div> -->
        <!-- 网页登录 -->
        <section v-show='loginWeb'>
          <Tabs>
            <TabPane label="密码登录" icon="social-windows">
              <div class="login-con">
                <Form ref="loginForm" :model="form" :rules="rules">
                  <FormItem prop="userName">

                    <Input v-model="form.userName" size='large' placeholder="请输入用户名">
                    <span slot="prepend">
                      <Icon :size="16" type="person"></Icon>
                    </span>
                    </Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" v-model="form.password" size='large' placeholder="请输入密码">
                    <span slot="prepend">
                      <Icon :size="14" type="locked"></Icon>
                    </span>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Button @click="handleSubmit" class='loginBtn' type="primary" long>登&nbsp;&nbsp;&nbsp;录</Button>

                    <Spin :fix='true' v-show='loadingStatus'>
                      <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
                    </Spin>
                  </FormItem>
                </Form>

              </div>

            </TabPane>


            <TabPane label="短信登录" icon="iphone" disabled>
              <!-- <div class="login-con">
                <Form ref="loginForm" :model="form" :rules="rules">
                  <FormItem prop="userName">

                    <Input size='large' placeholder="请输入手机号码">
                    <span slot="prepend">
                      <Icon :size="20" type="iphone"></Icon>
                    </span>
                    </Input>
                  </FormItem>

                  <FormItem>
                    <Input size='large' placeholder="      请输入验证码 " style="width: 48%"></Input>
                    <Button size='large' style='width:50%' @click='sendValidate' :loading="validateLoading"> 发送验证码</Button>

                  </FormItem>


                  <FormItem>
                    <Button class='loginBtn' type="primary" long>登&nbsp;&nbsp;&nbsp;录</Button>

                    <Spin :fix='true' v-show='loadingStatus'>
                      <Icon type="load-c" size=10 class="demo-spin-icon-load"></Icon>
                    </Spin>
                  </FormItem>
                </Form>
              </div> -->

            </TabPane>
          </Tabs>
          <!-- <div class="autoLogin">
            <Checkbox>下次自动登录</Checkbox>
          </div> -->
          <!-- <div class="forgetPsd">
            <span @click='forgetPsd'>忘记密码?</span>
          </div> -->

          <!-- <div class="thirdLogin">
            <p>第三方账号登录</p>
            <div class="account-login">
              <a class="wechat-login"></a>
              <a class="weibo-login"></a>
              <a class="qq-login"></a>
            </div>
          </div> -->



        </section>

        <!-- 二维码登录 -->
        <!-- <section v-show='!loginWeb'>
          <Card style="width:220px" class="qr-code">
            <div style="text-align:center">
              <img src="../../images/QR-Code.png">
              <h5>请使用微信扫描二维码登录</h5>
            </div>
          </Card>
        </section> -->

      </div>
    </article>

    <footer>

    </footer>

  </section>
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

  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        loginWeb: true,
        validateLoading: false,
        form: {
          userName: "",
          password: ""
        },
        rules: {
          userName: [{
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }]
        },
        loadingStatus: false
      };
    },
    watch: {
      "$store.state.user.loadStatus" (curVal, oldVal) {
        if (curVal == 200) {
          this.loadingStatus = true;
        } else {
          this.loadingStatus = false;
          this.$store.commit("UPDATE_LOADSTATUS", "10");
        }
        if (curVal == oldVal) {
          this.loadingStatus = false;
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loadingStatus = true;
            this.$store
              .dispatch("Login", this.form)
              .then((code) => {
                if(code == 200) {
                  this.$store.commit('clearAllTags');
                  Cookies.set("user", this.form.userName);
                  Cookies.set("password", this.form.password);
                  this.$store.commit(
                    "setAvator",
                    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
                  );
                  this.$router.push({
                    name: "home_index"
                  });
				  getMenuListAction(this);
				  getButtonListAction(this);
                  getCurrentOrganizationAction(this);
                }
                this.loadingStatus = false;
              })
              .catch(error => {
                this.loadingStatus = false; 
                this.$Message.error('登录失败');
                throw error;
              });
          }
        });
      },
      forgetPsd() {
        this.$Message.info("请联系管理员!");
      },
      sendValidate() {
        this.validateLoading = true;
        setTimeout(() => {
          this.validateLoading = false;
          this.$Message.error("验证码发送失败，请联系管理员!");
        }, 3000);
      }
    }
  };

</script>

<style>


</style>
