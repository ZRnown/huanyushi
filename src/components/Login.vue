<template>
    <div class="login-container">
      <div class="login-panel">
        <div class="login-header">
          <div class="header-icon">🔮</div>
          <h2 class="login-title">登录唤雨师AI</h2>
          <p class="login-subtitle">探索命运奥秘，开启智慧之旅</p>
        </div>
        
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">📧</div>
              <input 
                type="email" 
                v-model="email" 
                class="gufeng-input" 
                placeholder="请输入邮箱地址" 
                required
              />
              <div class="input-decoration"></div>
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">🔒</div>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                class="gufeng-input" 
                placeholder="请输入密码" 
                required
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
              <div class="input-decoration"></div>
            </div>
          </div>
          
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              <span class="checkbox-text">记住我</span>
            </label>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>
          
          <button type="submit" class="gufeng-btn" :disabled="!email || !password">
            <div class="btn-background"></div>
            <div class="btn-content">
              <span class="btn-text">登录</span>
              <div class="btn-ornament">
                <div class="ornament-symbol">✨</div>
              </div>
            </div>
            <div class="btn-glow"></div>
          </button>
          
          <div class="social-login">
            <div class="divider">
              <span class="divider-text">或使用以下方式登录</span>
            </div>
            <div class="social-buttons">
              <button type="button" class="social-btn wechat">
                <span class="social-icon">💬</span>
                <span>微信</span>
              </button>
              <button type="button" class="social-btn qq">
                <span class="social-icon">🐧</span>
                <span>QQ</span>
              </button>
              <button type="button" class="social-btn weibo">
                <span class="social-icon">📱</span>
                <span>微博</span>
              </button>
            </div>
          </div>
        </form>
        
        <div class="login-footer">
          <p class="register-prompt">
            还没有账号？
            <router-link to="/register" class="register-link">立即注册</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const showPassword = ref(false)
  
  const handleLogin = () => {
    // 模拟登录逻辑
    console.log('登录信息:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
    
    // 这里应该调用实际的登录API
    // 登录成功后跳转到用户中心
    router.push('/user')
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  }
  
  .login-panel {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 20px;
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  .header-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: iconFloat 3s infinite ease-in-out;
  }
  
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .login-title {
    font-size: 2rem;
    color: #314a43;
    margin-bottom: 0.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  
  .login-subtitle {
    color: #666;
    font-size: 1rem;
    font-style: italic;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .input-icon {
    position: absolute;
    left: 1rem;
    z-index: 2;
    font-size: 1.2rem;
    color: #c77f6a;
  }
  
  .gufeng-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 12px;
    background: #fff;
    color: #314a43;
    font-size: 1.1rem;
    font-family: inherit;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .gufeng-input:focus {
    border-color: #e9c46a;
    box-shadow: 0 0 0 3px rgba(233, 196, 106, 0.1);
    transform: translateY(-1px);
  }
  
  .gufeng-input::placeholder {
    color: #999;
    font-style: italic;
  }
  
  .password-toggle {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
    z-index: 2;
  }
  
  .password-toggle:hover {
    color: #c77f6a;
  }
  
  .input-decoration {
    position: absolute;
    bottom: 0;
    left: 3rem;
    right: 1rem;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e9c46a, transparent);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .gufeng-input:focus + .password-toggle + .input-decoration,
  .gufeng-input:focus + .input-decoration {
    opacity: 1;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #314a43;
  }
  
  .remember-me input {
    display: none;
  }
  
  .checkmark {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(233, 196, 106, 0.5);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .remember-me input:checked + .checkmark {
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    border-color: #c77f6a;
  }
  
  .remember-me input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .forgot-password {
    color: #dc3545;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }
  
  .forgot-password:hover {
    color: #c82333;
    text-decoration: underline;
  }
  
  .gufeng-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    overflow: hidden;
    outline: none;
    margin-top: 1rem;
  }
  
  .gufeng-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .btn-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(220, 53, 69, 0.3);
    transition: all 0.3s ease;
  }
  
  .gufeng-btn:hover:not(:disabled) .btn-background {
    background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
  }
  
  .gufeng-btn:disabled .btn-background {
    background: #e5e5e5;
    box-shadow: none;
  }
  
  .btn-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    z-index: 2;
  }
  
  .btn-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.1em;
  }
  
  .gufeng-btn:disabled .btn-text {
    color: #999;
  }
  
  .btn-ornament {
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transform: rotate(-5deg);
    transition: transform 0.3s ease;
  }
  
  .gufeng-btn:hover:not(:disabled) .btn-ornament {
    transform: rotate(5deg);
  }
  
  .gufeng-btn:disabled .btn-ornament {
    background: #f0f0f0;
    box-shadow: none;
  }
  
  .ornament-symbol {
    font-size: 1.1rem;
    color: #dc3545;
  }
  
  .gufeng-btn:disabled .ornament-symbol {
    color: #ccc;
  }
  
  .btn-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
  }
  
  .gufeng-btn:active:not(:disabled) .btn-glow {
    width: 150px;
    height: 150px;
  }
  
  .gufeng-btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .social-login {
    margin-top: 2rem;
  }
  
  .divider {
    text-align: center;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(233, 196, 106, 0.3);
  }
  
  .divider-text {
    background: #fff;
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
  }
  
  .social-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .social-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 8px;
    background: #fff;
    color: #314a43;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .social-btn:hover {
    border-color: #e9c46a;
    background: rgba(233, 196, 106, 0.05);
    transform: translateY(-1px);
  }
  
  .social-icon {
    font-size: 1.1rem;
  }
  
  .login-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(233, 196, 106, 0.2);
  }
  
  .register-prompt {
    color: #666;
    font-size: 0.9rem;
  }
  
  .register-link {
    color: #dc3545;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  .register-link:hover {
    color: #c82333;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .login-panel {
      padding: 2.5rem 2rem;
    }
    
    .login-title {
      font-size: 1.8rem;
    }
    
    .social-buttons {
      flex-direction: column;
    }
    
    .social-btn {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .login-panel {
      padding: 2rem 1.5rem;
    }
    
    .login-title {
      font-size: 1.6rem;
    }
    
    .btn-content {
      padding: 0.8rem 1.5rem;
    }
  }
  </style>
  