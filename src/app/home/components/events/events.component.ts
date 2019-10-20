import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Subscription, combineLatest } from 'rxjs';
import { Event } from '../../../core/index'

import { FilteringService } from '../../../filter/services/filtering.service';

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
	private weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	constructor(private eventsService: EventsService, private filteringService: FilteringService) { }

	ngOnInit() {
		this.eventSubscription = combineLatest(
			this.eventsService.getEvents(),
			this.eventsService.getSearchStream(),
			this.filteringService.getFiltersStream()
			)
		.subscribe(([events, searchStr, filters]) => {
			this.events = [];
			for	(const element in events) {
				events[element].id = element
				this.searchString = searchStr;

				if (this.checkIfItemPassesFilter(events[element])) {
					this.events.push(events[element]);
				}
			}
			this.applyFiltersToEvents(filters);
		});
	}

	checkIfItemPassesFilter(item: Event): boolean {
		return item.eventName.toLowerCase().includes(this.searchString.toLowerCase()) 
		|| item.aboutEvent.toLowerCase().includes(this.searchString.toLowerCase());
	}

	applyFiltersToEvents(filters) {
		console.log(filters);
		this.events = this.events.filter((item) => {
			return this.filterByDate(item, filters.dates) && 
			this.filterByCategory(item, filters.category) && 
			this.filterByWeekDay(item, filters.weekDays) && 
			this.filterByLocation(item, filters.location);
		})
	}

	filterByDate(item, dates) {
		const startDate = new Date(dates.from);
		const endDate = new Date(dates.to);
		const itemDate = new Date(item.date);
		if (dates.to && dates.from) {
			return itemDate >= startDate && itemDate <= endDate;
		} else if (dates.to) {
			return itemDate <= endDate;
		} else if (dates.from) {
			return itemDate >= startDate;
		} else {
			return true;
		}
	}

	filterByCategory(item, category) {
		if (category && category !== 'any') {
			return item.category.toLowerCase() === category.toLowerCase();
		}
		return true;
		
	}

	filterByWeekDay(item, weekDays) {
		if (weekDays) {
			const dayOfWeek = this.weekDays[new Date(item.date).getDay()];
			return weekDays[dayOfWeek];
		}
	}

	filterByLocation(item, location) {
		if (location && location !== 'any') {
			return item.location.city.toLowerCase() === location.toLowerCase();
		}
		return true;
	}

	ngOnDestroy() {
		this.eventSubscription.unsubscribe();
	}
}
