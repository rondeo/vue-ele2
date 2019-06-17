import { menu, loginout } from "../api/userMG";
import { setCookie, getCookie, delCookie } from '../utils/util'
import { promises } from "fs";

const user = {
    state: {
        userToken: getCookie('userToken'),
        userInfo: null,
    },
    mutations: {
        SET_TOKEN: (state, userToken) => {
            state.userToken = userToken
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {
        // 登陆token
        setToken({commit, state}, token) {
            console.error({token});
            commit('SET_TOKEN', token);
            setCookie('userToken', token);
        },
        // 全局获取suerInfo
        getUserInfo({commit, state}) {
            return new Promise(( resolve, reject) => {
                menu().then(res => {
                if (res.status === 200) {
                    commit('SET_USERINFO', userInfo)
                    console.log('userInfo', state.userInfo);
                } else {
                    commit('SET_USERINFO', '')
                    alert(res.msg);
                    reject(res.msg);
                }
                resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        loginOut({commit, state}) {
            return new Promise((res, rej) => {
                loginout(state.userToken).then( res => {
                    if(res.status === 200) {
                        alert('登出')
                        res(res)
                    }else{
                        alert('登出失败')
                        rej(res.msg)
                    }
                }).catch( error => {
                        rej(error)
                })
            })
        }
    },
}

export default user