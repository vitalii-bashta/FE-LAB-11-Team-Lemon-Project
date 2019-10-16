import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';
import { Event } from '../../../core/index'

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
	public events: Event[] = [];
	private eventSubscription: Subscription;

	constructor(private eventsService: EventsService) { }

	ngOnInit() {
		this.eventSubscription = this.eventsService.getSearchedEvents().subscribe((value) => {
            this.events = [];
			for	(const element in value) {
				this.events.push(value[element])
			}
		})
	}

	ngOnDestroy() {
		this.eventSubscription.unsubscribe()
	}
}
