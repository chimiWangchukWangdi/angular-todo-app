import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState, Todo } from '../shared/todo.model';

@Injectable({
  providedIn: 'root'
})
export class StateService extends ObservableStore<StoreState>{

  constructor() {
    const initialState = {
      todos: [],
      todo: undefined
  };
    super({ trackStateHistory: true });
    this.setState(initialState, 'INIT_STATE');
  }

  get(): any {
    const { todos } = this.getState();
    if (todos) {
        return todos
    }
  }

  add(todo: Todo) {
    let state = this.getState();
    state.todos?.push(todo);
    this.setState({ todos: state.todos }, 'ADD_TODO');
  }

  remove() {
    let state = this.getState();
    state.todos?.splice(state.todos.length - 1, 1);
    this.setState({ todos: state.todos }, 'REMOVE_TODO');
  }

}
