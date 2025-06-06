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
import axios from 'axios';

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
    { path: '/', redirect: '/bazi' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫：登录拦截
router.beforeEach(async (to, from, next) => {
    // 如果目标路由是登录页或注册页，直接放行，避免无限重定向
    if (to.path === '/login' || to.path === '/register') {
        next();
        return; // 结束守卫
    }

    // 检查目标路由是否需要登录（例如用户中心）
    // 您可以根据需要在这里添加其他需要登录的路径
    if (to.path === '/user') {
        try {
            // 尝试访问一个需要认证的接口来验证登录状态
            const response = await axios.get('http://localhost:8088/user/profile');
            // 如果请求成功 (状态码 200)，说明已登录，允许继续导航
            if (response.status === 200 && response.data.success) { // 增加检查后端业务成功状态
                next();
            } else {
                // 如果请求有响应，但状态码不是 200，或者后端业务逻辑指示失败，也视为未认证
                console.warn('获取用户详情状态非成功:', response.status, response.data);
                next('/login'); // 重定向到登录页
            }
        } catch (error) {
            // 请求失败，通常是网络问题或后端返回未认证/未授权的状态码
            console.error('验证登录状态失败:', error);
            // 只要请求有响应 (error.response)，就认为是未登录或认证失败，进行重定向
            // 这会捕获 4xx, 5xx 等所有错误响应
            if (error.response) {
                console.log('错误响应状态码:', error.response.status);
                next('/login'); // 重定向到登录页
            } else {
                // 如果请求完全没有响应 (例如网络离线)，暂时允许导航
                console.error('登录状态验证发生网络错误（无响应），允许导航:', error);
                next();
            }
        }
    } else {
        // 如果目标路由不是需要登录的页面，直接放行
        next();
    }
});

// 路由守卫，更新页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router