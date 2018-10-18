<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Table :columns="columns" :data="listData" ></Table>
    </div>
</template>
<script>
import { getGroupDetails } from '@/api/lock-manage/lock-setting';

const getGroupDetailsAction = (self, id) => {
   
    getGroupDetails(id).then(res=>{
        
        
       if(res.code == 200){
            self.listData = res.content;
            // self.listData.forEach((item) =>{
            //     item.mobileNumber = item.principal.mobileNumber;
            //     item.personName = item.principal.personName;
            // });
            
        }else{
            self.listData = [];
            
        }
    }).catch((e)=>{
       
        self.listData = [];
        
    })
}
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '锁具ID',
                        align: 'center',
                        key: 'lockId'
                    },
                    {
                        title: '位置编号',
                        align: 'center',
                        key: 'lockLocationCode'
                    },
                    {
                        title: '开锁顺序',
                        align: 'center',
                        key: 'unlockOrder'
                    },
                    {
                        title: '关锁顺序',
                        align: 'center',
                        key: 'lockOrder'
                    },
                    
                ],
                listData: [
                
                ]
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                console.log(this.row)
                getGroupDetailsAction(this,this.row.id)
            }
        }

    };
</script>
