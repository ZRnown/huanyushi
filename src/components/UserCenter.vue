<template>
    <div class="user-center-container">
      <div class="user-center-panel">
        <div class="user-header">
          <div class="avatar-section">
            <div class="user-avatar">
              <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" />
              <div v-else class="default-avatar">👤</div>
            </div>
            <button class="change-avatar-btn">更换头像</button>
          </div>
          <div class="user-info">
            <h2 class="username">{{ userInfo.username }}</h2>
            <div class="user-level">
              <span class="level-badge">{{ userInfo.level }}</span>
              <span class="level-text">会员</span>
            </div>
            <div class="user-stats">
              <div class="stat-item">
                <span class="stat-number">{{ userInfo.analysisCount }}</span>
                <span class="stat-label">分析次数</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userInfo.daysJoined }}</span>
                <span class="stat-label">加入天数</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userInfo.accuracy }}%</span>
                <span class="stat-label">准确率</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="user-content">
          <div class="content-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.value"
              :class="['tab-btn', { active: activeTab === tab.value }]"
              @click="activeTab = tab.value"
            >
              <span class="tab-icon">{{ tab.icon }}</span>
              <span class="tab-text">{{ tab.label }}</span>
            </button>
          </div>
          
          <div class="tab-content">
            <!-- 个人信息 -->
            <div v-if="activeTab === 'profile'" class="tab-panel">
              <div class="info-cards">
                <div class="info-card">
                  <h3 class="card-title">基本信息</h3>
                  <div class="info-item">
                    <span class="info-label">用户名：</span>
                    <span class="info-value">{{ userInfo.username }}</span>
                    <button class="edit-btn">编辑</button>
                  </div>
                  <div class="info-item">
                    <span class="info-label">邮箱：</span>
                    <span class="info-value">{{ userInfo.email }}</span>
                    <button class="edit-btn">编辑</button>
                  </div>
                  <div class="info-item">
                    <span class="info-label">手机：</span>
                    <span class="info-value">{{ userInfo.phone }}</span>
                    <button class="edit-btn">编辑</button>
                  </div>
                  <div class="info-item">
                    <span class="info-label">注册时间：</span>
                    <span class="info-value">{{ userInfo.registerDate }}</span>
                  </div>
                </div>
                
                <div class="info-card">
                  <h3 class="card-title">偏好设置</h3>
                  <div class="preference-item">
                    <span class="preference-label">接收邮件通知</span>
                    <label class="switch">
                      <input type="checkbox" v-model="preferences.emailNotification" />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="preference-item">
                    <span class="preference-label">接收短信通知</span>
                    <label class="switch">
                      <input type="checkbox" v-model="preferences.smsNotification" />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="preference-item">
                    <span class="preference-label">公开分析记录</span>
                    <label class="switch">
                      <input type="checkbox" v-model="preferences.publicRecords" />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 分析记录 -->
            <div v-if="activeTab === 'records'" class="tab-panel">
              <div class="records-header">
                <h3 class="records-title">我的分析记录</h3>
                <div class="records-filter">
                  <select v-model="recordFilter" class="filter-select">
                    <option value="all">全部记录</option>
                    <option value="bazi">八字分析</option>
                    <option value="hepan">合盘分析</option>
                  </select>
                </div>
              </div>
              <div class="records-list">
                <div v-if="filteredRecords.length === 0" class="empty-records">
                  <div class="empty-icon">📝</div>
                  <p class="empty-text">暂无分析记录</p>
                  <router-link to="/bazi" class="start-analysis-btn">开始分析</router-link>
                </div>
                <div v-else class="record-item" v-for="record in filteredRecords" :key="record.id">
                  <div class="record-icon">{{ record.type === 'bazi' ? '☰' : '☯' }}</div>
                  <div class="record-info">
                    <h4 class="record-title">{{ record.title }}</h4>
                    <p class="record-date">{{ record.date }}</p>
                  </div>
                  <div class="record-actions">
                    <button class="view-btn">查看</button>
                    <button class="delete-btn">删除</button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 会员信息 -->
            <div v-if="activeTab === 'membership'" class="tab-panel">
              <div class="membership-info">
                <div class="current-plan">
                  <h3 class="plan-title">当前会员</h3>
                  <div class="plan-card">
                    <div class="plan-name">{{ membershipInfo.planName }}</div>
                    <div class="plan-status">{{ membershipInfo.status }}</div>
                    <div class="plan-expire">到期时间：{{ membershipInfo.expireDate }}</div>
                    <div class="plan-benefits">
                      <div class="benefit-item" v-for="benefit in membershipInfo.benefits" :key="benefit">
                        <span class="benefit-icon">✓</span>
                        <span class="benefit-text">{{ benefit }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="upgrade-section">
                  <h3 class="upgrade-title">升级会员</h3>
                  <p class="upgrade-desc">升级会员享受更多专业服务</p>
                  <router-link to="/vip" class="upgrade-btn">
                    <span class="btn-text">查看会员套餐</span>
                    <span class="btn-icon">👑</span>
                  </router-link>
                </div>
              </div>
            </div>
            
            <!-- 安全设置 -->
            <div v-if="activeTab === 'security'" class="tab-panel">
              <div class="security-cards">
                <div class="security-card">
                  <h3 class="card-title">密码安全</h3>
                  <div class="security-item">
                    <div class="security-info">
                      <span class="security-label">登录密码</span>
                      <span class="security-desc">定期更换密码可以提高账户安全性</span>
                    </div>
                    <button class="security-btn">修改密码</button>
                  </div>
                </div>
                
                <div class="security-card">
                  <h3 class="card-title">账户绑定</h3>
                  <div class="security-item">
                    <div class="security-info">
                      <span class="security-label">微信绑定</span>
                      <span class="security-desc">{{ userInfo.wechatBound ? '已绑定' : '未绑定' }}</span>
                    </div>
                    <button class="security-btn">
                      {{ userInfo.wechatBound ? '解绑' : '绑定' }}
                    </button>
                  </div>
                  <div class="security-item">
                    <div class="security-info">
                      <span class="security-label">手机绑定</span>
                      <span class="security-desc">{{ userInfo.phoneBound ? '已绑定' : '未绑定' }}</span>
                    </div>
                    <button class="security-btn">
                      {{ userInfo.phoneBound ? '更换' : '绑定' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const activeTab = ref('profile')
  const recordFilter = ref('all')
  
  const tabs = [
    { label: '个人信息', value: 'profile', icon: '👤' },
    { label: '分析记录', value: 'records', icon: '📋' },
    { label: '会员信息', value: 'membership', icon: '👑' },
    { label: '安全设置', value: 'security', icon: '🔒' }
  ]
  
  const userInfo = ref({
    username: '命理探索者',
    email: 'user@example.com',
    phone: '138****8888',
    avatar: '',
    level: '基础',
    analysisCount: 0,
    daysJoined: 1,
    accuracy: 0,
    registerDate: '2024-01-01',
    wechatBound: false,
    phoneBound: true
  })
  
  const preferences = ref({
    emailNotification: true,
    smsNotification: false,
    publicRecords: false
  })
  
  const membershipInfo = ref({
    planName: '基础版',
    status: '有效',
    expireDate: '永久有效',
    benefits: ['基础八字分析', '每日运势查看', '简单合盘功能']
  })
  
  const analysisRecords = ref([
    // 示例数据，实际应该从API获取
  ])
  
  const filteredRecords = computed(() => {
    if (recordFilter.value === 'all') {
      return analysisRecords.value
    }
    return analysisRecords.value.filter(record => record.type === recordFilter.value)
  })
  </script>
  
  <style scoped>
  .user-center-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  }
  
  .user-center-panel {
    background: #fff;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 20px;
    padding: 2.5rem;
    width: 100%;
    max-width: 1000px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  .user-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(233, 196, 106, 0.2);
  }
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #e9c46a;
    box-shadow: 0 4px 15px rgba(233, 196, 106, 0.3);
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .default-avatar {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: #fff;
  }
  
  .change-avatar-btn {
    padding: 0.5rem 1rem;
    background: rgba(233, 196, 106, 0.1);
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 8px;
    color: #314a43;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .change-avatar-btn:hover {
    background: rgba(233, 196, 106, 0.2);
    border-color: #e9c46a;
  }
  
  .user-info {
    flex: 1;
  }
  
  .username {
    font-size: 2rem;
    color: #314a43;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .user-level {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .level-badge {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #fff;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .level-text {
    color: #666;
    font-size: 0.9rem;
  }
  
  .user-stats {
    display: flex;
    gap: 2rem;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #e9c46a;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  .content-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(233, 196, 106, 0.2);
  }
  
  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: #666;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .tab-btn:hover {
    color: #314a43;
    background: rgba(233, 196, 106, 0.05);
  }
  
  .tab-btn.active {
    color: #dc3545;
    border-bottom-color: #dc3545;
    font-weight: 600;
  }
  
  .tab-icon {
    font-size: 1.1rem;
  }
  
  .tab-content {
    min-height: 400px;
  }
  
  .tab-panel {
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
  
  .info-card, .security-card {
    background: rgba(233, 196, 106, 0.05);
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.3rem;
    color: #314a43;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(233, 196, 106, 0.1);
  }
  
  .info-item:last-child {
    border-bottom: none;
  }
  
  .info-label {
    color: #666;
    font-size: 1rem;
  }
  
  .info-value {
    color: #314a43;
    font-weight: 500;
  }
  
  .edit-btn {
    padding: 0.3rem 0.8rem;
    background: none;
    border: 1px solid #e9c46a;
    border-radius: 6px;
    color: #c77f6a;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .edit-btn:hover {
    background: rgba(233, 196, 106, 0.1);
  }
  
  .preference-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(233, 196, 106, 0.1);
  }
  
  .preference-item:last-child {
    border-bottom: none;
  }
  
  .preference-label {
    color: #314a43;
    font-size: 1rem;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #dc3545;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .records-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .records-title {
    font-size: 1.3rem;
    color: #314a43;
    font-weight: bold;
  }
  
  .filter-select {
    padding: 0.5rem 1rem;
    border: 1px solid rgba(233, 196, 106, 0.3);
    border-radius: 8px;
    background: #fff;
    color: #314a43;
    font-family: inherit;
    outline: none;
  }
  
  .empty-records {
    text-align: center;
    padding: 3rem 2rem;
  }
  
  .empty-icon {
    font-size: 3rem;
    color: #e9c46a;
    margin-bottom: 1rem;
  }
  
  .empty-text {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .start-analysis-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .start-analysis-btn:hover {
    background: linear-gradient(135deg, #c77f6a 0%, #d9998a 100%);
    transform: translateY(-2px);
  }
  
  .record-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }
  
  .record-item:hover {
    border-color: #e9c46a;
    background: rgba(233, 196, 106, 0.05);
  }
  
  .record-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #e9c46a 0%, #c77f6a 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #fff;
  }
  
  .record-info {
    flex: 1;
  }
  
  .record-title {
    font-size: 1.1rem;
    color: #314a43;
    margin-bottom: 0.3rem;
    font-weight: 600;
  }
  
  .record-date {
    color: #666;
    font-size: 0.9rem;
  }
  
  .record-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .view-btn, .delete-btn {
    padding: 0.4rem 0.8rem;
    border: 1px solid;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .view-btn {
    background: none;
    border-color: #e9c46a;
    color: #c77f6a;
  }
  
  .view-btn:hover {
    background: rgba(233, 196, 106, 0.1);
  }
  
  .delete-btn {
    background: none;
    border-color: #dc3545;
    color: #dc3545;
  }
  
  .delete-btn:hover {
    background: rgba(220, 53, 69, 0.1);
  }
  
  .membership-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  
  .current-plan {
    background: rgba(233, 196, 106, 0.05);
    border: 1px solid rgba(233, 196, 106, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  .plan-title {
    font-size: 1.3rem;
    color: #314a43;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .plan-card {
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .plan-name {
    font-size: 1.2rem;
    color: #314a43;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .plan-status {
    color: #28a745;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .plan-expire {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .plan-benefits {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .benefit-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .benefit-icon {
    color: #28a745;
    font-weight: bold;
  }
  
  .benefit-text {
    color: #314a43;
    font-size: 0.9rem;
  }
  
  .upgrade-section {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
  }
  
  .upgrade-title {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .upgrade-desc {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
  
  .upgrade-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: #fff;
    color: #dc3545;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .upgrade-btn:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
  
  .security-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .security-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(233, 196, 106, 0.1);
  }
  
  .security-item:last-child {
    border-bottom: none;
  }
  
  .security-info {
    flex: 1;
  }
  
  .security-label {
    display: block;
    color: #314a43;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }
  
  .security-desc {
    color: #666;
    font-size: 0.9rem;
  }
  
  .security-btn {
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid #dc3545;
    border-radius: 6px;
    color: #dc3545;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .security-btn:hover {
    background: rgba(220, 53, 69, 0.1);
  }
  
  @media (max-width: 768px) {
    .user-center-panel {
      padding: 2rem 1.5rem;
    }
    
    .user-header {
      flex-direction: column;
      text-align: center;
    }
    
    .user-stats {
      justify-content: center;
    }
    
    .content-tabs {
      flex-wrap: wrap;
    }
    
    .info-cards {
      grid-template-columns: 1fr;
    }
    
    .membership-info {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .user-center-panel {
      padding: 1.5rem 1rem;
    }
    
    .username {
      font-size: 1.6rem;
    }
    
    .user-stats {
      gap: 1rem;
    }
    
    .tab-btn {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
  }
  </style>
  