import { formatCurrency } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  fakeUsername: string = "username";
  fakePassword: string = "password";

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<HttpResponse<unknown>> {
    // Mock a successful call to an API server.
    if (username == this.fakeUsername && password == this.fakePassword) {
      localStorage.setItem("token", "my-super-secret-token-from-server");
      console.log('Log In Successful');
      this.router.navigateByUrl("/todos")
      return of(new HttpResponse({ status: 200 }));
    } else {
      console.log('Log In Unsuccessful');
      alert('Authentication Unsuccessful');
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }

}
