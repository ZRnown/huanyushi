<template>
    <div class="page-container">
      <div class="page-panel">
        <h2 class="page-title">学习课堂</h2>
        
        <div class="course-categories">
          <div class="category-tab active">基础入门</div>
          <div class="category-tab">进阶课程</div>
          <div class="category-tab">大师讲座</div>
        </div>
        
        <div class="course-grid">
          <div class="course-card">
            <div class="course-image"></div>
            <div class="course-content">
              <h3 class="course-title">八字基础知识</h3>
              <div class="course-info">
                <span class="course-level">入门</span>
                <span class="course-duration">12课时</span>
              </div>
              <p class="course-desc">了解八字命理的基本概念，学习天干地支、五行相生相克的基础知识</p>
              <div class="course-footer">
                <span class="course-price">免费</span>
                <button class="course-btn" disabled>即将开放</button>
              </div>
            </div>
          </div>
          
          <div class="course-card">
            <div class="course-image"></div>
            <div class="course-content">
              <h3 class="course-title">命盘解读技巧</h3>
              <div class="course-info">
                <span class="course-level">入门</span>
                <span class="course-duration">10课时</span>
              </div>
              <p class="course-desc">掌握八字命盘的基本解读方法，学习如何分析日主强弱和喜用神</p>
              <div class="course-footer">
                <span class="course-price">免费</span>
                <button class="course-btn" disabled>即将开放</button>
              </div>
            </div>
          </div>
          
          <div class="course-card">
            <div class="course-image"></div>
            <div class="course-content">
              <h3 class="course-title">五行与健康</h3>
              <div class="course-info">
                <span class="course-level">入门</span>
                <span class="course-duration">8课时</span>
              </div>
              <p class="course-desc">探索五行与人体健康的关系，了解如何通过调整五行平衡改善健康</p>
              <div class="course-footer">
                <span class="course-price">免费</span>
                <button class="course-btn" disabled>即将开放</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="coming-soon">
          <p class="coming-soon-text">更多精彩课程正在制作中，敬请期待...</p>
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
    color: #b03a2e;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  
  .course-categories {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  
  .category-tab {
    padding: 0.6rem 1.5rem;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 20px;
    font-size: 1.1rem;
    color: #314a43;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fff;
  }
  
  .category-tab.active {
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
    font-weight: 600;
    border-color: #c77f6a;
  }
  
  .category-tab:hover:not(.active) {
    background: rgba(233, 196, 106, 0.1);
    border-color: #e9c46a;
  }
  
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .course-card {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(233, 196, 106, 0.15);
    border-color: #e9c46a;
  }
  
  .course-image {
    height: 160px;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    opacity: 0.8;
  }
  
  .course-content {
    padding: 1.5rem;
  }
  
  .course-title {
    font-size: 1.3rem;
    color: #314a43;
    margin-bottom: 0.8rem;
    font-weight: bold;
  }
  
  .course-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .course-level, .course-duration {
    font-size: 0.9rem;
    color: #666;
    background: rgba(233, 196, 106, 0.1);
    padding: 0.2rem 0.8rem;
    border-radius: 4px;
  }
  
  .course-desc {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
  
  .course-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .course-price {
    font-size: 1.1rem;
    color: #e9c46a;
    font-weight: 600;
  }
  
  .course-btn {
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    color: #999;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: not-allowed;
    font-family: inherit;
  }
  
  .coming-soon {
    text-align: center;
    margin-top: 2rem;
  }
  
  .coming-soon-text {
    color: #314a43;
    font-size: 1.1rem;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .page-panel {
      padding: 2rem 1.5rem;
    }
    
    .page-title {
      font-size: 1.8rem;
    }
    
    .course-grid {
      grid-template-columns: 1fr;
    }
    
    .category-tab {
      padding: 0.5rem 1.2rem;
      font-size: 1rem;
    }
  }
  </style>
  