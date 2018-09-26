<template>
	<Modal v-model="InfoModal" width="310" :styles="{top: '250px'}">
        <p slot="header" style="color:#2db7f5;text-align:left">
            <span>{{promptModel.title}}</span>
        </p>
        <div>
			<h3 >{{promptModel.dec}}</h3>
		</div>
        <div slot="footer">
            <Button 
            	type="info"
            	size="large" 
            	@click="handleConfirm">
            	{{promptModel.submitText?promptModel.submitText:'保存'}}
            </Button>
			 <Button 
            	size="large" 
            	@click="handleCancel">
            	取消
            </Button>
        </div>
	</Modal>
</template>
<script>
	export default {
		props: {
			promptModel: {
				type: Object,
				default: function(){
					return {
						// title:'提示',
						// dec: '一旦确认将无法修改，确认保存吗？',
						// status: false
					}
				}
			}
		},
		data() {
			let self = this;
			return {
				InfoModal: self.promptModel.status, //创建props属性promptModel.status的副本--InfoModal
			}
		},
		methods: {
			handleCancel() {
				this.InfoModal = false;
				this.$emit('handleCancel')
			},
			handleConfirm() {
				this.InfoModal = false;
				this.$emit('handleConfirm');
			}
			
		},
		watch: {
			'promptModel.status'(val) {
				this.InfoModal = val;
			},
			InfoModal(val){
				//组件内对InfoModal变更后向外部发送事件通知
				this.$emit('on-change', val);
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