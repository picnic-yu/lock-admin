<template>
    <section class="page">
        
        <section class="portlet-title" >
            <Icon type="person-stalker"></Icon>
            <span class='title_text'>用户信息管理</span>
        </section>
        <section class='list-wrap' v-show='!diaplayForm'>
            <Row type="flex" justify="center" align="top" :gutter='20' class="code-row-bg">
                <Col span="6" >
                    <organization-tree @handleRefresh='handleRefresh'></organization-tree>
                </Col>
                <Col span="18" >
                    <principal-table :flag='flag' @handleEditOrganization='handleEditOrganization' @handleAddOrganization='handleAddOrganization'></principal-table>
                </Col>
            </Row>
        </section>
        
        <section v-if='diaplayForm'>
           <principal-form :isEdit='isEdit' :organizationData = 'organizationData' :editData='editData' @handleBackList='handleBackList' ></principal-form>
        </section>

        
    </section>
</template>

<script type="text/ecmascript-6">
import organizationTree from './organization-tree.vue';
import principalTable from './principal-table.vue';
import principalForm from './principal-form.vue';
import { getOrganizations } from '@/api/organization';
 /**
* 函数功能简述 获取所属组织列表
*@param    {object}  self     vue this  
*/
let getOrganizationsAction = (self) => {
    return new Promise((resolve, reject) => {
        getOrganizations({}).then(response => {
            if (response.code == 200) {
                self.organizationData = response.content;
                self.organizationData.forEach(item => {
                    item.organizationId = item.id;
                });
            } 
            resolve();
        }).catch(error => {
            reject(error);
        })
    })
};
export default {
    name:'principal-list',
    components: {
        organizationTree,
        principalTable,
        principalForm
    },

    props: {},

    data() {
        return {
            diaplayForm:false,
            editData:{},
            isEdit:false,flag:1,
            organizationData:[]
        }
    },
    watch: {},

    methods: {
        // 处理新增用户
        handleAddOrganization(){
            this.diaplayForm = true;
            this.isEdit = false;
        },
        handleBackList(val){
            this.diaplayForm = false;
            if(val){
                this.flag = this.flag+1;
            }
        },
        handleEditOrganization(val){
            this.diaplayForm = true;
            this.isEdit = true;
            this.editData = val;
        },
        // 树添加成功后刷新所属组织信息
        handleRefresh(){
            getOrganizationsAction(this);
        }
    },

    mounted() {
        getOrganizationsAction(this);
    },

}
</script>

<style lang='less'>
    @import "../../../styles/searchAndOperate.less";
</style>
