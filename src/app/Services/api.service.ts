import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from '../shared/todo.model';

interface postArray {
  completed: boolean;
  text: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  onCreatePost(postData: Todo) {
    return this.http
      .post(
        'https://angular-todo-app-b0176-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((response) => {});
  }

  fetchPost(): Observable<postArray[]> {
    return this.http
      .get(
        'https://angular-todo-app-b0176-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responseData: any) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      );
  }

  updatePost(index: any, result: Todo): Observable<any> {
    console.log('this is updatePost');
    const url =
      'https://angular-todo-app-b0176-default-rtdb.asia-southeast1.firebasedatabase.app/posts/';
    return this.http.put(url + index + '.json', result);
  }

  deletePosts(id: string) {
    const url =
      'https://angular-todo-app-b0176-default-rtdb.asia-southeast1.firebasedatabase.app/posts/';
    return this.http.delete(url + id + '.json');
  }
}
