import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { StoreState } from '../shared/todo.model';
import * as action from './todo.actions';

export const initialState: StoreState = {
  todos: undefined,
  todo: undefined,
  completed: undefined

};

export const todoReducer = createReducer<StoreState>(
  initialState,
  on(action.setTodos, (state, { payload }) => ({...state, todos: payload})),
  on(action.addTodo, (state, { payload}) => ({...state, todo: payload })),
  on(action.setComplete, (state, {payload}) =>( {...state, completed: payload}))

);
