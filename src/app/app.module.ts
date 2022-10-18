import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { AuthenticationInterceptor } from './authentication.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    EditTodoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [AuthenticationInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
