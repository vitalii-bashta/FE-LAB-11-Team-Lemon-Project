import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpServiceEvents } from '../../core/services/http-events.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    constructor(private httpServiceEvents: HttpServiceEvents) { }

    getEventsFromDb() {
        return this.httpServiceEvents.getEvents();
    }
}
