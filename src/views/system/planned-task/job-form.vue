<template>
    <div class="portlet-body job-form">
        <Form ref="formValidate" class="formvalidate-wrap" :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="任务名称" prop="jobName">
                        <Input v-model="formValidate.jobName" placeholder="请输入任务名称"></Input>
                    </FormItem>
                </Col>

                <Col span="10" offset="1">
                    <FormItem label="任务实体" prop="beanName">
                        <Select v-model="formValidate.beanName" filterable>
                            <Option v-for="(item,index) in beanNameList" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="时间设定" prop="cronExpression">
                        <Tooltip content="" placement="bottom">
                            <Input v-model="formValidate.cronExpression" placeholder="请输入时间设定"></Input><br/>    
                            <span slot="content">
                                如果当前任务为复杂任务时,请输入时间设定;如果当前任务为复杂任务时,请输入时间设定.
                            </span>
                        </Tooltip>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="启动延时时间(ms)" prop="startDelay">
                        
                        <Tooltip content="" placement="bottom">
                            <Input v-model="formValidate.startDelay" placeholder="请输入启动延时时间"></Input>
                            <div slot="content">
                                如果当前任务为简单任务时,请输入启动延时时间.
                            </div>
                        </Tooltip>

                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="运行间隔时间(ms)" prop="repeatInterval">
                        <Tooltip content="" placement="bottom">
                            <Input v-model="formValidate.repeatInterval" placeholder="请输入运行间隔时间"></Input>
                            <div slot="content">
                                如果当前任务为简单任务时,请输入运行间隔时间.
                            </div>
                        </Tooltip>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="注册任务" prop="jobStatus">
                        <RadioGroup v-model="formValidate.jobStatus">
                            <Radio 
                                v-for="item in statusData" 
                                :key='item.name' 
                                :label="item.status">
                                {{item.name}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="任务描述" prop="jobDescription">
                        <Input v-model="formValidate.jobDescription" 
                        type="textarea" 
                        :autosize="{minRows:5, maxRows:5}" 
                        placeholder="请输入任务描述"></Input>
                    </FormItem>
                </Col>
            </Row>

        
            <div class="button-gropEl">
                <Button type="primary" @click="handleSubmit" :loading='saveLoading'>保存</Button>
                <Button type="primary" @click='saveAndBack'>保存并返回</Button>
                <Button @click='handleClickback'>返回</Button>
            </div>
        </Form>
    </div>
</template>

<script>
    import { addJob, updateJob, queryBeanNameList,getJobById } from "@/api/system/jobInfo/index.js"
    const updateAction = (self) => {
        return new Promise((resolve, reject) => {
            updateJob(self.editData.id, self.formValidate).then(response => {
                if (response.code == 201) {
                    self.$Message.success("保存成功");
                    self.handleReset()
                } else {
                    self.$Message.error("保存失败");
                }
                self.saveLoading = false;
                resolve();
            }).catch(error => {
                self.saveLoading = false;
                self.$Message.error("保存失败");
                reject(error);
            });
        });
    };
    
    const addAction = (self) => {
        return new Promise((resolve, reject) => {
            addJob(self.formValidate).then(response => {
                if (response.code == 201) {
                    self.$Message.success("保存成功");
                } else {
                    self.$Message.error("保存失败");
                }
                self.saveLoading = false;
                resolve();
            })
            .catch(error => {
                self.saveLoading = false;
                self.$Message.error("保存失败");
                reject(error);
            });
        });
    };

    let statusArr = [
        {
            status: 1,
            name: '是'
        },
        {
            status: 0,
            name: '否'
        }
    ];
    const getJobByIdAction = (self) => {
        return new Promise((resolve, reject) => {
            getJobById(self.editData.id).then(response => {
                if (response.code == 200) {
                self.formValidate = response.content;
                } 
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    };
    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            beanNameList: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        data() {
            return {
                formValidate: {
                    jobName: '',//任务名称
                    beanName: '',//任务实体
                    cronExpression: '',//时间设定
                    startDelay: '',//启动延时时间
                    repeatInterval: '',//运行间隔时间
                    jobStatus: 1,//是否注册
                    jobDescription: '' //任务描述
                },
                ruleValidate: {
                    jobName: [{
                        required: true,
                        message: '请输入任务名称',
                        trigger: 'change'
                    }],
                    beanName: [{
                        required: true,
                        message: '请选择任务实体',
                        trigger: 'blur'
                    }],
                    jobDescription: false,
                    jobStatus: [
                        {
                            require: true,
                            type: 'number'
                        }
                    ],
                    cronExpression: [
                        {
                            required: false,
                            message: '当前任务为复杂任务时,请输入时间设定',
                            trigger: "change"
                        }
                        // ,
                        // { 
                        //     type: 'date', 
                        //     message: '请输入正确的时间', 
                        //     trigger: 'change' 
                        // }
                    ]
                },
                saveLoading: false,
                loading1: false,
                statusData: statusArr,
                isBack: false
            }
        },
        methods: {
            init() {
                if(this.isEdit) {
                    getJobByIdAction(this)
                    // Object.assign(this.formValidate, this.editData);
                }
            },
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        if (this.isEdit) {
                            this.formValidate.id = this.editData.id;
                            updateAction(this).then(() => {
                                this.handleReset();
                                if (this.isBack){
                                    this.$emit("handleBack",2);
                                } else {
                                    this.$emit("handleBack",1);
                                }
                            });
                        } else {
                            addAction(this).then(() => {
                                this.handleReset();
                                if (this.isBack){
                                    this.$emit("handleBack",2);
                                } else {
                                    this.$emit("handleBack",1);
                                }
                            });
                        }
                    } 
                })
            },
            handleClickback() {
                this.$emit("handleBack",0);
            },
            getBeanNameList() {
                // queryBeanNameListAction(this);
            },
            saveAndBack() {
                this.isBack = true;
                this.handleSubmit();
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();
            }
        },
        created() {
            // this.getBeanNameList();
        },
        mounted() {
            this.init();
        }
    }

    
</script>

<style lang='less'>
    .job-form {
        
        .ivu-tooltip-inner {
            white-space: normal;
            background-color: #eaf4fe;
            color: #495060;
            border: 1px solid #d5e8fc;
            box-shadow: none;
            // max-width: 90%;
        }

        .ivu-tooltip-popper[x-placement^=bottom] .ivu-tooltip-arrow {
            border-bottom-color: #d5e8fc;
        }

        .ivu-tooltip {
            width: 100%;
            .ivu-tooltip-rel {
                width: 100%;
            }
        }
    }
</style>

