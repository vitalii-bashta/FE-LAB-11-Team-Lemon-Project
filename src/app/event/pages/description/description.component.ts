import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators'

import { Event } from 'src/app/core/models/event.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  public event$:Observable<Event>;
  public titleCanHelp:string = 'How can I help';
  public titleAboutEvent:string = 'About Event'; 
  public titlewhatDoINeed:string = 'What do i need'; 
  public titleSchedule:string = 'Schedule'; 
  public titleAboutOrganization:string = 'About organization';
  public isOpened:boolean = true;
  public schedule:string;
  constructor(private HttpServiceEvents: HttpServiceEvents) {
  }
  ngOnInit() {
    this.event$ = this.HttpServiceEvents.getEvent('clean').pipe(
      share()
    )
  }
}
