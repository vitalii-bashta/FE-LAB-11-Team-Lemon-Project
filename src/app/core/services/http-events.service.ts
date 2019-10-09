import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceEvents{
    private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
    constructor(private http: HttpClient){ }    
    // getEvents():Observable<any[]> {
    //     return this.http.get<any[]>(this.fireBase+`events.json`)
    // }
    getEvents():Observable<any[]> {
        return this.http.get<any[]>(this.fireBase+`newevents.json`)
    }
    getEvent(number:string):Observable<any> {
        return this.http.get(`${this.fireBase}events/${number}.json`)
    }
    deleteEvent(id:string):Observable<void> {
        return this.http.delete<void>(`${this.fireBase}events/${id}.json`)
    }
    pushEvent(data):Observable<any>  {
        return this.http.post(`${this.fireBase}events.json`, data)
    }
    updateEvent(key:string,data:any):Observable<any> {
        return this.http.patch(`${this.fireBase}/events/${key}.json`,data)
    }   
}
