export interface Todo {
     text: string,
     completed: boolean,
     id?: string

}

export interface postArray {
  completed: boolean;
  text: string;
}

export interface StoreState {
  todos?: Todo[],
  todo?: Todo,
  completed?: boolean
}

export enum CustomersStoreActions {
  AddTodo = 'ADD_TODO',
  RemoveTodo = 'REMOVE_TODO',
  GetTodo = 'GET_TODOS',
  EditTodo = 'EDIT_TODOS'
}
