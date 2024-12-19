<template>
  <div class="todo-input-container">
    <input v-model="newTodo" type="text" class="todo-input" placeholder="Add new todo..." @keyup.enter="emitAddTodo" />
    <button v-if="newTodo.length > 0" class="add-todo-button" @click="emitAddTodo">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add-todo', value: string): void;
}>();

const newTodo = ref('');

const emitAddTodo = () => {
  if (newTodo.value.trim()) {
    emit('add-todo', newTodo.value.trim());
    newTodo.value = '';
  }
};
</script>

<style scoped>
.todo-input-container {
  display: flex;
  gap: 8px;
  width: 100%;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  min-width: 0;
  border: 1px solid var(--border-color);
  background-color: var(--card-background);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
}

.todo-input:focus {
  border-color: var(--primary-color);
}

.todo-input:focus {
  border-color: var(--primary-color);
}

.add-todo-button {
  background-color: #2578f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

.add-todo-button:hover {
  background-color: #1b5cc5;
}
</style>
