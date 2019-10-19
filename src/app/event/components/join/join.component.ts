import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { Event } from "src/app/core/models/event.model";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  @Input() event$:Observable<Event>
  @Input() currentUser$:Observable<User>
  @Input() keyOfEvent:string;
  public event:Event;
  public user:User;
  public status:string = 'Join the event';
  public isDisabled:boolean = true;
  constructor(public HttpServiceEvents:HttpServiceEvents) { }
  join() {
    if(!this.event.members.includes(this.user.email)) {
      this.event.members.push(this.user.email)
    } else {
      this.event.members = this.event.members.filter((elem:string):boolean => {
        return elem != this.user.email;
      })
    }
    this.HttpServiceEvents.updateEvent(this.keyOfEvent,this.event).subscribe(
      (res) => {
        console.log(res)
        window.location.reload()
      }
    )
  }
  ngOnInit() {
    combineLatest(this.currentUser$,this.event$).subscribe(
      (results)=>{
        for (const key in results[0]) {
          if (results[0].hasOwnProperty(key)) {
            this.user = results[0][key];
          }
        }
        this.event = results[1]
        if(this.event.members.includes(this.user.email)) {
          this.status = 'Leave the event'
        } 
      }
    )    
  }
}
