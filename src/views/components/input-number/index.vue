<template>
    <div class="moneyBox" :class="align">
        <Input 
            :maxlength="10"
            ref="realInput"
            v-show="!convertShow" 
            :class="className"
            :size="size" 
            :disabled="disabled" 
            :placeholder="placeholder" 
            :value="value" 
            @on-blur="convertShow = true" 
            @input.native="$emit('input', $event.target.value)">
            <Button slot="append">元</Button>
        </Input >
        <Input   
            v-show="convertShow"
            :class="className" 
            :size="size" 
            :disabled="disabled"
            :placeholder="placeholder" 
            @on-focus="realShow"
            v-model="convertedMoney">
            <Button slot="append">元</Button>
        </Input >
    </div>
</template>

<script>
export default {
componentName: 'input-money',
props: {
    //v-model的绑定值，不用多提
    value: {
        required: false
    },
    //样式名称
    className: {
        type: String,
        required: false
    },
    //占位符
    placeholder: {
        type: String,
    },
    //是否可编辑
    disabled: {
        type: Boolean,
        default: false
    },
    //大小
    size:{
        type:String,
        default:'default'
    },
    initial:{
        type:[Number,String],
        default:''
    },
    //是否可清除(暂未支持)
    clearable: {
        type: Boolean,
        required: false,
    },
    //对齐方式
    align:{
        type:String,  //['left','center','right']
        required:false,
    }
},
data() {
    return {
        convertShow: true
    }
},
computed: {
    convertedMoney() {
        return (!Number(this.value).isNaN) ? this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : this.initial;
    }
},
methods: {
    realShow() {
        this.convertShow = false;
        this.$nextTick(() => {
            this.$refs['realInput'].focus();
        })
    }
}

}
</script>

<style lang="" scoped>
    
</style>