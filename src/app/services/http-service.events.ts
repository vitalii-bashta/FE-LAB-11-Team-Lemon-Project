import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../core/models/event.model'

  
@Injectable()
export class HttpServiceEvents{
    private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
    constructor(private http: HttpClient){ }    
    getEvents():Observable<Event[]> {
        return this.http.get<Event[]>(this.fireBase+`events.json`)
    }
    getEvent(number:string):Observable<any> {
        return this.http.get(`${this.fireBase}events/${number}.json`)
    }
    deleteEvent(id:string):Observable<void> {
        return this.http.delete<void>(`${this.fireBase}events/${id}.json`)
    }
    pushEvent(data:Event):Observable<any>  {
        return this.http.post(`${this.fireBase}events.json`, data)
    }
    updateEvent(key:string,data:Event):Observable<any> {
        return this.http.patch(`${this.fireBase}/events/${key}.json`,data)
    }   
    // 'https://[PROJECT_ID].firebaseio.com/users/jack/name/last.json'
    // { "first": "Jack", "last": "Sparrow" }
}