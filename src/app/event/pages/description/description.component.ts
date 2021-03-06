import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators'

import { Event } from 'src/app/core/models/event.model'
import { User } from 'src/app/core/models/user.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { HttpServiceUsers } from 'src/app/core/services/http-users.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router'



@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit,OnDestroy {
  public event$:Observable<Event>;
  public currentUser$:Observable<User>;
  public currentUserEmail$;
  public currentUserEmail: string;
  public date: string;
  public titleCanHelp:string = 'How can I help';
  public titleAboutEvent:string = 'About Event'; 
  public titlewhatDoINeed:string = 'What do i need';
  public titleSchedule:string = 'Schedule'; 
  public titleAboutOrganization:string = 'About organization';
  public isOpened:boolean = true;
  public schedule:string;
  private sub: Subscription = new Subscription()
  public keyOfEvent: string;
  public DAY_OF_WEEK:Map<number,string> = new Map([
    [0,'Sunday'],
    [1,'Monday'],
    [2,'Tuesday'],
    [3,'Wednesday'],
    [4,'Thursday'],
    [5,'Friday'],
    [6,'Saturday']
  ])
  public NAME_OF_MONTH:Map<number,string> = new Map([
    [0,'January'],
    [1,'February'],
    [2,'March'],
    [3,'April'],
    [4,'May'],
    [5,'June'],
    [6,'July'],
    [7,'August'],
    [8,'September'],
    [9,'October'],
    [10,'November'],
    [11,'December']
  ])

  doSchedule(arr:Array<string>):string{
    let str = ''
    for(let i:number=0;i<arr.length;i++) {
      const date = new Date(arr[i])
      str += 
      `
      ${this.DAY_OF_WEEK.get(date.getDay())},${this.NAME_OF_MONTH.get(date.getMonth())} ${date.getMonth()} ${date.getFullYear()}
      ${date.getHours()}:${date.getMinutes()}
      `
    }
    return str
  }
  constructor(
    private HttpServiceEvents: HttpServiceEvents,
    private HttpServiceUsers: HttpServiceUsers,
    private route: ActivatedRoute,
    public auth: AngularFireAuth,
    ) {
  }
  ngOnInit() {
    this.currentUserEmail$ = this.auth.user;
    this.currentUser$ = this.currentUserEmail$.pipe(
      share(),
      mergeMap((character:any) => {
        if(character) {
          this.currentUserEmail = character.email;
        } else {
          this.currentUserEmail = 'anonym'
        }
        return this.HttpServiceUsers.getUsers(`orderBy="email"&equalTo="${this.currentUserEmail}"`).pipe(
          share()
        )
    })).pipe(
      share()
    );    
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
    });    
    this.event$ = this.HttpServiceEvents.getEvent(this.keyOfEvent).pipe(
      share()
    )
    this.sub.add(this.event$.subscribe(
      (element) => {
        this.date = element.date;
        this.schedule = this.doSchedule(element.schedule);      
      }
    ))
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
