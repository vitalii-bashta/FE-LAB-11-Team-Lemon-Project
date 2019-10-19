import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model'

@Injectable()
export class HttpServiceUsers{
  private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
  constructor(private http: HttpClient){ }  
  getUsers(request:string = ''):Observable<User[]> {
    return this.http.get<User[]>(this.fireBase+`users.json?`+request) 
  }
  getUser(key:string):Observable<any> {
	  return this.http.get(`${this.fireBase}users/${key}.json`)
  }
  deleteUser(key:string):Observable<void> {
	  return this.http.delete<void>(`${this.fireBase}users/${key}.json`)
  }
  pushUser(data:User):Observable<any>  {
	  return this.http.post(`${this.fireBase}users.json`, data)
  }
  updateUser(key:string,data:User):Observable<any> {
	  return this.http.patch(`${this.fireBase}/users/${key}.json`,data)
  }   
}