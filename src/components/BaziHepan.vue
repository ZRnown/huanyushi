<template>
    <div class="page-container">
      <div class="page-panel">
        <h2 class="page-title">八字合盘</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="card-icon">👫</div>
            <h3 class="card-title">情侣合盘</h3>
            <p class="card-desc">分析两人八字匹配度，预测感情发展走向</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">💑</div>
            <h3 class="card-title">婚姻合盘</h3>
            <p class="card-desc">深度解析婚姻运势，指导美满生活</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">🤝</div>
            <h3 class="card-title">事业合盘</h3>
            <p class="card-desc">商业伙伴匹配分析，助力事业成功</p>
          </div>
        </div>
        
        <div class="coming-soon">
          <p class="coming-soon-text">此功能正在开发中，敬请期待...</p>
          <button class="coming-soon-btn" disabled>即将上线</button>
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
    max-width: 800px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    text-align: center;
  }
  
  .page-title {
    font-size: 2.2rem;
    color: #b03a2e;
    margin-bottom: 2rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .feature-card {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 16px;
    padding: 1.8rem 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(233, 196, 106, 0.15);
    border-color: #e9c46a;
  }
  
  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .card-title {
    font-size: 1.3rem;
    color: #314a43;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }
  
  .card-desc {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .coming-soon {
    margin-top: 2rem;
  }
  
  .coming-soon-text {
    color: #314a43;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-style: italic;
  }
  
  .coming-soon-btn {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    border-radius: 12px;
    border: 1px solid rgba(233, 196, 106, 0.3);
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    font-family: inherit;
    font-weight: 600;
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    .page-panel {
      padding: 2rem 1.5rem;
    }
    
    .page-title {
      font-size: 1.8rem;
    }
    
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  