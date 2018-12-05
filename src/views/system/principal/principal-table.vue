<template>
    <section class="page">
        <section>
            <div  class='query-wrap border-wrap'>
                <div class="operate-wrap">
                    <button-group class='operate' 
                    :refreshStatus='false'
                    @addHandler='addHandler'
                    :addStatus="!!$store.state.app.organizationData.id"
                     
                    
                    ></button-group>
                </div>
                <div class="search-wrap">
                    <search class='search-component'
                        @query='query' 
                        :placeholderValue='placeholderValue'>
                    </search>
                </div>
            </div>
            
            <div class="list" >
                <div class='table-wrap'>
                    <i-table stripe  
                        :columns="columns" 
                        :data="userList" 
                        @on-row-click='selectItem'> 
                    </i-table>

                    <Spin :fix='true' v-show='loadingUserList'>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                        <div>Loading</div>
                    </Spin>
                </div>
                <Page class='page-wrap' show-elevator show-total  
                    :total="total" 
                    show-sizer
                    transfer 
                    :page-size-opts='pageSizeOpts'
                    :current="queryParam.pageNumber+1"
                    @on-page-size-change='pageSizeChange'
                    @on-change='pageChange' >
                </Page>
            </div>
        </section>
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import search from '../../components/search-form/index.vue';
import { getPrincipalList,deletePrincipals } from '@/api/principals';
import util from '@/libs/utils/util';

/**
* 函数功能简述 列表table数据请求
*@param    {obsect}  this     vue实例对象的this
*/
//查询
const getPrincipalListAction = (self) =>  {
    self.loadingUserList = true;
    return new Promise((resolve, reject) => {
        getPrincipalList(self.queryParam).then(response => {
            if(response.code == 200) {
                self.userList = response.content.data;
                self.userList.forEach((item) => {
                    if (item.organizationInfo) {
                        item.organizationCode = item.organizationInfo.organizationCode;
                        item.organizationName = item.organizationInfo.organizationName;
                        item.organizationId = item.organizationInfo.id;
                    }
                })
                self.total = response.content.rowCount;
            }
            self.loadingUserList = false;
            resolve();
        }).catch(error => {
            self.loadingUserList = false;
            reject(error);
        })
    })
};
// 删除请求
const deletePrincipalsAction = (self,id) => {
	return new Promise((resolve, reject) => {
		deletePrincipals(id).then(response => {
			if(response.code == 204){
				self.$Message.success('删除成功');
				self.getListData();
			}else{
				self.$Message.error('删除失败');
			}
			resolve();
			
		}).catch(error => {
			reject(error);
			self.$Message.error('删除失败');
		})
	})
};
deletePrincipals
export default {
    components: {
        buttonGroup,
        search
    },

    props: {
        flag:{
            type:Number,
            default:1
        }
    },

    data() {
        return {
            placeholderValue:'',
            isDelete:false,
            pageSizeOpts:[10,20,50,100],
            queryParam: {   //分页查询参数                 
                "pageSize": 10,
                "keyWords": "",
                "pageNumber": 0,
                "organizationId":''
            },
            columns:[
                {
                    title: '序号',
                    type: 'index',
                    width: 60
                },
                {
                    title: '登录名',
                    key: 'userName',
                    width: 150,
                    align: 'center'   
                },
                {
                    title: '姓名',
                    key: 'personName' ,
                    width: 150,
                    align: 'center',
                },
                {
                    title: '手机号',
                    key: 'mobileNumber' ,
                    width: 150,
                    align: 'center',
                },
                {
                    title: '用户角色',
                    key: 'roleName' ,
                    align: 'center',
                },
                {
                    title: '工作单位',
                    key: 'companyName' ,
                    align: 'center',
                },
                {
                    title: '绑定锁数',
                    key: 'locks' ,
                    align: 'center',
                },
                {
                    title: '实名状态',
                    key: 'displayStatus' ,
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleEdit(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.row)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
                // {
                //     title: '单位组别',
                //     key: 'organizationName',
                //     align: 'center'
                // },
                // {
                //     title: '是否启用',
                //     key: 'enabled',
                //     width: 150,
                //     align: 'center',
                //     render: (h, params) => {
                //         const row = params.row;
                //         const colorAndText = util.getColorAndTextByCode(row.enabled);
                //         return h('Tag', {
                //             props: {
                //                 type: 'dot',
                //                 color: colorAndText.color
                //             }
                //         }, colorAndText.text);
                //     }
                // }
            ],                     //用户列表表头
            userList:[],                    //用户列表数据
            loadingUserList:false,
            total:0,                        //分页总数
            isSelect:false,
            editData:{},
            isEdit:false,
        }

    },

    watch: {
        '$store.state.app.organizationData'(val){
            this.queryParam.organizationId = val.id;
            this.getListData();
        },
        flag(val){
            if(val){
                this.getListData();
            }
        }
    },

    methods: {
        refreshHandler(){

        },
        query(data){
           
            this.queryParam.keyWords = data.keyWords;
            this.getListData();
        },
        handleEdit(data){
            this.isEdit = true;
            this.$emit('handleEditOrganization',data);
        },
        addHandler(){
            if(!this.$store.state.app.organizationData.id){
                this.$Message.error('请选择一个组织');
            }else{
                this.$emit('handleAddOrganization');
            }
        },
       
        pageChange(data) { //分页查询
            this.queryParam.pageNumber = data -1;
            this.getListData();
        },
        pageSizeChange(size){
            this.queryParam.pageSize = size;
            this.getListData();
        },
        selectItem(data){
           
            // this.isSelect = true;
            this.editData = data;
        
        },
        getListData(){
            this.isDelete = false;
            this.isEdit = false;
            this.isSelect = false;
            getPrincipalListAction(this);
        },
        handleDelete(row){
            this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deletePrincipalsAction(this,row.id);
                },
                onCancel: () => {
                    
                    
                }
            })
            
        }
    },

    mounted() {
        this.getListData();
    },

}
</script>

<style lang='less' scoped>
    @import "../../../styles/searchAndOperate.less";
</style>
