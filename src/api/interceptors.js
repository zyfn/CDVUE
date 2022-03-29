import axios from 'axios'
import {MessageBox} from 'element-ui'
import Vue from 'vue'


var service=axios.create({
    baseURL:'http://localhost:8080',
    // withCredentials:true,
})
// service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 添加响应拦截器
service.interceptors.response.use((response)=>{
// 对响应数据做点什么
//   window.console.log(response);
    if(response.data.code==502){
        MessageBox.alert('抱歉，您无此权限', '权限异常', {
            confirmButtonText: '确定'})
    }
    return response;
},(error)=>{
    window.confirm("出错了")
});
export default service;