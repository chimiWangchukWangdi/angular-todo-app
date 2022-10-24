import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos?: Todo[];
  todo?: Todo[];
  showValidationErros?: boolean;
  todoList? :Observable<Todo[]>;
  todoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private dataService: DataService, private dialog: MatDialog, private fb: FormBuilder, private apiService: ApiService, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()!;
    this.todoList = this.apiService.fetchPost() as Observable<Todo[]>;
  }

  onFormSubmit(form: FormGroup) {
    if (!form.valid) {
     this.showValidationErros = true;
     return;
    };
    //this.dataService.addTodo(new Todo(form.value.text));
    this.showValidationErros = false;
    this.apiService.onCreatePost(new Todo(form.value.text));
    form.reset();
    setTimeout( () => {
      this.ngOnInit();
    }, 100)

  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  onEditClicked(todo: Todo) {
    const index: string = todo.id!;
    console.log(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '600px',
      data: todo
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.apiService.updatePost(index, result).subscribe((response) => {
          console.log(response);
        });
      };
    })
  }

  onClearPosts(todo: Todo) {
    var index: string = todo.id!
    console.log(index)
    this.apiService.deletePosts(index).subscribe(() => {
      // index = [] as unknown as string;
    })
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/");
  }

  /* onDeleteClicked(todo: Todo) {
    const index = this.todos?.indexOf(todo);
    this.dataService.deleteTodo(index!);
  } */
}
