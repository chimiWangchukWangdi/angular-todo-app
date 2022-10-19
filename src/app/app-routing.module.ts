import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardGuard } from './authentication-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'todos', component: TodosComponent},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthenticationGuardGuard]    // Actually quite dumb! Why authenticate for the authenticate page???
  },
  /* { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuardGuard]
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
