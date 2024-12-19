const PANTRY_ID = 'b740bcf3-4f66-4f63-99a3-0fd39e853861';
const BASKET_NAME = 'todos';
const BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${BASKET_NAME}`;

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  order: number;
}

interface TodosRecord {
  [key: string]: Omit<TodoItem, 'id'>;
}

interface TodosResponse {
  todos: TodosRecord;
}

export const api = {
  async createBasket(): Promise<void> {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async fetchTodos(): Promise<TodoItem[]> {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          await this.createBasket();
          return [];
        }
      }

      const data = (await response.json()) as TodosResponse;
      return Object.entries(data.todos || {}).map(([id, todo]) => ({
        id: Number(id),
        ...todo,
      }));
    } catch (error) {
      throw new Error(`Failed to fetch todos: ${error}`);
    }
  },

  async updateTodos(todos: TodoItem[]): Promise<void> {
    const todosRecord = todos.reduce<TodosRecord>((acc, todo) => {
      acc[todo.id] = {
        title: todo.title,
        completed: todo.completed,
        order: todo.order,
      };

      return acc;
    }, {});

    try {
      await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todos: todosRecord,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to update todos: ${error}`);
    }
  },
};
