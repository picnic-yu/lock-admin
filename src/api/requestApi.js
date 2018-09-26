import axios from 'axios';
import request from '../libs/utils/request'
import BASE_URL from '@/api/config.js';
// const BASE_URL = '';

   
export default {
    //    新增数据 
    postAppend(path, params){
            return axios({
            method: 'POST',
            url: `${BASE_URL}/${path}`,
            data: params
        })
    },
    //   删除数据 （单个）
    deleteSingle(path){
        return axios({
            method: 'DELETE',
            url: `${BASE_URL}/${path}`,
        });
    },
    //   修改数据
    putEditor (path, params){
        return axios({
            method:'PUT',
            url: `${BASE_URL}/${path}`,
            data: params
        })
     },
      //   查询/（单个）
    getSingle (path, params){
         return axios({
             method:'GET',
             url: `${BASE_URL}/${path}/${params}`,
             data:{
                 id: params
             }
         })
     },
     //   查询/（分页）
    postList (path, params) {
         return axios({
            method:'POST',
            url: `${BASE_URL}/${path}`,
            data: params
        })
     },
    //    数据字典
    getLookupInfo (lookupName){
        return axios({
            method: 'GET',
            // url: `/${base}/lookupLists/lookupName/${lookupName}/lookupValues`,
        })
    }

}
  
// export const postAppend = (path,params)=>{
    //     return axios({
    //         method: 'POST',
    //         url: `${BASE_URL}/${path}`,
    //         data: params
    //     })
    // }


   


    // /**
    //  * 修改数据
    //  */

    //  export const putEditor = (path,params)=>{
    //     return axios({
    //         method:'PUT',
    //         url: `${BASE_URL}/${path}`,
    //         data: params
    //     })
    //  }


    // /**
    //  * 查询/（单个）
    //  */

    //  export const getSingle = (path,params)=>{
    //      return axios({
    //          method:'GET',
    //          url: `${BASE_URL}/${path}/${params}`,
    //          data:{
    //              id: params
    //          }
    //      })
    //  }


    // /**
    //  * 查询/（分页）
    //  */

    //  export const postList = (path,params) => {
    //      return axios({
    //         method:'POST',
    //         url: `${BASE_URL}/${path}`,
    //         data: params
    //     })
    //  }


    //  /**
    //   * 数据字典
    //   */

    // export const getLookupInfo = (lookupName) => {
    //     return axios({
    //         method: 'GET',
    //         // url: `/${base}/lookupLists/lookupName/${lookupName}/lookupValues`,
    //     });
    // };

