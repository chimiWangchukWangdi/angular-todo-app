import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState, Todo } from '../shared/todo.model';

@Injectable({
  providedIn: 'root'
})
export class StateService extends ObservableStore<StoreState>{

  todos?: Todo[];
  todo?: Todo;

  constructor() {
    const initialState = {
      todos: [],
      todo: undefined,
      completed: false
  };
    super({ trackStateHistory: true });
    this.setState(initialState, 'INIT_STATE');
  }

  get(): any {
    // const { todos } = this.getState();
    // console.log('this getstate().todos', this.getState().todos);
    // if (todos) {
    //     console.log('todos', todos)
    //     return todos
    // }

    return this.getState().todos;
  }

  add(todo: Todo) {
    let state = this.getState();
    state.todos?.push(todo);
    this.setState({ todos: state.todos }, 'ADD_TODO');
  }

  addTodosToStore(todos: Todo[]) {
    this.setState({ todos: todos }, 'ADD_TODOS');
}

  edit(index: string, todo: Todo) {
    //TODO: Creating edit function
  }

  remove() {
    let state = this.getState();
    state.todos?.splice(state.todos.length - 1, 1);
    this.setState({ todos: state.todos }, 'REMOVE_TODO');
  }

}
