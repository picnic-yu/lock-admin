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
import { getBindingStaff } from '@/api/lock-manage/lock-info';

const getBindingStaffAction = (self, id) => {
   
    getBindingStaff(id).then(res=>{
        
        
       if(res.code == 200){
            self.listData = res.content;
            self.listData.forEach((item) =>{
                item.mobileNumber = item.principal.mobileNumber;
                item.personName = item.principal.personName;
            });
            
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
                        title: '姓名',
                        align: 'center',
                        key: 'personName'
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'mobileNumber'
                    }
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
                getBindingStaffAction(this,this.row.id)
            }
        }

    };
</script>
