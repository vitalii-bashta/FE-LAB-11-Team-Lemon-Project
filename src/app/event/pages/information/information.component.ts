import { Component, OnInit, NgModule } from '@angular/core';
import { Observable, from } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser';



import { Event } from 'src/app/core/models/event.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { User } from 'src/app/core/models/user.model'
import { HttpServiceUsers } from 'src/app/core/services/http-users.service'


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss',

]
})
export class InformationComponent implements OnInit {
  public event:Observable<Event>;
  public eventObject: Event;
  members(currentNumber:number,needVolunteers:number):string {
    if (!currentNumber || !needVolunteers) {
      return '';
    }
    if (currentNumber===needVolunteers) {
      return `${currentNumber}`;
    } else {
      return `${currentNumber}/${needVolunteers}`
    }
  }
  calcPartOfSircle(currentNumber:number,needVolunteers:number):object {
    if (currentNumber && needVolunteers) {
      let degree:number = Math.round(90+currentNumber/needVolunteers*360);
      if (currentNumber/needVolunteers<0.5) {        
        return  {'background-image': `linear-gradient(${degree}deg, transparent 50%, #F9F9F9  50%),
        linear-gradient(90deg, #F9F9F9 50%, transparent 50%) ` }
      } else if (currentNumber/needVolunteers>0.5) {
        return  {
          'background-color':'#f9f9f9',
          'background-image': `linear-gradient(${degree-180}deg, transparent 50%, #E5465D  50%),
        linear-gradient(270deg, #E5465D 50%, transparent 50%) ` }
      } else if (currentNumber/needVolunteers===0.5) {
        return  {
          'background-image': `linear-gradient(270deg, transparent 50%, #F9F9F9  50%),
        linear-gradient(90deg, #F9F9F9 50%, transparent 50%) ` }
      }
    }
  }
  constructor(private HttpServiceEvents: HttpServiceEvents,public sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.event = this.HttpServiceEvents.getEvent('clean')
  }
}
