<template>
    <div class="portlet-body">
        <Form ref="formValidate" class="formvalidate-wrap" :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="属性名" prop="propertyName">
                        <Input v-model="formValidate.propertyName" placeholder="请输入属性名称"></Input>
                    </FormItem>
                </Col>

                <Col span="10" offset="1">
                    <FormItem label="属性值" prop="value">
                        <Input v-model="formValidate.value" placeholder="请输入属性值"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="属性描述" prop="description">
                        <Input v-model="formValidate.description" 
                        type="textarea" 
                        :autosize="{minRows:5, maxRows:5}" 
                        placeholder="请输入属性描述"></Input>
                    </FormItem>
                </Col>
            </Row>
            <div class="button-gropEl">
                <Button type="primary" @click="handleSubmit('formValidate')" :loading='saveLoading'>保存</Button>
                <Button @click='handleClickback'>返回</Button>
            </div>
        </Form>
       
    </div>
</template>

<script>
    import { addProperty, updateProperty } from "@/api/system/propertyInfo/index.js"
    const updateAction = (self) => {
        return new Promise((resolve, reject) => {
            updateProperty(self.editData.id, self.formValidate).then(response => {
                if (response.code == 201) {
                    self.$emit("handleBack",1);
                    self.$Message.success("保存成功");
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
            addProperty(self.formValidate).then(response => {
                if (response.code == 201) {
                    self.$emit("handleBack",1);
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
            }
        },
        data() {
            return {
                formValidate: {
                    propertyName: '',//属性名称
                    value: '',//属性值
                    description: ''//属性描述
                },
                ruleValidate: {
                    propertyName:[{
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'change'
                    }],
                    value: [{
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'change'
                    }],
                    description: false
                },
                saveLoading: false
            }
        },
        methods: {
            init() {
                if(this.isEdit) {
                    Object.assign(this.formValidate, this.editData);
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        if (this.isEdit) {
                            this.formValidate.id = this.editData.id;
                            updateAction(this);
                        } else {
                            addAction(this);
                        }
                    } 
                })
            },
            handleClickback() {
                this.$emit("handleBack",0);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang='less'>

</style>

