import { createAction } from '@ngrx/store';
import { Todo } from '../shared/todo.model';

export const setTodos = createAction('[TODO] set Todo', (payload: Todo[])  => ({ payload }));
export const getTodos = createAction('[TODO] get Todos');
export const addTodo = createAction('[TODO] add todo', (payload: Todo) => ({ payload }));
export const setComplete = createAction(' [TODO] Set Complete', (payload: boolean) => ({ payload }));
