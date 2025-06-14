<template>
    <div class="bazi-result-container">
      <div class="result-layout">
        <!-- 左侧：八字排盘结果 -->
        <div class="bazi-chart-section">
          <!-- 左侧导航栏 -->
          <div class="sidebar">
            <div 
              class="sidebar-item" 
              :class="{ active: activeTab === 'basic' }"
              @click="activeTab = 'basic'"
            >
              基本信息
            </div>
            <div 
              class="sidebar-item" 
              :class="{ active: activeTab === 'personality' }"
              @click="activeTab = 'personality'"
            >
              个性报告
            </div>
            <div 
              class="sidebar-item" 
              :class="{ active: activeTab === 'deep' }"
              @click="activeTab = 'deep'"
            >
              深度报告
            </div>
          </div>
  
          <!-- 内容区域 -->
          <div class="content-area">
            <BasicInfo v-if="activeTab === 'basic'" :baziData="baziData" />
            <PersonalityReport v-if="activeTab === 'personality'" :baziData="baziData" />
            <DeepReport v-if="activeTab === 'deep'" :baziData="baziData" />
  
            <!-- 操作按钮 -->
            <div class="action-buttons">
              <button class="action-btn secondary" @click="goBack">
                <span class="btn-icon">↶</span>
                <span>重新分析</span>
              </button>
              <button class="action-btn primary" @click="saveResult">
                <span class="btn-icon">💾</span>
                <span>保存结果</span>
              </button>
              <button class="action-btn primary" @click="shareResult">
                <span class="btn-icon">📤</span>
                <span>分享结果</span>
              </button>
            </div>
          </div>
        </div>
  
        <!-- 右侧：AI对话区域 -->
        <AIChat :chatMessages="chatMessages" :isTyping="isTyping" :quickQuestions="quickQuestions" :currentMessage="currentMessage" @sendMessage="sendMessage" @sendQuickQuestion="sendQuickQuestion" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, watch, onUnmounted, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import BasicInfo from './BaziResult/BasicInfo.vue'
  import PersonalityReport from './BaziResult/PersonalityReport.vue'
  import DeepReport from './BaziResult/DeepReport.vue'
  import AIChat from './BaziResult/AIChat.vue'
  import { useBaziStore } from '../stores/bazi'
  import { Solar, Lunar, EightChar } from 'lunar-javascript'
  
  const router = useRouter()
  const route = useRoute()
  const baziStore = useBaziStore()
  
  const chatMessages = ref([])
  const currentMessage = ref('')
  const isTyping = ref(false)
  const chatMessagesRef = ref(null)
  const activeTab = ref('basic')
  
  // 五行中文到英文的映射
  const elementMap = {
    '金': 'metal',
    '木': 'wood',
    '水': 'water',
    '火': 'fire',
    '土': 'earth',
  };
  const tianElementMap = {
    '甲':'wood',
    '乙':'wood',
    '丙':'fire',
    '丁':'fire',
    '戊':'earth',
    '己':'earth',
    '庚':'metal',
    '辛':'metal',
    '壬':'water',
    '癸':'water'
  }
  // 根据 baziStore 中的数据计算 baziData
  const baziData = computed(() => {
    const input = baziStore.getBaziInputData;
    let solarDisplay = '';
    let lunarDisplay = '';
    let lunarInfo,eightChar,yun;
    const genderText = input.gender === '男' ? '乾造 (男)' : '坤造 (女)';
    const genderClass = input.gender === '男' ? 'male' : 'female';
    if (input.inputType === 'solar' && input.solarDate.year !== null) {
      // 从公历日期创建 Solar 对象
      const solar = Solar.fromYmdHms(
        input.solarDate.year,
        input.solarDate.month,
        input.solarDate.day,
        parseInt(input.solarDate.hour),
        parseInt(input.solarDate.minute),
        0 // 秒，默认为 0
      );
      lunarInfo = solar.getLunar();
      solarDisplay = solar.toYmdHms();
      lunarDisplay = lunarInfo.toString() + " " + lunarInfo.getTimeZhi() + "时";
      eightChar = EightChar.fromLunar(lunarInfo, input.gender === '男' ? 1 : 0);
      yun = eightChar.getYun(input.gender === '男' ? 1 : 0);
    } else if (input.inputType === 'lunar' && input.lunarDate.year !== null) {
      // 从农历日期创建 Lunar 对象
      let lunarInfo = Lunar.fromYmd(
        input.lunarDate.year,
        input.lunarDate.month,
        input.lunarDate.day,
        false // 假设不是闰月，如果需要支持闰月，需要 baziStore 提供 isLeapMonth 字段
      );
      let tempSolar = lunarInfo.getSolar(); // 获取对应的阳历日期 (不含时分)
      // 如果有农历的时分信息，则创建带有时间信息的 Solar 对象，再获取对应的 Lunar 对象
      if (input.lunarDate.hour !== null && input.lunarDate.minute !== null) {
        tempSolar = Solar.fromYmdHms(
          tempSolar.getYear(),
          tempSolar.getMonth(),
          tempSolar.getDay(),
          parseInt(input.lunarDate.hour),
          parseInt(input.lunarDate.minute),
          0
        );
        lunarInfo = tempSolar.getLunar(); // 获取带有时间信息的农历对象
      }
      solarDisplay = tempSolar.toYmdHms();
      lunarDisplay = lunarInfo.toString() + " " + lunarInfo.getTimeZhi() + "时";
      eightChar = EightChar.fromLunar(lunarInfo, input.gender === '男' ? 1 : 0);
      yun = eightChar.getYun(input.gender === '男' ? 1 : 0);
    } else if (input.inputType === 'bazi') {
      const { yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi } = input.baziData;
      solarDisplay = `四柱八字: ${yearGanZhi} ${monthGanZhi} ${dayGanZhi} ${hourGanZhi}`;
      lunarDisplay = `四柱八字: ${yearGanZhi} ${monthGanZhi} ${dayGanZhi} ${hourGanZhi}`;
      eightChar = EightChar.fromGanZhi(yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi);
    } else if (input.inputType === 'ai') {
      solarDisplay = `AI识别文本: ${input.aiText || '未输入'}`;
      lunarDisplay = `AI识别文本: ${input.aiText || '未输入'}`;
      // AI模式下没有直接的八字数据，可以提供一个默认或空的EightChar对象
      // 或者根据AI文本尝试解析，这里暂时提供一个占位
      eightChar = EightChar.fromLunar(Lunar.fromDate(new Date())); // 默认值
    }
  
    // 占位数据：由于排盘逻辑暂未实现，这里提供空或默认结构
    // BasicInfo 组件需要这些字段，所以即使为空也需要提供结构
    return {
      lunarDate: lunarDisplay,
      solarDate: solarDisplay,
      gender: genderText,
      genderClass: genderClass,
      userName: input.userName || '无名氏',
      address: input.address,
      pillars: [
        { 
          tiangan: { 
            char: eightChar.getYearGan(), 
            element: elementMap[eightChar.getYearWuXing()[0]],
            relation: eightChar.getYearShiShenGan()
          }, 
          dizhi: { 
            char: eightChar.getYearZhi(), 
            element: elementMap[eightChar.getYearWuXing()[1]],
          }, 
          canggan: eightChar.getYearHideGan().map((gan,index) => ({
            char: gan,
            element: tianElementMap[gan],
            relation: eightChar.getYearShiShenZhi()[index]
          })),
          nayin: eightChar.getYearNaYin(), 
          xinyun: eightChar.getYearDiShi(), 
          zizuo: eightChar.getYearZuo(), 
          kongwang: eightChar.getYearXunKong(), 
          shensha: eightChar.getYearShenSha()
        },
        { 
          tiangan: { 
            char: eightChar.getMonthGan(), 
            element: elementMap[eightChar.getMonthWuXing()[0]],
            relation: eightChar.getMonthShiShenGan()
          }, 
          dizhi: { 
            char: eightChar.getMonthZhi(), 
            element: elementMap[eightChar.getMonthWuXing()[1]],
          }, 
          canggan: eightChar.getMonthHideGan().map((gan,index) => ({
            char: gan,
            element: tianElementMap[gan],
            relation: eightChar.getMonthShiShenZhi()[index]
          })),
          nayin: eightChar.getMonthNaYin(), 
          xinyun: eightChar.getMonthDiShi(), 
          zizuo: eightChar.getMonthZuo(), 
          kongwang: eightChar.getMonthXunKong(), 
          shensha: eightChar.getMonthShenSha()
        },
        { 
          tiangan: { 
            char: eightChar.getDayGan(), 
            element: elementMap[eightChar.getDayWuXing()[0]],
            relation: eightChar.getDayShiShenGan()
          }, 
          dizhi: { 
            char: eightChar.getDayZhi(), 
            element: elementMap[eightChar.getDayWuXing()[1]],
          }, 
          canggan: eightChar.getDayHideGan().map((gan,index) => ({
            char: gan,
            element: tianElementMap[gan],
            relation: eightChar.getDayShiShenZhi()[index]
          })),
          nayin: eightChar.getDayNaYin(), 
          xinyun: eightChar.getDayDiShi(), 
          zizuo: eightChar.getDayZuo(), 
          kongwang: eightChar.getDayXunKong(), 
          shensha: eightChar.getDayShenSha()
        },
        { 
          tiangan: { 
            char: eightChar.getTimeGan(), 
            element: elementMap[eightChar.getTimeWuXing()[0]],
            relation: eightChar.getTimeShiShenGan()
          }, 
          dizhi: { 
            char: eightChar.getTimeZhi(), 
            element: elementMap[eightChar.getTimeWuXing()[1]],
          }, 
          canggan: eightChar.getTimeHideGan().map((gan,index) => ({
            char: gan,
            element: tianElementMap[gan],
            relation: eightChar.getTimeShiShenZhi()[index]
          })),
          nayin: eightChar.getTimeNaYin(), 
          xinyun: eightChar.getTimeDiShi(), 
          zizuo: eightChar.getTimeZuo(), 
          kongwang: eightChar.getTimeXunKong(), 
          shensha: eightChar.getTimeShenSha()
        }
      ],
      wuxingStats: { 金: { count: 0, percentage: 0 }, 木: { count: 0, percentage: 0 }, 火: { count: 0, percentage: 0 }, 土: { count: 0, percentage: 0 }, 水: { count: 0, percentage: 0 } },
      rizhu: {
        char: eightChar.getDayGan(), // 日主天干
        element: elementMap[eightChar.getDayWuXing()[0]], // 日主五行
      },
      strength: { type: '', desc: '' },
      favoriteGod: [],
      yinYangAnalysis: { yin: 0, yang: 0, yinPercentage: 0, yangPercentage: 0, description: '' },
      wuxingAnalysis: '',
      shishenAnalysis: { description: '' },
      shengxiao: {
        name: lunarInfo ? lunarInfo.getYearShengXiao() : '',
        icon: '', // TODO: 可以根据生肖添加图标
        traits: []
      },
      geju: { name: '', quality: '', description: '' },
      qiyun:'出生' + yun.getStartYear() + '年' + yun.getStartMonth() + '个月' + yun.getStartDay() + '天后起运',
      dayun: yun.getDaYun(),
      deepAnalysis: { career: '', wealth: '', marriage: '', health: '', education: '', relationships: '' }
    };
  });
  
  const quickQuestions = ref([
    '我的性格特点如何？',
    '事业发展方向？',
    '感情运势如何？',
    '财运分析',
    '健康注意事项'  ])
  
  const goBack = () => {
    if (router.currentRoute.value.path !== '/bazi') {
      router.push('/bazi')
      baziStore.clearBaziInput();
    } else {
      baziStore.clearBaziInput();
      router.go(0);
    }
  }
  
  const saveResult = () => {
  }
  
  const shareResult = () => {
  }
  
  const sendQuickQuestion = (question) => {
    currentMessage.value = question
    sendMessage()
  }
  
  const sendMessage = async () => {
    if (!currentMessage.value.trim() || isTyping.value) return
    
    const userMessage = {
      type: 'user',
      text: currentMessage.value,
      time: new Date().toLocaleTimeString()
    }
    
    chatMessages.value.push(userMessage)
    const question = currentMessage.value
    currentMessage.value = ''
    
    // 滚动到底部
    await nextTick()
    scrollToBottom()
    
    // 显示AI正在输入
    isTyping.value = true
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = getAIResponse(question)
      chatMessages.value.push({
        type: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString()
      })
      isTyping.value = false
      nextTick(() => scrollToBottom())
    }, 1500)
  }
  
  const getAIResponse = (question) => {
    const responses = {
      '我的性格特点如何？': '根据您的八字分析，您是己土日主，性格稳重踏实，做事认真负责。您具有很强的责任感和使命感，对待工作和生活都非常认真。同时，您的八字偏阴，性格细腻，心思缜密，但行动上可能有时显得犹豫不决。您喜欢细致的安排，但在关键时刻可能缺乏魄力。建议您在决策时多一些果断，减少犹豫。',
      '事业发展方向？': '您的八字显示官杀过旺，适合从事需要严谨、规范的工作，如法律、行政、管理等领域。您具有较强的竞争意识和进取心，能够在职场中不断提升自己。建议您选择能发挥您责任感和组织能力的职业，如项目管理、行政管理、教育培训等。30-39岁是您事业发展的黄金期，可以考虑在这个时期进行重要的职业规划或转型。',
      '感情运势如何？': '您的八字中官杀过旺，在感情中可能会遇到较为强势的伴侣，或者自己在感情中处于被动地位。同时，比劫过旺也可能导致您在感情中过于强势，容易与伴侣产生冲突。建议您在感情中学会适当妥协和沟通，尊重伴侣的意见和感受。在选择伴侣时，可以考虑性格温和、包容度高的人，这样能够更好地平衡您的性格特点。',
      '财运分析': '您的八字中缺少财星，对金钱和物质的敏感度较低，不太擅长理财和财富积累。您更适合通过稳定的工作和长期投资来积累财富，而不是投机取巧。建议您通过学习财务知识，提高自己的理财能力。在40-49岁这个阶段，您的财运会有所好转，可以考虑在这个时期进行一些稳健的投资。',
      '健康注意事项': '您的八字中五行缺水，可能会出现肾脏、泌尿系统方面的问题。同时，土旺容易导致脾胃功能失调，建议注意饮食规律，避免过度劳累。在情绪方面，您可能容易出现焦虑、紧张等情绪问题，建议通过运动、冥想等方式来调节情绪。特别是在20-29岁这个阶段，需要特别注意保养身体。',
      '今年运势如何？': '2025年是乙巳年，对您来说运势平稳。这一年您可能会面临一些工作上的挑战，但只要保持冷静和耐心，都能够顺利解决。在人际关系方面，您需要注意与同事和朋友的沟通，避免因为误解而产生冲突。财运方面相对稳定，但不宜进行大额投资。健康方面需要注意休息，避免过度劳累导致身体不适。'
    }
    
    return responses[question] || '感谢您的提问！根据您的八字特点，我建议您保持积极乐观的心态，顺应自然规律，相信一切都会朝着好的方向发展。如果您有其他具体问题，欢迎继续咨询。'
  }
  
  const scrollToBottom = () => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
    }
  }
  
  onMounted(() => {
    chatMessages.value.push({
      type: 'ai',
      text: '您好！我是唤雨师AI助手。我已经为您分析了八字命盘，您可以点击下方的快捷问题，或者直接输入您想了解的内容。我会根据您的八字特点为您提供专业的解答。',
      time: new Date().toLocaleTimeString()
    })
  })

  onUnmounted(() => {
  })

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
    }
  )
  </script>
  
  <style scoped>
  .bazi-result-container {
    background: #f5f5f0;
    font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
    padding: 20px;
  }
  
  .result-layout {
    display: grid;
    grid-template-columns: 45fr 55fr; /* 4.5:5.5的比例 */
    gap: 20px;
    max-width: 1600px;
    margin: 0 auto;
    height: calc(91vh - 40px); /* 调整高度以适应视口 */
    overflow: hidden; /* 防止整体布局滚动 */
  }
  
  /* 左侧八字排盘区域 */
  .bazi-chart-section {
    display: flex;
    flex-direction: column; /* 更改为列布局以管理垂直空间 */
    background: #fff;
    border: 1px solid #e9c46a;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    height: 100%; /* 确保填充父容器高度 */
  }
  
  /* 左侧导航栏 */
  .sidebar {
    width: 100%; /* 导航栏宽度改为100% */
    height: auto; /* 高度自适应内容 */
    background: #f9f5e8;
    border-bottom: 1px solid #e9c46a; /* 边框改为底部 */
    border-right: none; /* 移除右边框 */
    padding: 10px 0; /* 调整内边距 */
    display: flex;
    flex-direction: row; /* 导航项横向排列 */
    justify-content: center; /* 导航项居中 */
    align-items: center;
    flex-wrap: wrap; /* 允许换行 */
  }
  
  .sidebar-item {
    width: auto; /* 导航项宽度自适应内容 */
    padding: 10px 15px; /* 调整内边距 */
    text-align: center;
    cursor: pointer;
    font-size: 0.95rem; /* 调整字体大小 */
    color: #314a43;
    transition: all 0.3s ease;
    border-left: none; /* 移除左边框 */
    border-bottom: 2px solid transparent; /* 添加底部边框用于激活状态 */
  }
  
  .sidebar-item:hover {
    background: rgba(233, 196, 106, 0.1);
  }
  
  .sidebar-item.active {
    background: none; /* 激活背景 */
    color: #c77f6a;
    font-weight: bold;
    border-bottom: 2px solid #c77f6a; /* 激活底部边框 */
    border-left: none; /* 确保没有左边框 */
  }
  
  /* 内容区域 */
  .content-area {
    flex: 1; /* 填充剩余垂直空间 */
    padding: 20px;
    overflow-y: auto; /* 保持滚动 */
  }
  
  /* 操作按钮 */
  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .action-btn.primary {
    background: #c77f6a;
    color: #fff;
  }
  
  .action-btn.primary:hover {
    background: #b3705f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(199, 127, 106, 0.3);
  }
  
  .action-btn.secondary {
    background: rgba(233, 196, 106, 0.2);
    color: #314a43;
    border: 1px solid #e9c46a;
  }
  
  .action-btn.secondary:hover {
    background: rgba(233, 196, 106, 0.3);
    transform: translateY(-2px);
  }
  
  .btn-icon {
    font-size: 1.1rem;
  }
  </style>
  