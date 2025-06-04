<template>
  <div class="tab-content">
    <!-- 原BaziResult.vue personality tab内容粘贴到这里 -->
    <!-- ... -->
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({ baziData: Object })
</script>

<style>
.tab-content {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.section-title {
  font-size: 1.5rem;
  color: #314a43;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.analysis-card {
  background: #fff;
  border: 1px solid #e9c46a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.card-title {
  font-size: 1.3rem;
  color: #314a43;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #e9c46a;
  padding-bottom: 0.5rem;
}
.yin-yang-stats {
  margin-bottom: 1rem;
}
.yin-yang-bar {
  display: flex;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.yang-part {
  background: #c77f6a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.yin-part {
  background: #2c3e50;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.analysis-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}
.wuxing-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9f5e8;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.summary-label {
  color: #666;
  min-width: 80px;
}
.summary-value {
  font-weight: bold;
}
.summary-value.weak { color: #ffc107; }
.summary-value.strong { color: #28a745; }
.summary-value.favorite { color: #c77f6a; }
.shengxiao-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f5e8;
  border-radius: 8px;
}
.shengxiao-icon {
  font-size: 2.5rem;
}
.shengxiao-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #314a43;
}
.trait-item {
  margin-bottom: 0.5rem;
}
.trait-title {
  font-weight: bold;
  color: #c77f6a;
}
.geju-name, .geju-quality {
  font-size: 1.1rem;
  font-weight: bold;
  color: #c77f6a;
  margin-bottom: 0.5rem;
}
</style> 