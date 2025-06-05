<template>
  <div class="ai-chat-container">
    <!-- 消息列表 -->
    <div class="chat-messages" ref="chatMessagesRef">
      <div v-for="(msg, idx) in chatMessages" :key="idx" :class="['chat-message', msg.type]">
        <div class="message-bubble">
          <span v-if="msg.type === 'ai'" class="ai-label">唤雨师AI：</span>
          <span v-if="msg.type === 'user'" class="user-label">你：</span>
          <span class="message-text">{{ msg.text }}</span>
        </div>
        <div class="message-time">{{ msg.time }}</div>
      </div>
      <div v-if="isTyping" class="chat-message ai">
        <div class="message-bubble">
          <span class="ai-label">唤雨师AI：</span>
          <span class="message-text">正在输入…</span>
        </div>
      </div>
    </div>
    <!-- 快捷提问 -->
    <div class="quick-questions">
      <button v-for="(q, i) in quickQuestions" :key="i" class="quick-question-btn" @click="$emit('sendQuickQuestion', q)">{{ q }}</button>
    </div>
    <!-- 输入区 -->
    <form class="input-area" @submit.prevent="$emit('sendMessage')">
      <input
        v-model="inputProxy"
        class="gufeng-input chat-input"
        type="text"
        placeholder="请输入你的问题..."
        :disabled="isTyping"
        @keyup.enter="$emit('sendMessage')"
      />
      <button class="send-btn" type="submit" :disabled="isTyping || !inputProxy.trim()">
        <div class="btn-background"></div>
        <div class="btn-content">
          <span class="btn-text">发送</span>
          <div class="btn-ornament">
            <span class="ornament-symbol">✉️</span>
          </div>
        </div>
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  chatMessages: Array,
  isTyping: Boolean,
  quickQuestions: Array,
  currentMessage: String
})
const emit = defineEmits(['sendMessage', 'sendQuickQuestion'])
// 代理输入框v-model到父组件currentMessage
const inputProxy = ref(props.currentMessage)
watch(() => props.currentMessage, v => { inputProxy.value = v })
watch(inputProxy, v => emit('update:currentMessage', v))
</script>
<style scoped>
.ai-chat-container {
  height: 100%; /* 使其填充父容器高度 */
  display: flex;
  flex-direction: column; /* 设置为列布局 */
  background: #fffaf0; /* 浅米黄背景 */
  border: 1px solid #e9c46a; /* 边框颜色 */
  border-radius: 20px; /* 圆角 */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); /* 阴影 */
  padding: 24px;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  overflow: hidden; /* 防止AI窗口自身滚动 */
}

