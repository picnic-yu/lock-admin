<style lang="less">
@import "./main.less";
</style>
<template>
    <section class="main" :class="{'main-hide-text': shrink}">
        <section class="normalAuthority" v-if='!bossAuthority'>
            <header style='width:100%;height:40px;background-color:#3b3846'>
                <div class="main-header" style="height:40px;background-color:#3b3846">
                    <div slot="top" class="logo-con" style="text-align:left;padding:2px 18px 8px;">
                        <!-- <img style='height:25px;' :src="organizationLogo" key="max-logo" /> -->
                    </div>
                    <div class="header-avator-con">
                        <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                        <lock-screen></lock-screen>
                        <!-- 消息提醒 -->
                        <!-- <message-tip v-model="mesCount"></message-tip> -->
                        <theme-switch></theme-switch>
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">{{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                            </Row>
                        </div>
                    </div>
                </div>
            </header>

            <!-- 侧边栏 -->
            <aside class="sidebar-menu-con" style="margin-top:40px;" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
                <shrinkable-menu 
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    @screenShow='screenShowChange'
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <div slot="top">
                        <div class="navicon-con" style="text-align:right">
                            <button type="button" class="ivu-btn ivu-btn-text" style="transform: rotateZ(0deg);" @click="toggleClick">
                                <span><i class="ivu-icon ivu-icon-navicon" style="font-size: 32px;"></i></span>
                            </button>
                        </div>
                    </div>
                </shrinkable-menu>
            </aside>
            <nav class="main-header-con" style="z-index：0;height:32px;" :style="{paddingLeft: shrink?'60px':'200px'}">
                <div class="tags-con">
                    <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>

            </nav>
            <article class="single-page-con" style="top:83px;" :style="{left: shrink?'60px':'200px'}">
                <div class="single-page">
                    <keep-alive :include="cachePage">
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </article>
        </section>

        <section class="bossAuthority" v-if='bossAuthority'>
            <div class="layout ">
                <Layout>
                    <Header>
                        <Menu mode="horizontal" theme="dark"  :active-name="$route.name" :theme="menuTheme" width="auto" @on-select="changeMenu" :accordion='true'>
                            <div class="layout-logo">
                                <img style='height:25px;' :src="organizationLogo" key="max-logo" />
                            </div>
                            <div class="layout-nav">
                            <template v-for="item in menuList">

                                <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                                    <Icon :type="item.icon":key="'menuicon' + item.name"></Icon>
                                    <span :key="'title' + item.name">{{item.title}}</span>
                                </MenuItem>
                                <section  v-if='item.title!="系统设置"&&item.title!="位置分布"&&item.title!="基础组件"&&item.title!="MAPDemo"'>


                                <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                                    <template slot="title">
                                        <Icon :type="item.icon" ></Icon>
                                        <span>{{ item.title }}</span>
                                    </template>
                                    <MenuGroup :title="item.title">
                                        <template  v-for="child in item.children">
                                            <MenuItem :name="child.name" :key="'menuitem' + child.name">
                                                <Icon :type="child.icon" :key="'icon' + child.name"></Icon>
                                                <span class="layout-text" :key="'title' + child.name">{{child.title}}</span>
                                            </MenuItem>
                                        </template> 
                                    </MenuGroup>

                                </Submenu>
                                </section>
                            </template>
                            </div>

                            <div class="boss-button-group">
                                <full-screen v-model="isFullScreen" class="boss-fullscreen" @on-change="fullscreenChange"></full-screen>
                                <!-- <lock-screen></lock-screen> -->

                            <!-- <Row type="flex" justify="end" align="middle" > -->
                                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">{{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
                            <!-- </Row> -->
                            </div>
                            
                        </Menu>
                    
                    </Header>
                    <article class="boss-single-page-con" style="top:70px;">
                        <div class="tags-con" id="bossTag">
                            <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
                        </div>
                        <div class="single-page">
                            <keep-alive :include="cachePage">
                                <router-view class="bossAuthority"></router-view>
                            </keep-alive>
                        </div>
                    </article>
                </Layout>
            </div>
        </section>



    </section>

