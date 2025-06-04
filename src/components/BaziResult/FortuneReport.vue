<template>
  <div class="tab-content">
    <!-- 原BaziResult.vue fortune tab内容粘贴到这里 -->
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
.fortune-card {
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
.dayun-table, .liunian-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
.dayun-header, .liunian-header {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background: #c77f6a;
  color: #fff;
  font-weight: bold;
}
.dayun-row, .liunian-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 1px solid #e9c46a;
}
.dayun-cell, .liunian-cell {
  padding: 0.8rem;
  text-align: center;
  border-right: 1px solid #e9c46a;
}
.dayun-cell:last-child, .liunian-cell:last-child {
  border-right: none;
}
.dayun-row:nth-child(even), .liunian-row:nth-child(even) {
  background: #f9f5e8;
}
.吉 { color: #28a745; }
.凶 { color: #dc3545; }
.平 { color: #ffc107; }
</style> 