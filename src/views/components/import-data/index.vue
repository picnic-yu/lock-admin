<template>
	<Modal v-model="infoModal" width="510">
        <p slot="header" style="color:#2db7f5;text-align:left">
            <span>{{modeltitle}}</span>
        </p>
        <div>
			<span style='width:125px;display: inline-block;vertical-align: middle;'>请选择导入EXCEL文件</span>
			<Upload style='display:inline-block;vertical-align: middle;width:calc(100% - 150px);margin-left:20px;' 
				:headers = 'actionheader'
				:before-upload ="handleUpload"
				:on-success ='uploadSuccess'
				accept=".csv, .xls,.xlsx"
				:on-error = 'uploadError'
				:action="actionUrl">
				<Button type="ghost">{{ file?file.name:'请选择导入文件' }}</Button><span style='color:red;display:inline-block;padding-left:15px;'>提示,只能选择xls及xlsx文件</span>
			</Upload>
			<div class="control-group" style='margin-top:15px;'>
				<span class='dec' style='width:125px;'>
					所属仓库
				</span>
				<Select v-model="storeHouse"  style="width:300px;margin-left: 10px">
					<Option v-for="item in storeHouseLookUp" 
						:value="item.code" 
						:key="item.value">
						{{ item.value }}
					</Option>
				</Select>
			</div>
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
	import { lookUpdata, transformData } from '@/libs/lookup/lookup';
	
	
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
				storeHouseLookUp: lookUpdata.StoreHouseLookup,
				actionheader: {
					"authorization": self.$store.state.user.token,
					"storeHouse":"SUZHOU"
				}
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
			},
			storeHouse(val){
				this.actionheader.storeHouse = this.storeHouse;
			}
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