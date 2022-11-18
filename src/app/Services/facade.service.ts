import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Todo } from '../shared/todo.model';
import { ApiService } from './api.service';
import { StateService } from './state.service';
import * as actions from '../state/todo.actions'
import * as selectors from '../state/todo.selector'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private apiService: ApiService, private stateService: StateService, private store: Store) { }

  fetchPost() {
    return this.apiService.fetchPost();
  }

  onCreatePost(postData: Todo) {
    return this.apiService.onCreatePost(postData);
  }

  updatePost(index: any, result: any) {
    return this.apiService.updatePost(index, result);
  }

  deletePosts(id: string) {
    return this.apiService.deletePosts(id);
  }

  add(todo: Todo) {
    return this.stateService.add(todo);
  }

  remove() {
    return this.stateService.remove();
  }

  getTodosFromApi(): void {
    this.store.dispatch(actions.getTodos())
  }

  selectTodo(): Observable<Todo[] | undefined> {
    return this.store.pipe(select(selectors.selectTodos))
  }






}
