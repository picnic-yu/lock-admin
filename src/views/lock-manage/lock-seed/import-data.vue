<template>
	<Modal v-model="infoModal" width="510">
        <p slot="header" style="color:#2db7f5;text-align:left">
            <span>{{modeltitle}}</span>
        </p>
        <div>
			<span style='width:125px;display: inline-block;vertical-align: middle;'>请选择导入TXT文件</span>
			<Upload style='display:inline-block;vertical-align: middle;width:calc(100% - 150px);margin-left:20px;' 
				:headers = 'lockForm'
				:before-upload ="handleUpload"
				:on-success ='uploadSuccess'
				accept=".txt"
				:on-error = 'uploadError'
				:action="actionUrl">
				<Button type="ghost">{{ file?file.name:'请选择导入文件' }}</Button><span style='color:red;display:inline-block;padding-left:15px;'>提示,只能选择txt文件</span>
			</Upload>
            <Form  class="control-group" style='margin-top:15px;' ref="lockForm"  :rules="ruleValidate" :model="lockForm" :label-width="90">
                
                <FormItem label="锁具版本" prop="lockVersion">
                    
                    <Select   v-model="lockForm.lockVersion" placeholder="请选择锁具版本">
                        <Option v-for="item in lockVersionList" :value="item.code" :key="item.value">
                            {{item.value}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="所属单位" prop="organizationInfoId" >
                    <Select v-model="lockForm.organizationInfoId">
                        <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                    </Select>
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
    import { lookUpdata } from '@/libs/lookup/lookupInfo';
    import lookupUtils from '@/libs/utils/lookupUtils';
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
            organizationList:{
                type:Array,
                default:function(){
                    return []
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
				storeHouse: 'SUZHOU',
				storeHouseLookUp: [],
				
                lockForm:{
                    lockId:'',
                    "authorization": self.$store.state.user.token,
                    organizationInfoId:'',//所属单位id
                    lockVersion:1
                },//编辑锁信息表单
                ruleValidate:{
                    organizationInfoId: [
                        {required: true, message: '请输入所属单位', trigger: 'change'}
                    ],
                },//规则校验
                lockVersionList:[
                    {
                        code: 1,
                        value:'自动锁'
                    },
                    {
                        code: 0,
                        value:'手动锁'
                    },
                ],
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

				if(this.file !== null){
					this.loadingStatus = true;
					this.resolve();
				}else{
					this.$Message.warning('请选择导入文件');
				}

			},
			uploadSuccess(response, file, fileList) {
				this.loadingStatus = false;
				
				if(response.code == 100){
					Message.success('导入成功');
					this.infoModal = false;
					this.$emit('importSuccess');
					this.file = null;
				}
				if(response.code == 101){
					Message.error('导入失败，数据已存在');
					this.file = null;
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
			},
			infoModal(val){
				//组件内对infoModal变更后向外部发送事件通知
                this.$emit('on-change', val);
                if(val){
                    this.handleReset('lockForm');
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