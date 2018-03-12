import axios from 'axios';
// 此处单独引入 elementUI 中的 Message（消息框）
import { Message } from 'element-ui';
import store from '../store';
import { getToken } from '@/utils/auth';

const ajax = axios.create({
    // api的base_url
    baseURL: process.env.BASE_API,
    // 请求超时时间
    timeout: 5000
})

// 请求拦截
ajax.interceptors.request.use(config => {
    console.log("我经过了请求拦截");
    // 通过vuex state获取当前的token是否存在
    if (store.getters.token) {
        // 让每个请求头携带自定义token 
        // 根据实际情况自行修改
        config.headers['X-Token'] = getToken();
    }
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
})

// 响应拦截
// ajax.interceptors.response.use(response => {
//     // code为非20000抛错 可结合自己业务进行修改
//     const res = response.data;
//     if (res.code !== 20000) {
//         // elementUI 中 Message（消息提示）的样式配置
//         Message({
//             message: res.data,
//             type: 'error',
//             // 执行时间
//             duration: 5 * 1000
//         })

//         // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//         if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//             MessageBox.confrim('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出',{
//                 confirmButtonText: '重新登录',
//                 cancelButtonText: '取消',
//                 type: 'warning'
//             }).then(() => {
//                 store.dispatch('FedLogOut').then(() => {
//                     // 页面刷新
//                     // 为了重新实例化vue-router对象 避免bug
//                     location.reload();
//                 });
//             })
//         }
//         return Promise.reject('error');
//     } else {
//         return response.data;
//     }
//     }
    ajax.interceptors.response.use(
        response => response,
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
)

export default ajax;