import { createRouter, createWebHistory } from 'vue-router'
import BaziInput from '../components/BaziInput.vue'
import BaziHepan from '../components/BaziHepan.vue'
import CaseRecords from '../components/CaseRecords.vue'
import StudyClass from '../components/StudyClass.vue'
import VipCenter from '../components/VipCenter.vue'

const routes = [
    { path: '/bazi', component: BaziInput },
    { path: '/hepan', component: BaziHepan },
    { path: '/cases', component: CaseRecords },
    { path: '/study', component: StudyClass },
    { path: '/vip', component: VipCenter },
    { path: '/', redirect: '/bazi' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router