.chat-messages {
  flex: 1; /* 填充剩余垂直空间 */
  overflow-y: auto; /* 消息列表垂直滚动 */
  margin-bottom: 1rem;
  padding-right: 8px;
  /* 模拟古籍边框或纹理 */
  background-image: linear-gradient(to right, rgba(233, 196, 106, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(233, 196, 106, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* 滚动条样式（根据项目需要调整，或使用 tailwind 插件）*/
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f9f5e8; /* 滚道颜色 */
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #e9c46a; /* 滚动条颜色 */
  border-radius: 4px;
}

.chat-message {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-bubble {
  display: inline-block; /* 气泡宽度自适应内容 */
  max-width: 85%; /* 调整最大宽度 */
  border-radius: 12px;
  padding: 0.8rem 1.2rem; /* 调整内边距 */
  font-size: 1rem;
  line-height: 1.6;
  word-break: break-word; /* 长单词换行 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.chat-message.user .message-bubble {
  background: #c77f6a; /* 用户消息气泡背景 */
  color: #fff; /* 用户消息文字颜色 */
  align-self: flex-end; /* 靠右显示 */
  border-bottom-right-radius: 4px; /* 用户气泡角处理 */
}

.chat-message.ai .message-bubble {
  background: #f9f5e8; /* AI消息气泡背景 */
  color: #314a43; /* AI消息文字颜色 */
  align-self: flex-start; /* 靠左显示 */
  border: 1px solid #e9c46a; /* AI消息边框 */
  border-bottom-left-radius: 4px; /* AI气泡角处理 */
}

.message-time {
  font-size: 0.75rem; /* 时间字体大小 */
  color: #999; /* 时间颜色 */
  margin-top: 4px; /* 调整时间与气泡间距 */
}

.chat-message.user .message-time {
    align-self: flex-end;
}

.chat-message.ai .message-time {
    align-self: flex-start;
}

.ai-label {
  color: #c77f6a; /* AI标签颜色 */
  font-weight: bold;
  margin-right: 0.5rem; /* 调整间距 */
}

.user-label {
  color: #314a43; /* 用户标签颜色 */
  font-weight: bold;
  margin-right: 0.5rem; /* 调整间距 */
}

.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem; /* 调整按钮间距 */
  margin-bottom: 0.3rem; /* 调整与输入框间距 */
  padding-top: 0.3rem; /* 调整与消息列表间距 */
  border-top: 1px solid #eee; /* 顶部细线 */
}

.quick-question-btn {
  background: #f9f5e8; /* 按钮背景 */
  color: #c77f6a; /* 按钮文字颜色 */
  border: 1px solid #e9c46a; /* 按钮边框 */
  border-radius: 20px; /* 按钮圆角更大 */
  padding: 0.5rem 1.2rem; /* 按钮内边距 */
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease; /* 动画 */
  font-family: inherit; /* 继承字体 */
}

.quick-question-btn:hover {
  background: #e9c46a; /* hover背景 */
  color: #fff; /* hover文字颜色 */
  box-shadow: 0 4px 12px rgba(233, 196, 106, 0.2); /* hover阴影 */
}

.input-area {
  display: flex;
  gap: 0.8rem; /* 调整输入框和按钮间距 */
  align-items: center;
}

.chat-input {
  flex: 1;
  min-width: 0; /* 允许flex item缩小 */
  /* 复制自BaziInput.vue的gufeng-input样式 */
  background-color: #fdf6ec; /* 浅米黄背景 */
  border: 1.5px solid #e9c46a; /* 边框 */
  border-radius: 1.2em; /* 圆角 */
  padding: 0.8em 1.2em; /* 内边距 */
  color: #7c4a02; /* 文字颜色 */
  font-size: 1rem; /* 字体大小 */
  font-family: inherit; /* 继承字体 */
  outline: none; /* 去除默认轮廓 */
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s; /* 过渡动画 */
}

.chat-input::placeholder {
    color: #b3b3b3; /* placeholder颜色 */
}

.chat-input:hover {
  border-color: #b03a2e;
}

.chat-input:focus {
  border-color: #b03a2e;
  box-shadow: 0 0 0 4px rgba(176, 58, 46, 0.2);
  transform: translateY(-2px); /* 焦点动画 */
}

/* 发送按钮样式 */
.send-btn {
  position: relative; /* 为了背景和装饰的定位 */
  background: none; /* 移除默认背景 */
  border: none; /* 移除默认边框 */
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease; /* 动画 */
  padding: 0; /* 移除默认padding */
  outline: none !important; /* 确保移除焦点轮廓 */
  border: none !important; /* 确保移除边框 */
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.send-btn .btn-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #c77f6a 0%, #d9998a 100%); /* 渐变背景 */
  border-radius: 30px; /* 胶囊形状 */
  box-shadow: 0 6px 20px rgba(199, 127, 106, 0.3); /* 阴影 */
  transition: all 0.3s ease;
}

.send-btn:hover:not(:disabled) .btn-background {
  background: linear-gradient(135deg, #d9998a 0%, #e6b5a2 100%); /* hover渐变微调 */
  box-shadow: 0 8px 25px rgba(199, 127, 106, 0.4); /* hover阴影 */
}

/* 移除焦点和激活状态的默认边框和阴影 */
.send-btn:focus,
.send-btn:focus-visible,
.send-btn:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* 确保在focus和focus-visible时背景层正确显示 */
.send-btn:focus:not(:disabled) .btn-background,
.send-btn:focus-visible:not(:disabled) .btn-background {
    background: linear-gradient(135deg, #d9998a 0%, #e6b5a2 100%); /* 保持与hover一致或微调 */
    box-shadow: 0 8px 25px rgba(199, 127, 106, 0.4) !important; /* 强化阴影 */
}

.send-btn:disabled .btn-background {
  background: #e5e5e5; /* 禁用背景 */
  box-shadow: none;
}

.send-btn .btn-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem; /* 文字和装饰间距 */
  padding: 0.8rem 2rem; /* 内容内边距 */
  z-index: 2; /* 内容在背景之上 */
}

.send-btn .btn-text {
  font-size: 1.2rem; /* 文字大小 */
  font-weight: bold;
  color: #fff; /* 文字颜色 */
  letter-spacing: 0.05em; /* 字间距 */
}

.send-btn:disabled .btn-text {
  color: #999; /* 禁用文字颜色 */
}

.send-btn .btn-ornament {
  width: 32px; /* 装饰大小 */
  height: 32px;
  background: #fff; /* 装饰背景 */
  border-radius: 6px; /* 装饰圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 装饰阴影 */
  transform: rotate(-5deg); /* 初始旋转 */
  transition: transform 0.3s ease;
}

.send-btn:hover:not(:disabled) .btn-ornament {
  transform: rotate(5deg); /* hover旋转 */
}

.send-btn:disabled .btn-ornament {
  background: #f0f0f0;
  box-shadow: none;
}

.send-btn .ornament-symbol {
  font-size: 1.2rem;
  color: #b03a2e; /* 装饰符号颜色 */
  font-weight: bold;
}

.send-btn:disabled .ornament-symbol {
  color: #ccc;
}

/* 媒体查询 */
@media (max-width: 768px) {
  .ai-chat-container {
    padding: 16px;
  }
  .message-bubble {
    max-width: 95%;
  }
  .quick-question-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
  .chat-input {
      padding: 0.6em 1em; /* 调整移动端输入框内边距 */
  }
  .btn-content {
      padding: 0.6rem 1.5rem; /* 调整移动端按钮内边距 */
      gap: 0.5rem; /* 调整移动端文字装饰间距 */
  }
  .btn-text {
      font-size: 1rem; /* 调整移动端文字大小 */
  }
  .btn-ornament {
      width: 24px; /* 调整移动端装饰大小 */
      height: 24px;
  }
  .ornament-symbol {
      font-size: 1rem; /* 调整移动端装饰符号大小 */
  }
}
</style> 