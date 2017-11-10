import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../model/user/user.model";
import { URLs } from "../../apiURLs/apiURLs.constants";

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  urls = URLs;
  t_id = localStorage.getItem('t_id');
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    console.log(this.urls.root);
  }
  getsubjects() {
    let body: string = `method=${this.urls.getSubjects}&t_id=${this.t_id}&token=${this.token}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getsections() {
    let body: string = `method=${this.urls.getSections}&t_id=${this.t_id}&token=${this.token}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  addsubject(subject_name: string, section_id: string) {
    let body: string = `method=${this.urls.addSubject}&t_id=${this.t_id}&token=${this.token}&sub_name=${subject_name}&section_id=${section_id}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getstudents(section_id: string) {
    let body: string = `method=${this.urls.getStudents}&t_id=${this.t_id}&token=${this.token}&section_id=${section_id}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

}
