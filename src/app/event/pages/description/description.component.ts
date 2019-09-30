import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from 'src/app/core/models/event.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  public event:Observable<Event>;
  public eventObject: Event;
  constructor(private HttpServiceEvents: HttpServiceEvents) {
  }

  ngOnInit() {
    this.event = this.HttpServiceEvents.getEvent('clean')
  }

}
