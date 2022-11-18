import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './todo.actions'
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { ApiService } from '../Services/api.service';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private api$: ApiService
  ) {}

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getTodos),
      switchMap(() => this.api$.fetchPost()),
      tap((res) => {
        debugger
      }),
      map(res => actions.setTodos(res))
    );
  })

}
