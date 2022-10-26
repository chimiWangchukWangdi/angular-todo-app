export class Todo {
  constructor(
    public text: string,
    public completed: boolean = false,
    public id?: string
  ) {}
}

export interface postArray {
  completed: boolean;
  text: string;
}

export interface StoreState {
  todos: Todo[],
  todo: Todo,
  completed: boolean
}

export enum CustomersStoreActions {
  AddTodo = 'ADD_TODO',
  RemoveTodo = 'REMOVE_TODO',
  GetTodo = 'GET_TODOS',
  EditTodo = 'EDIT_TODOS'
}
