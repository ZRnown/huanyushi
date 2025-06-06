<template>
    <header class="top-navbar">
        <div class="nav-content">
            <!-- Logo区域 -->
            <div class="nav-logo-area">
                <router-link to="/" class="nav-logo-link">
                    <div class="nav-logo">☯</div>
                    <span class="nav-title">唤雨师AI</span>
                </router-link>
            </div>
            
            <!-- 导航菜单 -->
            <nav class="nav-menu">
                <router-link v-for="item in menu" :key="item.path" :to="item.path" class="nav-menu-item"
                    active-class="active">
                    <span class="menu-icon">{{ item.icon }}</span>
                    <span class="menu-text">{{ item.label }}</span>
                </router-link>
            </nav>
            
            <!-- 右侧功能区 -->
            <div class="nav-actions">
                <!-- 语言切换 -->
                <div class="action-item language-switcher" @click="toggleLanguage">
                    <div class="action-icon">🌐</div>
                    <span class="action-text">{{ currentLang === 'zh' ? 'EN' : '中文' }}</span>
                </div>
                
                <!-- 用户中心/登录入口 -->
                <!-- 显示用户图标和文本，已登录时点击跳转个人中心，未登录跳转登录页 -->
                <div class="action-item user-center" @click="handleUserClick">
                    <div class="action-icon">👤</div>
                    <span class="action-text">{{ isLoggedIn ? '用户' : '登录' }}</span>
                </div>
                
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLang = ref('zh')

// TODO: 实际应用中，isLoggedIn 和 userData 应来自全局状态管理
const isLoggedIn = ref(true); // 模拟已登录状态
const userData = ref({ // 占位数据，虽然头像不显示，但可能在其他地方使用
    username: '测试用户',
    avatarUrl: 'https://via.placeholder.com/150/a08a78/fff?text=User' 
});

const menu = [
    { label: '八字排盘', path: '/bazi', icon: '☰' },
    { label: '八字合盘', path: '/hepan', icon: '☯' },
    { label: '案例记录', path: '/cases', icon: '📋' },
    { label: '学习课堂', path: '/study', icon: '📚' },
    { label: '会员中心', path: '/vip', icon: '👑' }
]

const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
}

const handleUserClick = () => {
    if (isLoggedIn.value) {
        // 已登录，点击跳转到个人中心
         router.push('/user');
    } else {
        // 未登录点击跳转到登录页
        router.push('/login')
    }
}

// 移除下拉菜单相关的函数和逻辑
// const goToUserCenter = () => { router.push('/user'); }
// const goToVip = () => { router.push('/vip'); }
// const goToSettings = () => { /* 跳转到设置页面 */ }
// const logout = () => { 
//     isLoggedIn.value = false;
//     // TODO: 执行退出登录逻辑，清除全局用户状态和token等
//     router.push('/login'); 
// }

// 移除点击外部关闭下拉菜单的事件监听
// onMounted(() => {
//    // ... 其他 onMounted 逻辑 ...
// });
//
// onUnmounted(() => {
//    // ... 其他 onUnmounted 逻辑 ...
// });
</script>

<style scoped>
.top-navbar {
    position: relative;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(233, 196, 106, 0.2);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    z-index: 1000;
}

.nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 70px;
}

/* Logo区域 */
.nav-logo-area {
    display: flex;
    align-items: center;
}

.nav-logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    transition: transform 0.3s ease;
}

.nav-logo-link:hover {
    transform: scale(1.02);
}

.nav-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #fff;
    box-shadow: 0 4px 12px rgba(233, 196, 106, 0.3);
    animation: logoSpin 20s linear infinite;
}

@keyframes logoSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.nav-title {
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
    font-size: 1.4rem;
    color: #314a43;
    font-weight: bold;
    letter-spacing: 0.1em;
}

/* 导航菜单 */
.nav-menu {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    text-decoration: none;
    color: #314a43;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
}

.nav-menu-item:hover {
    background: rgba(233, 196, 106, 0.1);
    color: #b03a2e;
    transform: translateY(-1px);
}

.nav-menu-item.active {
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(233, 196, 106, 0.3);
}

/* 会员中心特殊样式 */
.nav-menu-item[href="/vip"] {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #fff;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.nav-menu-item[href="/vip"]:hover {
    background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
}

.nav-menu-item[href="/vip"] .menu-icon {
    color: #ffd700;
    animation: crownGlow 2s infinite ease-in-out;
}

@keyframes crownGlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.menu-icon {
    font-size: 1.1rem;
}

.menu-text {
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
}

/* 右侧功能区 */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    /* 移除position: relative; 如果不需要其他绝对定位元素*/
}

.action-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.action-item:hover {
    background: rgba(233, 196, 106, 0.1);
    color: #b03a2e;
}

.action-icon {
    font-size: 1.2rem;
}

.action-text {
    font-size: 1rem;
    font-weight: 500;
}

/* 移除用户头像样式 */
/*
.user-avatar-item {
    padding: 0.3rem;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #e9c46a;
    object-fit: cover;
    transition: all 0.3s ease;
}

.user-avatar-item:hover .user-avatar {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(233, 196, 106, 0.3);
}
*/

/* 移除用户下拉菜单样式 */
/*
.user-dropdown {
    position: absolute;
    top: 60px;
    right: 0;
    background: #fffbe6;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    min-width: 150px;
    z-index: 1001;
    animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    color: #314a43;
    font-size: 0.95rem;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
    background-color: rgba(233, 196, 106, 0.1);
    color: #b03a2e;
}

.dropdown-icon {
    font-size: 1.1rem;
}

.dropdown-divider {
    height: 1px;
    background: rgba(233, 196, 106, 0.3);
    margin: 0.5rem 0;
}

.logout-item {
    color: #dc3545;
}

.logout-item:hover {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}
*/

/* 响应式调整 */
@media (max-width: 768px) {
    .nav-content {
        padding: 0 1rem;
    }
    
    .nav-menu {
        display: none; /* 小屏幕下隐藏导航菜单 */
    }
    
    .nav-actions {
        gap: 1rem;
    }
    
    .action-text {
        display: none; /* 小屏幕下隐藏操作文本 */
    }
/* 移除小屏幕下下拉菜单位置调整 */
/*
    .user-dropdown {
        right: 10px;
    }
*/
}

</style>
