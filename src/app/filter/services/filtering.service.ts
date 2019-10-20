import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultFilter } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

	private filterStream = new BehaviorSubject<any>(DefaultFilter);

	pushToFiltersStream(newFilters) {
		this.filterStream.next(newFilters);
	}

    getFiltersStream() {
        return this.filterStream.asObservable();
    }
}
