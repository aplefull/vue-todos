<template>
  <footer class="todo-footer">
    <div class="buttons-row">
      <button v-if="todos.length && !allCompleted" class="action-button" @click="store.checkAll">Check all</button>

      <div class="filter-buttons">
        <button class="filter-button" :class="{ active: filter === 'all' }" @click="store.setFilter('all')">All</button>
        <button
          v-if="hasActiveTodos"
          class="filter-button"
          :class="{ active: filter === 'active' }"
          @click="store.setFilter('active')"
        >
          Active
        </button>
        <button
          v-if="hasCompletedTodos"
          class="filter-button"
          :class="{ active: filter === 'completed' }"
          @click="store.setFilter('completed')"
        >
          Completed
        </button>
      </div>

      <button v-if="hasCompletedTodos" class="action-button" @click="store.clearCompleted">Clear completed</button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { computed } from 'vue';

const store = useTodoStore();

const todos = computed(() => store.todos);
const filter = computed(() => store.filter);
const hasCompletedTodos = computed(() => store.hasCompletedTodos);
const hasActiveTodos = computed(() => store.activeTodos.length > 0);
const allCompleted = computed(() => store.allCompleted);
</script>

<style scoped>
.todo-footer {
  width: 100%;
  margin-top: 16px;
}

.buttons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-button {
  font-weight: 600;
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: var(--border-color);
}

.filter-button.active {
  background: var(--primary-color);
  color: white;
}

.action-button {
  font-weight: 600;
  background: none;
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.action-button:hover {
  background: var(--border-color);
  color: var(--text-primary);
}

@media (width < 768px) {
  .buttons-row {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
