<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import Illustration from '@/components/icons/Illustration.vue';
import Checkmark from '@/components/icons/checkmark.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import ProgressContainer from '@/components/ProgressContainer.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { computed, onMounted } from 'vue';

const store = useTodoStore();
const hasTodos = computed(() => store.todos.length > 0);
const loading = computed(() => store.loading);
const error = computed(() => store.error);

onMounted(() => {
  store.fetchTodos();
});
</script>

<template>
  <div class="container">
    <ThemeToggle />
    <main>
      <LoadingSpinner v-if="loading" />

      <template v-else>
        <Illustration class="logo" />
        <h1>Today I need to</h1>
        <TodoInput @add-todo="store.addTodo" />

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <TodoList v-if="hasTodos" />
        <ProgressContainer v-if="hasTodos" />
        <TodoFooter v-if="hasTodos" />

        <div v-if="!hasTodos" class="empty-state">
          <div class="empty-state-row">
            <Checkmark />
            <span> Congrats, you have no more tasks to do </span>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 32px;
  width: 100%;
  max-width: 500px;
  min-height: 90vh;
  background-color: var(--card-background);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0;
  transition: background-color 0.3s ease;
}

h1 {
  font-weight: bold;
  margin: 0;
}

.logo {
  height: 60px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.empty-state {
  display: flex;
  flex: 1;
  align-items: end;
}

.empty-state-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.error-message {
  color: #ef4444;
  padding: 8px 12px;
  background-color: #fee2e2;
  border-radius: 6px;
  font-size: 14px;
}
</style>
