import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { share } from 'rxjs/operators';

import { Event } from 'src/app/core/models/event.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  public event$:Observable<Event>;
  
  constructor(private HttpServiceEvents: HttpServiceEvents) {
  }
  showAndHideContent($event):void {  
    if ($event.target.parentNode.style.height!=='auto') {
      $event.target.parentNode.style.height = 'auto'
    } else {
      $event.target.parentNode.style.height='150px'
    }
  }
  ngOnInit() {
    this.event$ = this.HttpServiceEvents.getEvent('clean').pipe(
      share()
    )
  }

}
