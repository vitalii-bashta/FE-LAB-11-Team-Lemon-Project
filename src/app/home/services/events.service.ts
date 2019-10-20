import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { switchMap, startWith, debounceTime } from 'rxjs/operators';
import { HttpServiceEvents } from '../../core/services/http-events.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

	private searchField = new Subject<string>();

	constructor(private httpServiceEvents: HttpServiceEvents) { }

	getSearchStream() {
		return this.searchField.asObservable().pipe(
			startWith('')
		);
	}

	pushToSearchStream(searchString) {
		this.searchField.next(searchString);
	}

	getEvents(): Observable<any> {
		return this.httpServiceEvents.getEvents();
	}

}
