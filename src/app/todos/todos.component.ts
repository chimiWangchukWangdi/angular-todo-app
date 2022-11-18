import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../authentication.service';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { FacadeService } from '../Services/facade.service';
import { StateService } from '../Services/state.service';
import { FileUploadService } from '../Services/file-upload.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos?: Todo[];
  todo?: Todo;
  storeSub: any;
  topThreeList?: Todo[];
  todolist2?: any;
  showValidationErros?: boolean;
  todoList? :Observable<Todo[]>;
  todoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private facadeService: FacadeService, private dataService: DataService, private stateService: StateService, private dialog: MatDialog, private fb: FormBuilder, private apiService: ApiService, private authenticationService: AuthenticationService, private router: Router, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.facadeService.getTodosFromApi();
    this.facadeService.selectTodo().subscribe(res => {
      debugger
    })
    this.todos = this.dataService.getAllTodos()!;
    this.todoList = this.facadeService.fetchPost() as Observable<Todo[]>;
    this.facadeService.fetchPost().subscribe((response) => {
      this.todolist2 = response;
      this.stateService.addTodosToStore(this.todolist2 as unknown as Todo[]);
    });

    setTimeout( () => {
      this.getState();
    }, 100);
  }

  onFormSubmit(form: FormGroup) {
    if (!form.valid) {
     this.showValidationErros = true;
     return;
    };
    //this.dataService.addTodo(new Todo(form.value.text));
    this.showValidationErros = false;
    // this.facadeService.onCreatePost(new Todo(form.value.text));
    // this.facadeService.add(new Todo(form.value.text));
    form.reset();
    setTimeout( () => {
      this.ngOnInit();
    }, 100);
  }

  toggleCompleted (todo: Todo) {
    todo.completed = !todo.completed;
    const index1: string = todo.id!;
    this.facadeService.updatePost(index1, todo).subscribe();
    this.stateService.edit(index1, todo)
  }

  onEditClicked(todo: Todo) {
    const index: string = todo.id!;

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '600px',
      data: todo
    });

    this.stateService.edit(index, todo);

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.facadeService.updatePost(index, result).subscribe((response) => {
        });
      };
      setTimeout( () => {
        this.ngOnInit();
      }, 500);
    });
  }

  onClearPosts(todo: Todo) {
    var index: string = todo.id!
    this.facadeService.deletePosts(index).subscribe(() => {
      // index = [] as unknown as string;
    });
    this.facadeService.remove();
    setTimeout( () => {
      this.ngOnInit();
    }, 200);
  }

  onUploadImage() {
   // this.fileUploadService.pushFileToStorage()
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/");
  }

  /* onDeleteClicked(todo: Todo) {
    const index = this.todos?.indexOf(todo);
    this.dataService.deleteTodo(index!);
  } */

  getState() {
    this.topThreeList = this.stateService.get();
    console.log('Inside getState()', this.topThreeList);
  }

}
