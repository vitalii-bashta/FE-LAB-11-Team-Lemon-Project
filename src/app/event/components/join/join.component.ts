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
    if (!this.user) {
      alert('Please Log In')
      return 
    }
    if(!!this.event.members) {
      if(!this.event.members.emails.includes(this.user.email)) {
        this.event.members.emails.push(this.user.email)
        this.event.members.photos.push(this.user.avatarUrl)
      } else {
        this.event.members.emails = this.event.members.emails.filter((elem:string):boolean => {
          return elem !== this.user.email;
        })
        this.event.members.photos = this.event.members.photos.filter((elem:string):boolean => {
          return elem !== this.user.avatarUrl;
        })
      }
    } else {
      this.event.members = {
        emails:[this.user.email],
        photos: [this.user.avatarUrl]
      }
    }
    this.HttpServiceEvents.updateEvent(this.keyOfEvent,this.event).subscribe(
      (res) => {
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
        if(this.event.members !== undefined) {
          if(this.event.members.emails.includes(this.user.email)) {
            this.status = 'Leave the event'
          } 
        }
      }
    )    
  }
}
