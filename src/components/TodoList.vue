<template>
  <div class="todo-list">
    <draggable
      v-model="draggedTodos"
      :item-key="'id'"
      :animation="200"
      handle=".drag-handle"
      ghost-class="ghost"
      drag-class="dragging"
    >
      <template #item="{ element }">
        <TodoItem
          :key="element.id"
          :title="element.title"
          :completed="element.completed"
          @toggle="toggleTodo(element.id)"
          @delete="deleteTodo(element.id)"
          @update="(newTitle) => updateTodo(element.id, newTitle)"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { useTodoStore } from '@/stores/todoStore';
import TodoItem from './TodoItem.vue';
import { computed } from 'vue';

const store = useTodoStore();

const draggedTodos = computed({
  get: () => store.filteredTodos,
  set: (value) => {
    store.reorderTodos(value);
  },
});

const toggleTodo = (id: number) => {
  store.toggleTodo(id);
};

const deleteTodo = (id: number) => {
  store.deleteTodo(id);
};

const updateTodo = (id: number, newTitle: string) => {
  store.updateTodo(id, newTitle);
};
</script>

<style scoped>
.todo-list {
  width: 100%;
  max-height: 300px;
  min-height: 200px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  flex: 1;
}

.ghost {
  opacity: 0.5;
  background: var(--block-bg);
}

.dragging {
  cursor: grabbing;
}

.todo-list::-webkit-scrollbar {
  width: 4px;
}

.todo-list::-webkit-scrollbar-track {
  background: transparent;
}

.todo-list::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 8px;
}

.todo-list::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
