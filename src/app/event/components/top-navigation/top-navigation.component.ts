import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

import { Event } from 'src/app/core/models/event.model'
import { User } from 'src/app/core/models/user.model'

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  @Input () keyOfEvent:string;
  @Input() eventDate:Date;
  @Input() event$;
  @Input() currentUser$;
  public isEventFinished:boolean;
  public isManagerOnthePage:boolean;
  public addEditButton:boolean;
  constructor() { }

  ngOnInit() {
    this.isEventFinished = !(new Date(this.eventDate)<(new Date()))
    combineLatest(this.currentUser$,this.event$).subscribe(
      (results:[User,Event])=>{
        for (const key in results[0]) {
          if (results[0].hasOwnProperty(key)) {
            this.isManagerOnthePage = results[0][key].email === results[1].manager.email;
            this.addEditButton = this.isManagerOnthePage && !this.isEventFinished
          }
        }
      }
    )    
  }
}