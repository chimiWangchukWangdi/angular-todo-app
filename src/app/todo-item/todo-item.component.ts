import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadFormComponent } from '../Components/upload-form/upload-form.component';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

@Input() todo?: Todo;
@Output() todoClicked = new EventEmitter<void>();
@Output() editClicked = new EventEmitter<void>();
@Output() deleteClicked = new EventEmitter<void>();
@Output() uploadClicked = new EventEmitter<void>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onTodoClicked() {
    this.todoClicked.emit();
  }

  onEditClicked() {
    this.editClicked.emit();
  }

  onDeleteClicked() {
    this.deleteClicked.emit();
    console.log('delete')
  }

  onUploadClicked() {
    this.uploadClicked.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFormComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
