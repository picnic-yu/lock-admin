<style lang="less">
    @import '../styles/menu.less';
</style>


<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu" :accordion='true'>
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :accordion='true'  :name="item.children[0].name" :key="'menuitem' + item.name" >
                <span class='menu-icon'>
                    <Icon :type="item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                </span>
                
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                <template slot="title">
                    <span class='menu-icon'>
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                    </span>
                    
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <span class='menu-icon'>
                            <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        </span>
                        
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>

<style lang='less'>

//     /* // 主页导航栏 */
// .ivu-shrinkable-menu{
//     font-weight:600;
//     font-size:14px;
//     /* display: none; */
//     background-image:url('../../../../images/sidebarImage.jpg') !important;
//     background-size:cover !important;
//     //  background: transparent !important;
//      ul{
//         background: transparent !important;

//      }
//      .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
//             //   background: transparent !important;
//      }

// }
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
//     background:transparent;
// }
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
//         background:transparent;

// }
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
//             background:transparent;

// }
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
//         background: #cacaca54 !important;

// }
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
//     color:#272829;
// }
</style>