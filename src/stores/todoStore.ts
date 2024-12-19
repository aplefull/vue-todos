import { defineStore } from 'pinia';
import { api } from '@/services/api';

type FilterType = 'all' | 'active' | 'completed';
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as FilterType,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = null;

      try {
        this.error = null;
        this.todos = await api.fetchTodos();
      } catch (err) {
        this.error = err;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addTodo(title: string) {
      // TODO use a better way to generate IDs
      const id = Date.now();
      const newTodo = {
        title: title.trim(),
        completed: false,
        order: this.todos.length,
      };

      const newList = [
        ...this.todos,
        {
          id,
          ...newTodo,
        },
      ];

      try {
        this.todos = newList;
        this.error = null;
        await api.updateTodos(newList);
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) return;

      try {
        const newList = this.todos.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              completed: !t.completed,
            };
          }

          return t;
        });

        todo.completed = !todo.completed;
        this.error = null;
        await api.updateTodos(newList);
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async updateTodo(id: number, title: string) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo || !title.trim()) return;

      try {
        const newList = this.todos.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              title,
            };
          }

          return t;
        });

        todo.title = title.trim();
        this.error = null;
        await api.updateTodos(newList);
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async deleteTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) return;

      try {
        const newList = this.todos.filter((t) => t.id !== id);

        await api.updateTodos(newList);
        this.todos = newList;
        this.error = null;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async clearCompleted() {
      try {
        const newList = this.todos.filter((t) => !t.completed);
        await api.updateTodos(newList);
        this.todos = newList;
        this.error = null;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async checkAll() {
      try {
        const newList = this.todos.map((todo) => ({
          ...todo,
          completed: true,
        }));

        await api.updateTodos(newList);
        this.todos = newList;
        this.error = null;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    async reorderTodos(reordered: Todo[]) {
      try {
        const newList = reordered.map((todo, index) => ({
          ...todo,
          order: index,
        }));

        this.todos = newList;
        this.error = null;
        await api.updateTodos(newList);
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },

    setFilter(filter: FilterType) {
      this.filter = filter;
    },
  },

  getters: {
    filteredTodos: (state) => {
      const todos = [...state.todos].sort((a, b) => {
        return a.order - b.order;
      });

      switch (state.filter) {
        case 'active':
          return todos.filter((todo) => !todo.completed);
        case 'completed':
          return todos.filter((todo) => todo.completed);
        default:
          return todos;
      }
    },
    hasCompletedTodos: (state) => state.todos.some((todo) => todo.completed),
    allCompleted: (state) => state.todos.length > 0 && state.todos.every((todo) => todo.completed),
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    activeTodos: (state) => state.todos.filter((todo) => !todo.completed),
  },
});
