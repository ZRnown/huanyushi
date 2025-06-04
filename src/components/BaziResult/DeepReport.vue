<template>
  <div class="tab-content">
    <!-- 原BaziResult.vue deep tab内容粘贴到这里 -->
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
.deep-analysis-card {
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
.analysis-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}
</style> 