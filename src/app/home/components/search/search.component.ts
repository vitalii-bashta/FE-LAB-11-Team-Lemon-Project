import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EventsService } from '../../services/events.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@ViewChild('input', {static: false}) input: ElementRef
	constructor(private eventsService: EventsService) { }

	ngOnInit() {}

	searchFieldChanged(event) {
		this.eventsService.pushToSearchStream(event.target.value);
	}

	ngAfterViewInit() {

	}

	onCancel(): void {
		this.input.nativeElement.value = '';
		this.eventsService.pushToSearchStream('');
	}
}
