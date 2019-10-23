import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { Event } from 'src/app/core/models/event.model'
import { User } from 'src/app/core/models/user.model'

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit,OnDestroy {
  @Input() keyOfEvent:string;
  @Input() event$;
  @Input() currentUser$;
  public isEventFinished:boolean;
  public isManagerOnthePage:boolean;
  public addDeleteButton:boolean;
  private sub = new Subscription();

  constructor(
    private HttpServiceEvents:HttpServiceEvents
  ) { }
  delete() {
    this.sub.add(
      this.HttpServiceEvents.deleteEvent(this.keyOfEvent).subscribe()
    )
  }
  ngOnInit() {
    this.sub.add(
      combineLatest(this.currentUser$,this.event$).subscribe(
        (results:[User,Event])=>{
          for (const key in results[0]) {
            if (results[0].hasOwnProperty(key)) {
              this.isEventFinished = new Date(results[1].date)>(new Date())
              this.isManagerOnthePage = results[0][key].email === results[1].manager.email;
              this.addDeleteButton = this.isManagerOnthePage && this.isEventFinished
            }
          }
        }
      ) 
    )
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
