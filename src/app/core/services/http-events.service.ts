import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceEvents{
    private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
    constructor(private http: HttpClient){ }    
    // getEvents(request):Observable<any[]> {
    //     if(request) {
	// 		return this.http.get<Event[]>(this.fireBase+`events.json?`+request)
	// 	} else {
	// 		return this.http.get<Event[]>(this.fireBase+`events.json`)
	// 	}
    // }
    getEvents(request?:string):Observable<any[]> {
        if(request) {
			return this.http.get<Event[]>(this.fireBase+`newevents.json?`+request)
		} else {
			return this.http.get<Event[]>(this.fireBase+`newevents.json`)
		}
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
