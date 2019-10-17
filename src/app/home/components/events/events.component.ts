import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Subscription, combineLatest } from 'rxjs';
import { Event } from '../../../core/index'

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
	public filteredEvents: Event[] = [];
	public events: Event[] = [];
	private searchString: string;
	private eventSubscription: Subscription;

	constructor(private eventsService: EventsService) { }

	ngOnInit() {
		this.eventSubscription = combineLatest(this.eventsService.getEventsFromDb(), this.eventsService.getSearchStream())
		.subscribe(([events, searchStr]) => {
			this.events = [];
			for	(const element in events) {
				events[element].id = element
				this.searchString = searchStr;

				if (this.checkIfItemPassesFilter(events[element])) {
					this.events.push(events[element]);
				}
			}
		})
	}

	checkIfItemPassesFilter(item: Event): boolean {
		return item.eventName.toLowerCase().includes(this.searchString.toLowerCase()) 
		|| item.aboutEvent.toLowerCase().includes(this.searchString.toLowerCase());
	}

	ngOnDestroy() {
		this.eventSubscription.unsubscribe()
	}
}
