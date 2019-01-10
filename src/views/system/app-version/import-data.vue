<template>
	<Modal v-model="infoModal" width="510">
        <p slot="header" style="color:#2db7f5;text-align:left">
            <span>{{modeltitle}}</span>
        </p>
        <div>
			<span style='width:90px;display: inline-block;vertical-align: middle;text-align:right;'>APP发布：</span>
			<Upload style='display:inline-block;vertical-align: middle;width:calc(100% - 150px);margin-left:20px;' 
				:headers = 'lockForm'
				:before-upload ="handleUpload"
				:on-success ='uploadSuccess'
				accept=".apk"
				:data='lockForm'
				:on-error = 'uploadError'
				:action="actionUrl">
				<Button type="ghost">{{ file?file.name:'请选择app文件' }}</Button><span style='color:red;display:inline-block;padding-left:15px;'>提示,只能选择apk文件</span>
			</Upload>
            <Form  class="control-group" style='margin-top:15px;' ref="lockForm"  :rules="ruleValidate" :model="lockForm" :label-width="90">
                
                <FormItem label="名称" prop="versionName">
					<Input v-model="lockForm.versionName" placeholder="请输入名称"></Input>
				</FormItem>
				<FormItem label="版本" prop="appVersionCode">
					<Input v-model="lockForm.appVersionCode" placeholder="请输入版本"></Input>
				</FormItem>
                <FormItem label="备注" prop="remarks">
					<Input v-model="lockForm.remarks" placeholder="请输入备注"></Input>
				</FormItem>
            </Form>
			
		</div>
        <div slot="footer">
            <Button 
            	size="large" 
            	@click="handleCancel">
            	取消
            </Button>
            <Button 
            	type="info"
            	size="large" 
            	:loading="loadingStatus" 
            	@click="uploadData">
            	保存
            </Button>
        </div>
	</Modal>
</template>
<script>
	import { upload } from '@/api/importData/index';
    import { Message } from 'iview';
	export default {
		props: {
			importstatus: {
				type: Boolean,
				default: false

			},
			modeltitle: {
				type: String,
				default: ''
			},
			actionUrl: {
				type: String,
				default: ''
			},
			editData:{
				type: Object,
				default: function(){
					return {}
				}
			}
           
		},
		data() {
			let self = this;
			return {
				file: null,
				loadingStatus: false,
				
				infoModal: this.importstatus, //创建props属性importstatus的副本--infoModal
				resolve: '',
				
                lockForm:{
                    
                    "authorization": self.$store.state.user.token,
					versionName:'',
					remarks:'',
					appVersionCode:''
                },
                ruleValidate:{
                    
                },//规则校验
			}
		},
		methods: {
			ok() {
				
			},
			handleCancel() {
				this.loadingStatus = false;
				this.infoModal = false;
				this.file = null;
			},

			handleUpload(file) {
				this.file = file;

				return new Promise(resolve => {
					this.resolve = resolve;
				});
            },
            // 清空表单
            handleReset (name) {
                this.$refs[name].resetFields();
            },
			uploadData() {
				this.$refs['lockForm'].validate((valid) => {
                    if (valid) {
                        if(this.file !== null){
							this.loadingStatus = true;
							this.resolve();
						}else{
							this.$Message.warning('请选择导入文件');
						}
                    } 
                })
			},
			uploadSuccess(response, file, fileList) {
				this.loadingStatus = false;
				
				if(response.code == 201){
					Message.success('导入成功');
					this.infoModal = false;
					this.$emit('importSuccess');
					this.file = null;
				}else{
					Message.error('导入失败');
					this.file = null;
					this.loadingStatus = false;
				}

			},
			uploadError(error, file, fileList){
				Message.error('导入失败');
				this.file = null;
				this.loadingStatus = false;
			}
		},
		watch: {
			importstatus(val) {
				this.infoModal = val;
				if(val && this.editData.id){
					Object.assign(this.lockForm,this.editData);
				}
			},
			infoModal(val){
				//组件内对infoModal变更后向外部发送事件通知
                this.$emit('on-change', val);
                if(val){
                    // this.handleReset('lockForm');
                }
			},
			
		}
	}
</script>

<style>
	.ivu-upload-list{
		display: none;
	}
	.ivu-modal-footer .ivu-btn-primary{
		display:none;
	}
</style>