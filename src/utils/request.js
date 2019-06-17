import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from "../vuex/store";
import user from "../vuex/user";
// import { getToken } from '@/utils/auth'
// 设置允许axios跨域接收cookie，不加这段话可能会导致cookie丢失
axios.defaults.withCredentials = true
let BASE_API = 'https://apiserver.starcomet.club/apis'
// 创建axios实例
const request = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})
console.log('userToken', user.state.userToken);
// request拦截器
request.interceptors.request.use(
    config => {
        if (user.state.userToken) {
      config.headers['Bearer'] = user.state.userToken // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config 
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // if (res.status !== 200) {
    //   // 只有105，展示给用户提示信息
    //   if (res.status === 105) {
    //     // Message({
    //     //   message: res.msg,
    //     //   type: 'error',
    //     //   duration: 5 * 1000
    //     // })
    //     return Promise.reject(res.msg)
    //   }

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.status === 101) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
    //   return Promise.reject('error')
    // } else {
    return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default request
