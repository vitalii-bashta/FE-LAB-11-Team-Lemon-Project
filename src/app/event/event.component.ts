import { Component, OnInit, NgModule } from '@angular/core';
import { Observable, from } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser';



import { Event } from '../core/models/event.model'
import { HttpServiceEvents } from '../core/services/http-events.service'
import { User } from '../core/models/user.model'
import { HttpServiceUsers } from '../core/services/http-users.service'



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss',

]
})
export class EventComponent implements OnInit {
  public event:Observable<Event>;
  constructor(private HttpServiceEvents: HttpServiceEvents) {}
  ngOnInit() {
    this.event = this.HttpServiceEvents.getEvent('clean')
  }
}
