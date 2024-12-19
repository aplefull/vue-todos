<template>
  <div class="progress-block">
    <div class="progress-header">
      <span class="task-count">{{ count }} tasks</span>
      <span class="task-label">{{ label }}</span>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" :class="type" :style="{ width: `${percentage}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number;
  label: string;
  percentage: number;
  type: 'completed' | 'pending';
}>();
</script>

<style scoped>
.progress-block {
  background: var(--block-bg);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}

.progress-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.task-count {
  color: var(--text-secondary);
  font-size: 14px;
}

.task-label {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.progress-bar-container {
  width: 100%;
  height: 4px;
  background: var(--progress-bg);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-bar.completed {
  background: var(--progress-completed);
}

.progress-bar.pending {
  background: var(--progress-pending);
}
</style>
