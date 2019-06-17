import Vue from 'vue';
import Vuex from 'vuex';
import user from "./user.js";

Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
    modules: {
        user
    },
    state: {
        // userToken: null,
        // userInfo: null
    },
    mutations: {
        // 登录
        // login(state, userInfo) {
        //     state.userInfo = userInfo;
        //     localStorage.setItem("userInfo", userInfo);
        // },
        // // 退出
        // logout(state, userInfo) {
        //     state.userInfo = "";
        //     localStorage.setItem("userInfo", "");
        // },
        // isToken(state, hasToken) {
        //     // let userToken = getCookie('Token');
        //     // if (userToken) {
        //     //     state.userToken = userToken
        //     // }else{
        //     // }
        // }
    }
})