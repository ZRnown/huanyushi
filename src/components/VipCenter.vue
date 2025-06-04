<template>
    <div class="page-container">
      <div class="page-panel">
        <h2 class="page-title">会员中心</h2>
        
        <div class="membership-plans">
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">基础版</h3>
              <div class="plan-price">
                <span class="price-amount">免费</span>
              </div>
            </div>
            <div class="plan-features">
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">基础八字分析</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">每日运势查看</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">简单合盘功能</span>
              </div>
            </div>
            <button class="plan-btn current">当前版本</button>
          </div>
          
          <div class="plan-card premium">
            <div class="plan-badge">推荐</div>
            <div class="plan-header">
              <h3 class="plan-name">高级版</h3>
              <div class="plan-price">
                <span class="price-amount">¥99</span>
                <span class="price-period">/月</span>
              </div>
            </div>
            <div class="plan-features">
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">详细八字解析</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">专业合盘分析</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">运势预测报告</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">专家在线咨询</span>
              </div>
            </div>
            <button class="plan-btn" disabled>即将开放</button>
          </div>
          
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">至尊版</h3>
              <div class="plan-price">
                <span class="price-amount">¥299</span>
                <span class="price-period">/月</span>
              </div>
            </div>
            <div class="plan-features">
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">全部高级功能</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">一对一大师指导</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">定制化分析报告</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span class="feature-text">优先客服支持</span>
              </div>
            </div>
            <button class="plan-btn" disabled>即将开放</button>
          </div>
        </div>
        
        <div class="user-info">
          <div class="info-card">
            <h3 class="info-title">账户信息</h3>
            <div class="info-item">
              <span class="info-label">当前版本：</span>
              <span class="info-value">基础版</span>
            </div>
            <div class="info-item">
              <span class="info-label">到期时间：</span>
              <span class="info-value">永久有效</span>
            </div>
            <div class="info-item">
              <span class="info-label">剩余次数：</span>
              <span class="info-value">无限制</span>
            </div>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">使用统计</h3>
            <div class="info-item">
              <span class="info-label">本月分析：</span>
              <span class="info-value">0 次</span>
            </div>
            <div class="info-item">
              <span class="info-label">累计分析：</span>
              <span class="info-value">0 次</span>
            </div>
            <div class="info-item">
              <span class="info-label">注册时间：</span>
              <span class="info-value">今天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 占位组件
  </script>
  
  <style scoped>
  .page-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  }
  
  .page-panel {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 1000px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  .page-title {
    font-size: 2.2rem;
    color: #314a43;
    text-align: center;
    margin-bottom: 2.5rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  
  .membership-plans {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .plan-card {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 16px;
    padding: 1.8rem 1.5rem;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(233, 196, 106, 0.15);
    border-color: #e9c46a;
  }
  
  .plan-card.premium {
    border-color: #e9c46a;
    box-shadow: 0 8px 25px rgba(233, 196, 106, 0.15);
  }
  
  .plan-badge {
    position: absolute;
    top: -10px;
    right: 20px;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
    padding: 0.3rem 1rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .plan-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .plan-name {
    font-size: 1.4rem;
    color: #314a43;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }
  
  .plan-price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.3rem;
  }
  
  .price-amount {
    font-size: 2rem;
    color: #e9c46a;
    font-weight: bold;
  }
  
  .price-period {
    font-size: 1rem;
    color: #666;
  }
  
  .plan-features {
    margin-bottom: 1.5rem;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }
  
  .feature-icon {
    color: #e9c46a;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .feature-text {
    color: #314a43;
    font-size: 1rem;
  }
  
  .plan-btn {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .plan-btn:not(:disabled) {
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
  }
  
  .plan-btn:not(:disabled):hover {
    background: linear-gradient(135deg, #c77f6a 0%, #d9998a 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(233, 196, 106, 0.3);
  }
  
  .plan-btn:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
  
  .plan-btn.current {
    background: rgba(233, 196, 106, 0.2);
    color: #314a43;
    border: 1px solid rgba(233, 196, 106, 0.3);
  }
  
  .user-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .info-card {
    background: rgba(233, 196, 106, 0.05);
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
  }
  
  .info-title {
    font-size: 1.3rem;
    color: #314a43;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(233, 196, 106, 0.1);
  }
  
  .info-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .info-label {
    color: #666;
    font-size: 1rem;
  }
  
  .info-value {
    color: #314a43;
    font-size: 1rem;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .page-panel {
      padding: 2rem 1.5rem;
    }
    
    .page-title {
      font-size: 1.8rem;
    }
    
    .membership-plans {
      grid-template-columns: 1fr;
    }
    
    .user-info {
      grid-template-columns: 1fr;
    }
  }
  </style>
  