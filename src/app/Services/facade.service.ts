import { Injectable } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { ApiService } from './api.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private apiService: ApiService, private stateService: StateService) { }

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


}
