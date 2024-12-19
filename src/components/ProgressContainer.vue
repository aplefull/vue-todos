<template>
  <div class="progress-container">
    <ProgressBlock :count="completedCount" label="Completed" :percentage="completedPercentage" type="completed" />
    <ProgressBlock :count="pendingCount" label="To be finished" :percentage="pendingPercentage" type="pending" />
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import ProgressBlock from './ProgressBlock.vue';
import { computed } from 'vue';

const store = useTodoStore();

const totalTodos = computed(() => store.todos.length);
const completedCount = computed(() => store.completedTodos.length);
const pendingCount = computed(() => store.activeTodos.length);

const completedPercentage = computed(() => (totalTodos.value ? (completedCount.value / totalTodos.value) * 100 : 0));

const pendingPercentage = computed(() => (totalTodos.value ? (pendingCount.value / totalTodos.value) * 100 : 0));
</script>

<style scoped>
.progress-container {
  display: flex;
  gap: 16px;
  width: 100%;
}

@media (width < 480px) {
  .progress-container {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
