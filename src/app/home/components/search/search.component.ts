import { Component, OnInit } from '@angular/core';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  ngOnInit() {}

  searchFieldChanged(event) {
      this.eventsService.pushDataUpdated(`orderBy="eventName"&startAt="${event.target.value}"`)
  }

}
