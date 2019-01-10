/*
 * @Author: chenboyu 
 * @Date: 2018-02-01 17:39:26 
 * @Last Modified by: chenboyu
 * @Last Modified time: 2019-01-10 10:03:36
 */
<template>
	<div class="operate">
		<span class='operate-btn' v-if='refreshStatus'>
			<Button type="success" 
				icon="refresh" 
				shape="circle" 
				@click='refreshHandler'>刷新</Button>
		</span>

		<span class='operate-btn' v-if='addStatus'>
			<Button type="primary" 
				icon="plus-round" 
				shape="circle" 
				@click='addHandler'>新增</Button>
		</span>
        <span class='operate-btn' v-if='publishStatus'>
			<Button type="primary" 
				icon="plus-round" 
				shape="circle" 
				@click='handlePublish'>版本发布</Button>
		</span>
        
        <span class='operate-btn' v-if='exportStatus'>
			<Button type="primary" 
				icon="plus-round" 
				shape="circle" 
				@click='handleExport'>导入</Button>
		</span>
        <span class='operate-btn' v-if='distributeStatus'>
			<Button 
				shape="circle" 
				@click='handleDistribute'>批量分发</Button>
		</span>
        
		<span class='operate-btn' v-show='edit'>
			<Button type="warning" icon="edit" shape="circle" 
				@click='editHandler'>编辑</Button>
		</span>

		<span class='operate-btn' v-show='observerStatus'>
			<Button 
                type="info" 
                icon="eye" 
                shape="circle"  
                @click='addObserverHandler(data)'>
                添加至观察户
            </Button>
		</span>

		<span class='operate-btn' v-show='litigationStatus'>
			<Button type="success" icon="alert-circled" shape="circle"  
				@click='addLitigationHandler(data)'>添加至法诉客户</Button>
		</span>
        <span class='operate-btn' v-show='dynamicBtn.status'>
			<Button type="warning" icon="edit" shape="circle" 
				@click='dynamicBtnHandler'>{{dynamicBtn.text}}</Button>
		</span>
		<span class='operate-btn' v-show='deleteStatus'>
			<Button type="error" icon="trash-a" shape="circle"  
				@click='deleteHandler(data)'>删除</Button>
		</span>
        <span class='operate-btn' v-if='confirmStatus'>
			<Button type="primary" 
				icon="edit" 
				shape="circle"  
				@click='confirmHandler'>确认</Button>
		</span>
        <span class='operate-btn' v-show='removeStatus'>
			<Button type="error" icon="trash-a" shape="circle"  
				@click='removeHandler(data)'>移除</Button>
		</span>
		<Dropdown trigger="click" @on-click='handmoreclick' v-if='moreOperations.length'>
			<Button type="primary" shape="circle">
            	更多操作
            	<Icon type="arrow-down-b"></Icon>
        	</Button>
			<DropdownMenu slot="list">
				<DropdownItem 
					:name='item.code' 
					v-for='(item, index) in moreOperations' 
					:key="index">
					{{item.name}}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
        
	</div>

</template>

