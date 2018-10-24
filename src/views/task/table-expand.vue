// table-expand.vue
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .item{
        padding:10px 0;
        font-size: 14px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="6" class='item'>
                <span class="expand-key">执行人: </span>
                <span class="expand-value">{{ row.executorName }}</span>
            </Col>
            <Col span="6" class='item'>
                <span class="expand-key">任务类别: </span>
                <span class="expand-value">{{ row.taskType == 1 ? '单锁' :'组合'}}</span>
            </Col>
            <Col span="6" class='item' v-if='row.taskType == 2'>
                <span class="expand-key">组合号: </span>
                <span class="expand-value">{{ row.lockGroup.groupNumber }}</span>
            </Col>
        
            <Col span="6" class='item' v-if='row.taskType == 2'>
                <span class="expand-key">监护组: </span>
                <span class="expand-value">{{ row.organizationInfoName }}</span>
            </Col>
            <Col span="6" class='item'>
                <span class="expand-key">工作内容: </span>
                <span class="expand-value">{{ row.taskContent }}</span>
            </Col>
            <Col span="6" class='item'>
                <span class="expand-key">起始时间: </span>
                <span class="expand-value">{{ row.displayST }}</span>
            </Col>
            <Col span="6" class='item'>
                <span class="expand-key">截至时间: </span>
                <span class="expand-value">{{ row.displayET }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>