<template>
	<div class="search" >
		<Button type="primary" class='more hide_wrap search-operate' @click='showMore' v-if='searchdata.length||inputArr.length||radioArr.length||dateArr.length'>高级查询</Button>
		<Button type="primary" @click='empty' class='search-operate'>清空</Button>
		<Button type="primary" icon="ios-search"  class='query search-operate' @click='query' >查询</Button>
		
		<Input v-model="value" :placeholder="placeholderValue" style="width: 280px" class='search-operate' @keyup.enter.native="query"></Input>
		
		<div class="more-wrap show_wrap" v-show='isShowMore' >
			<!-- 数据字典下拉框 -->
			<div v-for='( item ) in searchdata' :key='item.title' style='margin-bottom: 5px;' class='show_wrap' >
				<span class='select-text show_wrap'>
					{{item.title}}
				</span>
				<Select   v-model="item.code" style="width:200px" class='show_wrap' clearable>
			        <Option class='show_wrap' v-for="selectItem in item.data" 
			        	:value="selectItem.code"
			        	:key="selectItem.value">{{ selectItem.value }}</Option>
			    </Select>
			</div>
			<!-- 数据字典下拉框 -->
			<!-- input输入框 -->
			<div v-for='( item, index ) in inputArr' :key='index' style='margin-bottom: 5px;' class='show_wrap' >
				<span class='select-text show_wrap'>
					{{item.title}}
				</span>
				<Input v-model="item.value" :placeholder="item.placeholder" style="width: 200px" ></Input>
			</div>
			<!-- input输入框 -->
			<!-- check单选框 -->
			<div v-for='( item ) in radioArr' :key='item.title' style='margin-bottom: 5px;'  >
				<span class='select-text show_wrap'>
					{{item.title}}
				</span>
				<RadioGroup v-model="item.flag">
					<Radio 
						v-for="itemRadio in item.list" 
						:key='itemRadio.flag' 
						:label="itemRadio.flag">
						{{itemRadio.label}}
					</Radio>
				</RadioGroup>
			</div>
			<!-- check单选框 -->
			<!-- 时间选择 -->
			<div  style='margin-bottom: 5px;' v-for='( item,index ) in dateArr' :key='item.title' class='show_wrap' @click='handleClick'>
				<span class='select-text show_wrap'>
					
					{{item.title}}
				</span>
				<Row class='show_wrap' style="width: 200px;display:inline-block;vertical-align: middle;">
					<Col span="12">
						<DatePicker class='show_wrap' 
							:type="item.type"
							@on-clear='clearDate(index)' 
							v-model='item.value'
							:editable='false' :placeholder="item.placeholder" style="width: 200px" ></DatePicker>
					</Col>
				</Row>
			</div>
			<!-- 时间选择 -->
		</div>
		
		
	</div>
</template>

<script>
	import util from '@/libs/utils/util';
	export default{
		props: {		
			placeholderValue: {
				type: String,
				default: ''
			},
			// select选择框数据
			searchdata:{
				type: Array,
				default:function() {
					return [];
				}
			},
			// 输入框数组
			inputList:{
				type: Array,
				default:function() {
					return [];
				}
			},
			showDate:{
				type: Boolean,
				default: false,
			},
			// 时间
			dateTime:{
				type: Object,
				default: function(){
					return {
						title: '',
						type: 'date',
						value: ''
					};
				}
			},
			radioList:{
				type: Array,
				default:function() {
					return [];
				}
			},
			dateList:{
				type: Array,
				default:function() {
					return [];
				}
			},
			// 清空input
			removeInputFlag:{
				type: Number,
				default: 0
			}
		},
		
		data(){
			let self = this;
			return{
				value: '',
                isShowMore: false,
                queryParam: {
                	keyWords: self.value,
                	selectData: self.searchdata,
                	time: self.dateTime.value
				},
				inputArr:[],
				dateArr:[],
				radioArr:[]
			}
		},
		methods: {
			showMore(){
				this.isShowMore = !this.isShowMore;
			},
			query() {
				let self = this;
				this.handleBodyClick();
				this.queryParam.keyWords = this.value;
				this.queryParam.selectData = this.searchdata;
				
				this.dateArr.forEach((item) => {
					if(item.value){
						item.value = new Date(item.value);
						item.date = item.value.getFullYear() + '-' + (item.value.getMonth()+1) + '-' + item.value.getDate()
					}
				});
				
				this.queryParam.time = this.dateArr;
				this.queryParam.inputList = this.inputArr;
				this.queryParam.radioList = this.radioArr;
				this.$emit('query',this.queryParam);
			},
			handleBodyClick() {
				this.isShowMore = false;
			},
			// 清空时间
			clearDate(index){
				this.dateArr[index].value = '';
				this.dateArr[index].date = '';
			},
			// 清空
			empty() {
				this.value = '';//清空input
				//清空select选择框
				this.searchdata.forEach( (item) => {
					item.code = '';
				});
				// 清空input列表数据
				this.inputArr.forEach((item) => {
					item.value = '';
				});
				// 日期时间数据清空
				this.dateArr.forEach((item) => {
					item.value = '';
					item.date = '';
				});
				// check选择数据清空
				this.radioArr.forEach((item) => {
					item.flag = null;
				});
				this.dateTime.value ='';			//清空时间数据 开始时间
				this.query();
			},
			handleClick(event){
				if( event && event.stopPropagation ){
					event.stopPropagation();

				}else{ 

					window.event.cancelBubble = true;

				}
				this.isShowMore = true;
			}
		},
		watch:{
			removeInputFlag(newVal){
				if(newVal){
					this.value = '';
					this.empty();
				}
			}
		},
		mounted(){
			this.$nextTick(() => {
				// document.querySelector('body').addEventListener('click', (event) => {
					
				// 	if( event.target.className.indexOf('show_wrap') > -1) return;
				// 	if( event.target.className.indexOf('ivu-icon') > -1) return;
				// 	if( event.target.className.indexOf('ivu-select-placeholder') > -1) return;
				// 	if( event.target.className.indexOf('ivu-radio-wrapper') > -1) return;
				// 	if( event.target.className.indexOf('ivu-radio-input') > -1) return;
				// 	if( event.target.parentElement.className.indexOf('show_wrap') > -1 ) return;
				// 	if( event.target.parentElement.parentElement.className && event.target.parentElement.parentElement.className.indexOf('show_wrap') > -1 ) return;

				// 	if( event.target.className.indexOf('hide_wrap') < 0 && event.target.parentElement.className.indexOf('hide_wrap') < 0){
				// 		this.handleBodyClick();
				// 	}
				// });
			})

			this.inputList.forEach((item) => {
				this.inputArr.push(item);
			})
			this.dateList.forEach((item) =>{
				this.dateArr.push(item);
			});
			this.radioList.forEach((item) =>{
				this.radioArr.push(item);
			});
			
		},
		beforeDestroy(){
			document.querySelector('body').removeEventListener('click', this.handleBodyClick);
		}
	}
</script>

<style scoped lang='less'>
	.search{
		position:relative;
		width: 520px;
	}
	.text{
		padding-right: 10px;
	}
	.more-wrap{
		width: 300px; 
	    position: absolute;
	    top: 35px;
	    right: 0;
	    z-index: 22;
	    border: 1px solid #e6e6e6;
	   	background:#fff;
	    min-height: 10px;
	    padding: 20px 10px;
	}
	.select-text{
		display: inline-block;
		width:70px;
		text-align: center;
	}
	.search-operate{
		float: right;
		margin-right:4px;
		display: inline;
	}
</style>