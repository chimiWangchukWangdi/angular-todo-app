import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [
    new Todo('this is test!', false),
    new Todo('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', true)
  ];

  constructor(private apiService: ApiService) { }

  getAllTodos() {
    this.apiService.fetchPost();
  };

  addTodo(todo: Todo) {
    return this.todos.push(todo);
  };

  updateTodo(index: string, updatedTodo: Todo) {
    this.apiService.updatePost(index, updatedTodo).subscribe;
  };

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

}