<script>
	export default {
		props: {
			//删除按钮
			deleteStatus: {
				type: Boolean,
				default: false
			},
			//刷新按钮
			refreshStatus: {
				type: Boolean,
				default: false
			},
			//添加按钮
			addStatus: {
				type: Boolean,
				default: true
            },
            // 导入按钮
            exportStatus:{
                type:Boolean,
                default:false
            },
			//编辑按钮
			edit: {
				type: Boolean,
				default: false
            },
            distributeStatus:{
                type: Boolean,
				default: false
            },
            // 添加至观察户
            observerStatus: {
                type:Boolean,
                default:false
            },
            // 添加至法诉客户
            litigationStatus: {
                type:Boolean,
                default:false
            },
            // 移除
            removeStatus: {
                type:Boolean,
                default:false
            },
            // 版本发布
            publishStatus: {
                type:Boolean,
                default:false
            },
            // 确认
            confirmStatus:{
                type:Boolean,
                default:false
            },
			data: {
				type: Object,
				required: false
			},
			//更多操作传入的数据
			moreOperations: {
				type: Array,
				default: function() {
					return [];
				}
            },
            dynamicBtn: {
				default: function(){
					return {
						status: false,
						text: '确认订单'
					}
				}
			}
		},
		data() {
			return {
                addLoading:false,
				deleteItem:{},
                sureModelStatus: false,
               


                addLitigationShow: false,
                litigationForm:{
                    recordReason:'',
                    otherReason:'',
                },
                // 下拉框临时选项
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                // 观察户验证规则
                ruleInline:{
                    recordReason: [
                        {
                            required: true,
                            message: "请选择原因",
                            trigger: "change"
                        }
                    ]
                },
                // 法诉客户验证规则
                ruleLitigation:{
                    recordReason:[
                        {
                            required: true,
                            message: "请选择记录原因",
                            trigger: "change"
                        }
                    ],
                    lawsuitProgress:[
                        {
                            required: true,
                            message: "请选择法诉进度",
                            trigger: "change"
                        }
                    ],
                    overdueDate:[
                        {
                            required: true,
                            message: "请选择逾期发生日",
                            trigger: "change",
                            type:"date"
                        }
                    ],
                    // day:[
                    //     {
                    //         required: true,
                    //         message: "请输入天数",
                    //         trigger: "change"
                    //     }
                    // ],
                },
                options: {
                    disabledDate: (date) => {
                        return date > new Date()
                    }
                }
			}
		},
		methods: {
            //请空表格通用方法
            clearInput(form,params){
                this[form][params]=''
            },
            //	刷新事件
			refreshHandler() {
				this.$emit('refreshHandler');
			},
			//处理点击添加按钮事件
			addHandler() {
				this.$emit('addHandler');
            },
            handlePublish(){
                this.$emit('handlePublish');
            },
            // 处理导入按钮操纵
            handleExport(){
                this.$emit('handleExport');
            },
            // 批量分发
            handleDistribute(){
                this.$emit('handleDistribute');
            },
			//处理编辑点击事件
			editHandler(data) {
				this.$emit('editHandler',data);
            },
            deleteHandler(data) {
                this.$emit('deleteHandler')
            },
            removeHandler(data){
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定要移除吗',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$emit('removeHandler',this.data.id)
                    },
                    onCancel: () => {
                        
                        
                    }
                })
            },
			//点击更多操作返回的回掉函数
			handmoreclick(name) {
                // // 添加至观察户
				// if(name == 'OBSERVER'){
				// 	this.addObserverHandler();
                // }else if(name == 'LITIGATION'){
                //     // 添加至法诉客户
				// 	this.addLitigationHandler();
                // }else{
                //     this.$emit('handmoreclick', name);
                // }

                this.$emit('handmoreclick', name);
				
            },
           
            
            
            // 添加至法诉客户模态框出现
            addLitigationHandler(data) {
                this.$refs['litigationForm'].resetFields();
                this.litigationForm = {
                    recordReason: '101',
                    otherReason: '',
                    lawsuitProgress: '001',
                    overdueDate: new Date(),
                }
                this.addLitigationShow=true;
            },
           
            confirmHandler(){
                this.$emit('confirmHandler')
            },
            // 动态按钮
			dynamicBtnHandler(){
				this.$emit('dynamicBtnHandler');
			}
            
            
		},
		mounted() {

		},
		beforeDestroy() {
		}
	}
</script>

<style scoped>
	.add {
		margin-left: 10px;
	}
	.operate{
        margin-left:5px !important;
    }
	.operate-btn {
		display: inline-block;
		vertical-align: middle;
		height: 32px;
		min-width: 75px;
		position: relative;
        
	}
	

</style>