</template>
<script>
import shrinkableMenu from "./components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./components/tags-page-opened.vue";
import breadcrumbNav from "./components/breadcrumb-nav.vue";
import fullScreen from "./components/full-screen.vue";
import lockScreen from "./components/lock-screen/lockscreen.vue";
import messageTip from "./components/message-tip.vue";
import themeSwitch from "./components/theme-switch/theme-switch.vue";
import Cookies from "js-cookie";
import util from "@/libs/utils/util.js";
import logoUrl from "@/images/logo.png";
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    themeSwitch
  },
  data() {
    return {
        shrink: false,
        bossAuthority: false,  //authority of boss;
        userName: "",
        isFullScreen: false,
        openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    };
  },
  computed: {
    menuList() {
        return this.$store.state.app.menuList;
    },
    pageTagsList() {
        return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
        return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
        return localStorage.avatorImgPath;
    },
    cachePage() {
        return this.$store.state.app.cachePage;
    },
    lang() {
        return this.$store.state.app.lang;
    },
    menuTheme() {
        return this.$store.state.app.menuTheme;
    },
    mesCount() {
        return this.$store.state.app.messageCount;
    },
    organizationLogo() {
        return this.$store.state.app.currentOrganization.organizationLogo || logoUrl;
    }

  },
  methods: {
    changeMenu (active) {
        this.$router.push({
            name: active
        });
    },
    init() {
        let pathArr = util.setCurrentPath(this, this.$route.name);
        // this.$store.commit("updateMenulist");

        if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
        }
        this.userName = Cookies.get("user");
        // authority of boss;
        let userRole = Cookies.get("userRole");
        if (userRole=="zhang") {
            this.bossAuthority = true;
        }
        let messageCount = 3;
        this.messageCount = messageCount.toString();
        this.checkTag(this.$route.name);
        this.$store.commit("setMessageCount", 3);
    },
    itemTitle (item) {
        if (typeof item.title === 'object') {
            return this.$t(item.title.i18n);
        } else {
            return item.title;
        }
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        this.$router.push({
          name: "login"
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {},
    beforePush(name) {
      return true;
    },
    fullscreenChange(isFullScreen) {},
    screenShowChange(data) {
      if (data == "hide") {
        this.shrink = true;
      } else {
        this.shrink = false;
      }
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
  },
  created() {
    this.$store.commit("setOpenedList");
  }
};
</script>

<style lang="less" >
.main #bossTag{
    margin:2px 0px 8px 0;
    background:transparent; 
    border-bottom: 3px solid rgba(222, 216, 216, .7);
    box-sizing:content-box;
    .tags-outer-scroll-con .close-all-tag-con{
        background:rgba(255,255,255,.028);
        box-shadow:-3px 0 15px 3px rgba(222, 216, 216, 0.1);

    }
}
.boss-single-page-con{
        position: absolute;
        margin:2px 2px 2px 6px;
        top: 100px;
        left:0;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #e9e9e9;
        z-index: 1;
        transition: left .3s;
        .single-page{
            margin: 10px;
            min-width: 1100px;
            
        }
}
.boss-layout-logo{
    display: inline-block;
}
.boss-content{
        position: absolute;
        top: 60px;
        bottom: 0;
        overflow: auto;
        background-color: #e9e9e9;
        z-index: 1;
        transition: left .3s;
        }
 
 .boss-button-group{
     float: right;
     margin-right:30px;
     color:white;
 }
 .boss-fullscreen{
     position: relative;
     top:3px;

 }
 .bossAuthority{
     .ivu-menu ,
     .ivu-menu-item{
         font-size:20px;
     }
     .ivu-layout-header{
         min-width: 1300px;
     }
     .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item{
         font-size:16px !important;
     }
     .main-user-name{
         font-size:16px;
     }
     .ivu-table {
         font-size:14px;
     }
     .ivu-form-item {
         zoom :1.2;
     }
    .textDescription  {
         font-size:20px !important;
     }
     .boss-statistics .textDescription,.boss-normalLoans_total  .textDescription{
         font-size:18px !important;
     }
     .card-title-wrap { 
         font-size:22px;
     }
    //  .boss-statistics{
    //      display:none;
    //  }
 }


</style>

<style lang='less' scoped>
/*  */
.layout-logo{
    width: 100px;
    height: 30px;
    /* background: #5b6270; */
    /* border-radius: 3px; */
    float: left;
    position: relative;
    top: 10px;
    left: -40px;
}
.layout-nav{
    /* width: 420px; */
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}


 @media screen and (min-width:1420px) {
     
     .bossAuthority{
            .layout-logo{
                width:150px;
            }
            .ivu-layout-header{
                padding:0 40px 0 200px;
            }
     }
}
</style>

