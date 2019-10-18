import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from './../models/event.model'

@Injectable()
export class HttpServiceEvents{
  private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
  constructor(private http: HttpClient){ }
  getEvents(request:string = ''):Observable<Event[]> {
  	return this.http.get<Event[]>(this.fireBase+`events.json?`+request)
  }
  getEvent(number:string):Observable<any> {
    return this.http.get(`${this.fireBase}events/${number}.json`)
  }
  deleteEvent(id:string):Observable<void> {
    return this.http.delete<void>(`${this.fireBase}events/${id}.json`)
  }
  pushEvent(data:Event):Observable<Object>  {
    return this.http.post(`${this.fireBase}events.json`, data)
  }
  updateEvent(key:string,data:Event):Observable<Object> {
    return this.http.patch(`${this.fireBase}/events/${key}.json`,data)
  }   
}
