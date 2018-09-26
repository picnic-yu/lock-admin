<template>
    <div>
        <section class="portlet-title" >
            <Icon type="person-stalker"></Icon>
            <span class='title_text'>权限分配</span>
        </section>
        <section  class='query-wrap border-wrap'>
            <div class="operate-wrap">
                <button-group class='operate' 
                    :refreshStatus='true'
                    :addStatus ='false'
                    @refreshHandler = 'refreshHandler'>
                </button-group>
            </div>
        </section>
        <section>
            <Table border ref="selection" @on-selection-change='handlerSelectionChange' :columns="columns" :data="listData"></Table>
            <Spin :fix='true' v-show='isLoading'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </section>
        <div class="button-gropEl resource-button">
			<ButtonGroup >
				<Button type="primary" @click="handleSubmit" :loading='saveLoading'>保存</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button @click='handleBackList'>返回</Button>
			</ButtonGroup>
		</div>
    </div>
</template>
<script>
    import buttonGroup from '@/views/components/button-group/index.vue';
    import { getPermissions,addPermissions  } from '@/api/system/roleInfo';
    const addPermissionsAction = (self) => {
		self.isLoading = true;
		return new Promise((resolve, reject) => {
			addPermissions(self.roleId,{operationItem:self.permissionIds,roleId:self.roleId}).then(response => {
				if(response.code == 201){
                    self.$Message.success('保存成功');
                    self.$emit('handlerBackList',true);
                }else{
                    self.$Message.error('保存失败');
                }
                self.saveLoading = false;
                self.isLoading = false;
				resolve()
			}).catch(error => {
                reject(error);
                self.saveLoading = false;
                self.$Message.error('保存失败');
				self.isLoading = false;
			})
		})
    }
    const getListDataAction = (self) => {
		self.isLoading = true;
		return new Promise((resolve, reject) => {
			getPermissions(self.roleId).then(response => {
				if(response.code == 200 ){
                    self.listData = response.content;
                }
                self.isLoading = false;
				resolve()
			}).catch(error => {
				reject(error)
				self.isLoading = false;
			})
		})
    }
    
    export default {
        props: {
            roleDataItem: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data () {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '权限名称',
                        key: 'permissionName'
                    },
                    {
                        title: '权限描述',
                        key: 'permissionDescription'
                    },
                    
                ],
                listData: [
                ],
                roleId:'',
                isLoading: false,
                permissionIds:'',
                saveLoading:false
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                this.roleId = this.roleDataItem.id;
                this.getListData();
            },
            // 刷新页面
            refreshHandler(){
                this.getListData();
            },
            // 处理多选框变化事件
            handlerSelectionChange(data){
                let permissionId =[];
                data.forEach((item) => {
                    permissionId.push(item.id);
                });
                this.permissionIds = permissionId.join(',');
            },
            // 获取角色授权列表
            getListData(){
                getListDataAction(this);
            },
            // 保存
            handleSubmit(){
                if(!this.permissionIds){
                    return this.$Message.error('请选择权限名称');
                }
                this.saveLoading = true;
                addPermissionsAction(this);
            },
            // 返回
            handleBackList(){
                this.$emit('handlerBackList');
            },
        },
        components: {
            buttonGroup
        },
    }
</script>
<style scoped lang='less'>
     .resource-button{
        margin-top:25px;
    }
</style>
