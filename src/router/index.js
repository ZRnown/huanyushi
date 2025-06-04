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
// 路由守卫，更新页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router