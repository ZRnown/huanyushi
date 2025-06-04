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
                
                <!-- 用户中心 -->
                <div class="action-item user-center" @click="handleUserClick">
                    <div class="action-icon">👤</div>
                    <span class="action-text">{{ isLoggedIn ? '用户' : '登录' }}</span>
                    <div v-if="isLoggedIn" class="dropdown-arrow">▼</div>
                </div>
                
                <!-- 用户下拉菜单 -->
                <div v-if="showUserMenu && isLoggedIn" class="user-dropdown" @click.stop>
                    <div class="dropdown-item" @click="goToUserCenter">
                        <span class="dropdown-icon">👤</span>
                        <span>个人中心</span>
                    </div>
                    <div class="dropdown-item" @click="goToVip">
                        <span class="dropdown-icon">👑</span>
                        <span>会员中心</span>
                    </div>
                    <div class="dropdown-item" @click="goToSettings">
                        <span class="dropdown-icon">⚙️</span>
                        <span>设置</span>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item logout-item" @click="logout">
                        <span class="dropdown-icon">🚪</span>
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLang = ref('zh')
const showUserMenu = ref(false)
const isLoggedIn = ref(false) // 模拟登录状态

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
        showUserMenu.value = !showUserMenu.value
    } else {
        router.push('/login')
    }
}

const goToUserCenter = () => {
    showUserMenu.value = false
    router.push('/user')
}

const goToVip = () => {
    showUserMenu.value = false
    router.push('/vip')
}

const goToSettings = () => {
    showUserMenu.value = false
    // 跳转到设置页面
}

const logout = () => {
    showUserMenu.value = false
    isLoggedIn.value = false
    // 执行退出登录逻辑
}

// 点击外部关闭下拉菜单
onMounted(() => {
    document.addEventListener('click', () => {
        showUserMenu.value = false
    })
})
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
    gap: 1rem;
    position: relative;
}

.action-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(233, 196, 106, 0.3);
}

.action-item:hover {
    background: rgba(233, 196, 106, 0.1);
    border-color: #e9c46a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 196, 106, 0.2);
}

.action-icon {
    font-size: 1.1rem;
    color: #c77f6a;
}

.action-text {
    font-size: 0.9rem;
    color: #314a43;
    font-weight: 500;
}

.dropdown-arrow {
    font-size: 0.7rem;
    color: #666;
    transition: transform 0.3s ease;
}

.user-center:hover .dropdown-arrow {
    transform: rotate(180deg);
}

/* 用户下拉菜单 */
.user-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    min-width: 160px;
    z-index: 1001;
    animation: dropdownSlide 0.3s ease;
}

@keyframes dropdownSlide {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    color: #314a43;
}

.dropdown-item:hover {
    background: rgba(233, 196, 106, 0.1);
    color: #b03a2e;
}

.dropdown-item:first-child {
    border-radius: 12px 12px 0 0;
}

.dropdown-item:last-child {
    border-radius: 0 0 12px 12px;
}

.dropdown-icon {
    font-size: 1rem;
    color: #c77f6a;
}

.logout-item:hover {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

.logout-item:hover .dropdown-icon {
    color: #dc3545;
}

.dropdown-divider {
    height: 1px;
    background: rgba(233, 196, 106, 0.2);
    margin: 0.5rem 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .nav-content {
        padding: 0 1.5rem;
    }
    
    .nav-menu {
        gap: 0.3rem;
    }
    
    .nav-menu-item {
        padding: 0.5rem 0.8rem;
        font-size: 0.9rem;
    }
    
    .menu-text {
        display: none;
    }
}

@media (max-width: 768px) {
    .nav-content {
        padding: 0 1rem;
        height: 60px;
    }
    
    .nav-title {
        font-size: 1.2rem;
    }
    
    .nav-logo {
        width: 35px;
        height: 35px;
        font-size: 1.1rem;
    }
    
    .action-text {
        display: none;
    }
    
    .nav-actions {
        gap: 0.5rem;
    }
}

@media (max-width: 480px) {
    .nav-menu {
        gap: 0.2rem;
    }
    
    .nav-menu-item {
        padding: 0.4rem 0.6rem;
    }
    
    .menu-icon {
        font-size: 1rem;
    }
}
</style>
