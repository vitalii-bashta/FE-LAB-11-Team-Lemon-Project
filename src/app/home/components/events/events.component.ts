import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { EventData } from '../../models/index';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public events: EventData[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEventsFromDb().subscribe((value) => {
      this.events = value;
    })
    
  }
}
