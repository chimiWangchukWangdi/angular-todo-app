import { createSelector } from '@ngrx/store';
import { StoreState } from '../shared/todo.model';

export const selectStore = (state: StoreState) => state;
export const selectTodos = createSelector(selectStore, (state) => state.todos);
export const selectTodo = createSelector(selectStore, (state) => state.todo);
export const selectComplete = createSelector(selectStore, (state) => state.completed);
export const selectTodosAndComplete = createSelector(selectTodo, selectComplete, (todo, complete) => ({ todo, complete}))
