<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <button class="drag-handle">
        <Icon name="dots" type="secondary" />
      </button>
      <input type="checkbox" :checked="completed" @change="$emit('toggle')" class="checkbox" />
      <input
        v-if="isEditing"
        ref="editInput"
        v-model="editedTitle"
        class="edit-input"
        @blur="finishEdit"
        @keyup.enter="finishEdit"
        @keyup.esc="cancelEdit"
      />
      <span v-else :class="{ completed }" class="todo-title">
        {{ title }}
      </span>
    </div>
    <div class="todo-item-right">
      <button class="icon-button" @click="startEdit" v-if="!isEditing">
        <Icon name="pencil" type="secondary" />
      </button>
      <button class="icon-button" @click="$emit('delete')" v-if="!isEditing">
        <Icon name="bin" type="danger" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';

const props = defineProps<{
  title: string;
  completed: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'delete'): void;
  (e: 'update', title: string): void;
}>();

const isEditing = ref(false);
const editedTitle = ref(props.title);
const editInput = ref<HTMLInputElement | null>(null);

const startEdit = async () => {
  isEditing.value = true;
  editedTitle.value = props.title;
};

const finishEdit = () => {
  if (isEditing.value) {
    const newTitle = editedTitle.value.trim();

    if (newTitle && newTitle !== props.title) {
      emit('update', newTitle);
    }

    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedTitle.value = props.title;
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.todo-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.todo-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.edit-input {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: inherit;
  outline: none;
  background-color: var(--card-background);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.todo-item-right {
  display: flex;
  gap: 8px;
}

.drag-handle {
  cursor: move;
  border: none;
  background: none;
  padding: 4px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid var(--checkbox-border);
  background-color: var(--card-background);
  flex-shrink: 0;
}

.completed {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.icon-button {
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.icon-button:hover {
  opacity: 1;
}
</style>
