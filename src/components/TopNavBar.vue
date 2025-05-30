<template>
    <header class="top-navbar">
        <div class="nav-golden-bar"></div>
        <div class="nav-content">
            <div class="nav-logo-area">
                <span class="nav-title">唤雨师AI</span>
            </div>
            <nav class="nav-menu">
                <router-link v-for="item in menu" :key="item.path" :to="item.path" class="nav-menu-item"
                    active-class="active">{{ item.label }}</router-link>
            </nav>
            <div class="nav-right-area"></div>
        </div>
    </header>
</template>

<script setup>
const menu = [
    { label: '八字排盘', path: '/bazi' },
    { label: '八字合盘', path: '/hepan' },
    { label: '案例记录', path: '/cases' },
    { label: '学习课堂', path: '/study' },
    { label: '会员中心', path: '/vip' }
]
</script>

<style scoped>
.top-navbar {
    position: relative;
    width: 100vw;
    height: 64px;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 2px 16px 0 rgba(44, 62, 80, 0.07);
    z-index: 10;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.nav-golden-bar {
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #e9c46a 0%, #fffbe6 100%);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 2px 8px #e9c46a33;
}

.nav-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 32px;
    height: 60px;
    background: none;
}

.nav-logo-area {
    display: flex;
    align-items: center;
    gap: 14px;
}

.nav-logo {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fffbe6;
    box-shadow: 0 2px 8px #e9c46a33;
    border: 1.5px solid #e9c46a;
    object-fit: contain;
}

.nav-title {
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
    font-size: 1.5rem;
    color: #314a43;
    letter-spacing: 0.18em;
    font-weight: bold;
    text-shadow: 0 2px 8px #e9c46a22, 0 1px 0 #fff;
}

.nav-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
}

.nav-menu-item {
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
    font-size: 1.12rem;
    color: #314a43;
    text-decoration: none;
    padding: 7px 22px;
    border-radius: 18px;
    transition: background 0.22s, color 0.22s, box-shadow 0.22s, transform 0.18s;
    position: relative;
    background: none;
    box-shadow: none;
}

.nav-menu-item.active,
.nav-menu-item:hover {
    background: linear-gradient(90deg, #fffbe6 0%, #e9c46a 100%);
    color: #b03a2e;
    box-shadow: 0 2px 12px #e9c46a33;
    transform: translateY(-2px) scale(1.06);
}

.nav-right-area {
    width: 38px;
    height: 38px;
}

@media (max-width: 900px) {
    .nav-content { padding: 0 8px; }
    .nav-title { font-size: 1.08rem; }
    .nav-menu { gap: 10px; }
    .nav-menu-item { font-size: 0.98rem; padding: 4px 10px; }
    .nav-logo { width: 28px; height: 28px; }
    .nav-right-area { width: 28px; height: 28px; }
}
</style>