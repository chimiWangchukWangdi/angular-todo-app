import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  fakeUsername: string = "username";
  fakePassword: string = "password";

  constructor() { }

  login(username: string, password: string): Observable<HttpResponse<unknown>> {
    debugger
    // Mock a successful call to an API server.
    if (username == this.fakeUsername && password == this.fakePassword) {
      localStorage.setItem("token", "my-super-secret-token-from-server");
      console.log('Log In Successful');
      return of(new HttpResponse({ status: 200 }));
    } else {
      console.log('Log In Unsuccessful');
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
