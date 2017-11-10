import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../model/user/user.model";
import { URLs } from "../../apiURLs/apiURLs.constants";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  urls = URLs;
  constructor(private http: HttpClient) {
    console.log(this.urls.root);
  }

  login(user: User) {
    let body: string = `method=${this.urls.login}&email=${user.email}&password=${user.password}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  register(user: User) {
    let body: string = `method=${this.urls.register}&email=${user.email}&password=${user.password}&name=${user.name}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

}
