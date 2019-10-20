import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FilteringService } from '../../services/filtering.service';
import { EventsService } from '../../../home/services/events.service';
import { DefaultFilter } from '../../constants';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
	filtersForm: FormGroup;

	public weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	public availableCategories: string[] = ['any'];
	public availableLocations: string[] = ['any'];
	public initialFilter: any;

	private filtersSubscription: Subscription;

	constructor(private fb: FormBuilder, private filteringService: FilteringService, private router: Router, private eventsService: EventsService) { }

	ngOnInit() {
		this.filtersSubscription = this.filteringService.getFiltersStream().subscribe((filterVal) => {
			this.initialFilter = filterVal;

			this.filtersForm = this.fb.group({
				category: this.initialFilter.category,
				dates: this.fb.group({
					from: this.initialFilter.dates.from,
					to: this.initialFilter.dates.to
				}),
				weekDays: this.fb.group({}),
				location: this.initialFilter.location
			});

			this.weekDays.forEach(item => {
				(<FormGroup>this.filtersForm.controls['weekDays']).addControl(item, new FormControl(this.initialFilter.weekDays[item]));
			});
			console.log(this.initialFilter)
		});

		this.eventsService.getEvents().subscribe((events) => {
			for	(const element in events) {
				if (!this.availableCategories.includes(events[element].category)) {
					this.availableCategories.push(events[element].category)
				}
				if (!this.availableLocations.includes(events[element].location.city)) {
					this.availableLocations.push(events[element].location.city)
				}
			}
		});

	}

	onSubmit() {
		this.filteringService.pushToFiltersStream(this.filtersForm.value);
		this.router.navigateByUrl('/home/events');
	}

	cancelFilters() {
		this.router.navigateByUrl('/home/events');
	}

	setDefaultValue() {
		this.filtersForm.setValue(DefaultFilter);
	}

	ngOnDestroy() {
		this.filtersSubscription.unsubscribe();
	}

}
