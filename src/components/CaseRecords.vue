<template>
    <div class="page-container">
      <div class="page-panel">
        <h2 class="page-title">案例记录</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="card-icon">💾</div>
            <h3 class="card-title">历史记录</h3>
            <p class="card-desc">保存所有分析历史，随时回顾查看</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">📊</div>
            <h3 class="card-title">趋势分析</h3>
            <p class="card-desc">追踪命运变化轨迹，洞察发展趋势</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">🔍</div>
            <h3 class="card-title">详细解读</h3>
            <p class="card-desc">深入解析每次分析结果，提供专业建议</p>
          </div>
        </div>
        
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">暂无案例记录</h3>
          <p class="empty-desc">您还没有进行过八字分析，请先完成分析后查看记录</p>
          <router-link to="/bazi" class="action-btn">
            <span>开始分析</span>
          </router-link>
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
  
  .empty-state {
    background: rgba(233, 196, 106, 0.05);
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    margin-top: 1rem;
  }
  
  .empty-icon {
    font-size: 3rem;
    color: #e9c46a;
    margin-bottom: 1rem;
  }
  
  .empty-title {
    font-size: 1.4rem;
    color: #314a43;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }
  
  .empty-desc {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
  
  .action-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .action-btn:hover {
    background: linear-gradient(135deg, #c77f6a 0%, #d9998a 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(233, 196, 106, 0.3);
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
    
    .empty-title {
      font-size: 1.3rem;
    }
    
    .empty-desc {
      font-size: 1rem;
    }
  }
  </style>
  