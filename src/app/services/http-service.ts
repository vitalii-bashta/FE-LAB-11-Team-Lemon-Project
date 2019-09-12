import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../core/models/event.model'

  
@Injectable()
export class HttpService{
    private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
    constructor(private http: HttpClient){ }    
    getEvents():Observable<Event[]> {
        return this.http.get<Event[]>(this.fireBase+`users.json`)
    }
    getEvent(number:string):Observable<any> {
        return this.http.get(`${this.fireBase}users/${number}.json`)
    }
    deleteEvents(id:string):Observable<void> {
        return this.http.delete<void>(`${this.fireBase}users/${id}.json`)
    }
    pushEvents(data:Event):Observable<any>  {
        return this.http.post(`${this.fireBase}users.json`, data)
    }
    updateEvents(key:string,data:Event):Observable<any> {
        return this.http.patch(`${this.fireBase}/users/${key}.json`,data)
    }   
    // 'https://[PROJECT_ID].firebaseio.com/users/jack/name/last.json'
    // { "first": "Jack", "last": "Sparrow" }
}