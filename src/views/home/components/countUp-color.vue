<template>
    <div>
        <p :class="classNames" :style="{color: color, fontSize: countSize, fontWeight: countWeight}" style="margin-left:30px;"><span v-cloak :id="classNames">{{ startVal }}</span>
        <span>{{ unit }}</span> 
        <i class="textDescription" :style="{color: descriptionColor}">{{ textDescription }}</i>
        </p>
        <slot name="intro"></slot>
    </div>
</template>

<script>
import CountUp from 'countup';

function transformValue (val) {
    let endVal = 0;
    let unit = '';
    // if (val < 1000) {
    //     endVal = val;
    // } else if (val >= 1000 && val < 1000000) {
    //     endVal = parseInt(val / 1000);
    //     unit = 'K+';
    // } else if (val >= 1000000 && val < 10000000000) {
    //     endVal = parseInt(val / 1000000);
    //     unit = 'M+';
    // } else {
    //     endVal = parseInt(val / 1000000000);
    //     unit = 'B+';
    // }
    endVal = val;
    return {
        val: endVal,
        unit: unit
    };
}

export default {
    data () {
        return {
            classNames:'id'+Math.random()*10000,
            unit: '',
            demo: {}
        };
    },
    name: 'countUp',
    props: {
        textDescription: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        },
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        decimals: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 1500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        descriptionColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        countSize: {
            type: String,
            default: '26px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted () {
        // this.$nextTick(() => {
        //     setTimeout(() => {
        //         let res = transformValue(this.endVal);
        //         let endVal = res.val;
        //         this.unit = res.unit;
        //         let demo = {};
        //         this.demo = demo = new CountUp(this.classNames, this.startVal, endVal, this.decimals, this.duration, this.options);
        //         if (!demo.error) {
        //             demo.start();
        //         }
        //     }, this.delay);
        // });
    },
    watch: {
        endVal: {
            immediate: true,
            handler(val, oldVal) {
                setTimeout(() => {
                    let res = transformValue(this.endVal);
                    let endVal = res.val;
                    this.unit = res.unit;
                    let demo = {};
                    this.demo = demo = new CountUp(this.classNames, this.startVal, endVal, this.decimals, this.duration, this.options);
                    if (!demo.error) {
                        demo.start();
                    }
                }, 0);
            }
        },
    }
};
</script>

<style  lang='less' scoped>
    .textDescription{
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        display: inline-block;
        color: rgba(54, 56, 60, 0.74);
    }
</style>



