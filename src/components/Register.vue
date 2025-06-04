<template>
    <div class="register-container">
      <div class="register-panel">
        <div class="register-header">
          <div class="header-icon">🌟</div>
          <h2 class="register-title">加入唤雨师AI</h2>
          <p class="register-subtitle">开启您的命理探索之旅</p>
        </div>
        
        <form class="register-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">👤</div>
              <input 
                type="text" 
                v-model="username" 
                class="form-input" 
                placeholder="请输入用户名" 
                required
              />
              <div class="input-decoration"></div>
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">📧</div>
              <input 
                type="email" 
                v-model="email" 
                class="form-input" 
                placeholder="请输入邮箱地址" 
                required
              />
              <div class="input-decoration"></div>
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">📱</div>
              <input 
                type="tel" 
                v-model="phone" 
                class="form-input" 
                placeholder="请输入手机号码" 
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
                class="form-input" 
                placeholder="请输入密码（至少6位）" 
                required
                minlength="6"
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
          
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">🔐</div>
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="confirmPassword" 
                class="form-input" 
                placeholder="请确认密码" 
                required
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
              <div class="input-decoration"></div>
            </div>
            <div v-if="password && confirmPassword && password !== confirmPassword" class="error-message">
              密码不一致
            </div>
          </div>
          
          <div class="form-options">
            <label class="agreement">
              <input type="checkbox" v-model="agreeTerms" required />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                我已阅读并同意
                <a href="#" class="terms-link">《用户协议》</a>
                和
                <a href="#" class="terms-link">《隐私政策》</a>
              </span>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="register-btn" 
            :disabled="!canRegister"
          >
            <div class="btn-background"></div>
            <div class="btn-content">
              <span class="btn-text">立即注册</span>
              <div class="btn-ornament">
                <div class="ornament-symbol">🎯</div>
              </div>
            </div>
            <div class="btn-glow"></div>
          </button>
          
          <div class="social-register">
            <div class="divider">
              <span class="divider-text">或使用以下方式注册</span>
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
        
        <div class="register-footer">
          <p class="login-prompt">
            已有账号？
            <router-link to="/login" class="login-link">立即登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const username = ref('')
  const email = ref('')
  const phone = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const agreeTerms = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  const canRegister = computed(() => {
    return username.value && 
           email.value && 
           phone.value && 
           password.value && 
           confirmPassword.value && 
           password.value === confirmPassword.value && 
           password.value.length >= 6 && 
           agreeTerms.value
  })
  
  const handleRegister = () => {
    if (!canRegister.value) return
    
    // 模拟注册逻辑
    console.log('注册信息:', {
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })
    
    // 这里应该调用实际的注册API
    // 注册成功后跳转到登录页面
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .register-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  }
  
  .register-panel {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 20px;
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  }
  
  .register-header {
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
  
  .register-title {
    font-size: 2rem;
    color: #314a43;
    margin-bottom: 0.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  
  .register-subtitle {
    color: #666;
    font-size: 1rem;
    font-style: italic;
  }
  
  .register-form {
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
  
  .form-input {
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
  
  .form-input:focus {
    border-color: #e9c46a;
    box-shadow: 0 0 0 3px rgba(233, 196, 106, 0.1);
    transform: translateY(-1px);
  }
  
  .form-input::placeholder {
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
  
  .form-input:focus + .password-toggle + .input-decoration,
  .form-input:focus + .input-decoration {
    opacity: 1;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  
  .form-options {
    margin: 0.5rem 0;
  }
  
  .agreement {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #314a43;
    line-height: 1.4;
  }
  
  .agreement input {
    display: none;
  }
  
  .checkmark {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(233, 196, 106, 0.5);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  .agreement input:checked + .checkmark {
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    border-color: #c77f6a;
  }
  
  .agreement input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .terms-link {
    color: #dc3545;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .terms-link:hover {
    color: #c82333;
    text-decoration: underline;
  }
  
  .register-btn {
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
  
  .register-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .btn-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
    transition: all 0.3s ease;
  }
  
  .register-btn:hover:not(:disabled) .btn-background {
    background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  }
  
  .register-btn:disabled .btn-background {
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
  
  .register-btn:disabled .btn-text {
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
  
  .register-btn:hover:not(:disabled) .btn-ornament {
    transform: rotate(5deg);
  }
  
  .register-btn:disabled .btn-ornament {
    background: #f0f0f0;
    box-shadow: none;
  }
  
  .ornament-symbol {
    font-size: 1.1rem;
    color: #28a745;
  }
  
  .register-btn:disabled .ornament-symbol {
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
  
  .register-btn:active:not(:disabled) .btn-glow {
    width: 150px;
    height: 150px;
  }
  
  .register-btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .social-register {
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
  
  .register-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(233, 196, 106, 0.2);
  }
  
  .login-prompt {
    color: #666;
    font-size: 0.9rem;
  }
  
  .login-link {
    color: #dc3545;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  .login-link:hover {
    color: #c82333;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .register-panel {
      padding: 2.5rem 2rem;
    }
    
    .register-title {
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
    .register-panel {
      padding: 2rem 1.5rem;
    }
    
    .register-title {
      font-size: 1.6rem;
    }
    
    .btn-content {
      padding: 0.8rem 1.5rem;
    }
  }
  </style>
  