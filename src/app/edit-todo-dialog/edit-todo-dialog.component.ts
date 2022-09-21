import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
})
export class EditTodoDialogComponent implements OnInit {
  showValidationErros?: boolean;
  todoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoForm.patchValue(this.todo);
  }

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(form: FormGroup) {
    if (form.invalid) return;
    const updatedTodo = {
      ...this.todo,
      ...form.value,
    };
    this.dialogRef.close(updatedTodo);
  }
}
