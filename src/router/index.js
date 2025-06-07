import { createRouter, createWebHistory } from 'vue-router'
import BaziInput from '../components/BaziInput.vue'
import BaziHepan from '../components/BaziHepan.vue'
import BaziResult from '../components/BaziResult.vue'
import CaseRecords from '../components/CaseRecords.vue'
import StudyClass from '../components/StudyClass.vue'
import VipCenter from '../components/VipCenter.vue'
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import UserCenter from "../components/UserCenter.vue"
import ServiceAgreement from "../components/ServiceAgreement.vue"
import PrivacyPolicy from "../components/PrivacyPolicy.vue"
import axios from 'axios';
import NProgress from 'nprogress';
import { useUserStore } from '../stores/user'; // 导入用户 store

// 配置 NProgress 样式
NProgress.configure({
    easing: 'ease', // 动画效果
    speed: 500, // 进度条速度
    showSpinner: false, // 是否显示加载图标
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.08, // 初始化时的最小百分比
    parent: 'body', // 进度条的父容器
    // 自定义颜色，例如与网站主题色搭配的金色
    template: '<div class="bar" role="bar" style="background-color: #e9c46a;"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
});

const routes = [
    {
        path: '/bazi', component: BaziInput, meta: { title: "八字排盘 - 唤雨师AI" },
    },
    {
        path: '/hepan', component: BaziHepan, meta: { title: "八字合盘 - 唤雨师AI" },
    },
    {
        path: '/cases', component: CaseRecords, meta: { title: "案例记录 - 唤雨师AI" },
    },
    {
        path: '/study', component: StudyClass, meta: { title: "学习课堂 - 唤雨师AI" },
    },
    {
        path: '/vip', component: VipCenter, meta: { title: "会员中心 - 唤雨师AI" },
    },
    {
        path: "/result",
        component: BaziResult,
        meta: { title: "八字分析结果 - 唤雨师AI" },
    },
    {
        path: "/login",
        component: Login,
        meta: { title: "登录 - 唤雨师AI" },
    },
    {
        path: "/register",
        component: Register,
        meta: { title: "注册 - 唤雨师AI" },
    },
    {
        path: "/user",
        component: UserCenter,
        meta: { title: "用户中心 - 唤雨师AI" },
    },
    {
        path: "/agreement",
        component: ServiceAgreement,
        meta: { title: "服务协议 - 唤雨师AI" },
    },
    {
        path: "/privacy",
        component: PrivacyPolicy,
        meta: { title: "隐私政策 - 唤雨师AI" },
    },
    { path: '/', redirect: '/bazi' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫：统一处理登录状态和路由跳转
router.beforeEach(async (to, from, next) => {
    NProgress.start(); // 进度条开始

    const userStore = useUserStore(); // 在守卫中初始化 store

    // 辅助函数：检查用户是否已登录
    const checkLoginStatus = async () => {
        if (userStore.userInfo) {
            // 如果 store 中已有用户信息，则认为已登录
            return true;
        }
        // 否则，尝试从后端获取用户信息，并更新 store
        await userStore.fetchUserInfo();
        // 返回是否成功获取到用户信息（即是否已登录）
        return !!userStore.userInfo;
    };

    // 如果目标路由是登录页或注册页
    if (to.path === '/login' || to.path === '/register') {
        const loggedIn = await checkLoginStatus(); // 检查登录状态
        if (loggedIn) {
            console.log('用户已登录，从登录/注册页重定向到个人主页。');
            NProgress.done(); // 结束进度条
            next('/user'); // 重定向到用户中心
        } else {
            console.log('用户未登录或登录状态失效，允许访问登录/注册页。');
            next(); // 允许访问登录/注册
        }
        return; // 结束守卫
    }

    // 如果目标路由是需要登录才能访问的页面，例如 /user
    // 您可以在这里添加其他需要登录的页面路径
    if (to.path === '/user') {
        const loggedIn = await checkLoginStatus();
        if (loggedIn) {
            console.log('用户已登录，允许访问个人主页。');
            next();
        } else {
            console.log('用户未登录，重定向到登录页。');
            NProgress.done(); // 结束进度条
            next('/login'); // 重定向到登录页
        }
        return; // 结束守卫
    }

    // 对于所有其他路由，直接放行
    next();
});

// 路由守卫，更新页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

// 全局后置守卫：进度条结束
router.afterEach(() => {
    NProgress.done();
});

export default router