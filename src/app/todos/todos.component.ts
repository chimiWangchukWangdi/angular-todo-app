import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  showValidationErros?: boolean;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid) {
     this.showValidationErros = true;
     return;
    };
    this.dataService.addTodo(new Todo(form.value.text));
    this.showValidationErros = false;
    form.reset();
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  onEditClicked(todo: Todo) {
    const index: number = this.todos?.indexOf(todo)!

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '600px',
      data: todo
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dataService.updateTodo(index, result);
      };
    })
  }

  onDeleteClicked(todo: Todo) {
    const index = this.todos?.indexOf(todo);
    this.dataService.deleteTodo(index!);
  }
}
