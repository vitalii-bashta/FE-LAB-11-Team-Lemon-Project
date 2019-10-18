import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { switchMap, startWith, debounceTime } from 'rxjs/operators';
import { HttpServiceEvents } from '../../core/services/http-events.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private dataUpdated = new Subject<string>();

    constructor(private httpServiceEvents: HttpServiceEvents) { }

    getDataUpdated() {
        return this.dataUpdated.asObservable().pipe(
            startWith(''),
            debounceTime(1000)
        );
    }

    pushDataUpdated(searchString) {
        this.dataUpdated.next(searchString);
    }

    getEventsFromDb(paramsString): Observable<any> {
        return this.httpServiceEvents.getEvents(paramsString);
    }

    getSearchedEvents(): Observable<any> {
        return this.getDataUpdated().pipe(
            switchMap((searchString) => {
                return this.getEventsFromDb(searchString);
            })
        )
    }
}
