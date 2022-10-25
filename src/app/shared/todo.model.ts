export class Todo {
  constructor(
    public text: string,
    public completed: boolean = false,
    public id?: string
  ) {}
}

export interface StoreState {
  todos: Todo[],
  todo: Todo
}

export enum CustomersStoreActions {
  AddCustomer = 'ADD_TODO',
  RemoveCustomer = 'REMOVE_TODO',
  GetCustomers = 'GET_TODOS'
}
