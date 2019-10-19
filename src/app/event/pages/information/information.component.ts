import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, from, forkJoin, combineLatest } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser';
import { share } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router'

import { Event } from 'src/app/core/models/event.model'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { User } from 'src/app/core/models/user.model'
import { HttpServiceUsers } from 'src/app/core/services/http-users.service'


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit,OnDestroy {
  public event$:Observable<any>;
  public amountOfMembers: string;
  public currentUserEmail$;
  public currentUserEmail:string;
  public currentUser$;
  public partSircle: Object;
  public keyOfEvent: string;
  public isEventFinished: boolean;
  public subs: Subscription = new Subscription();
  members(currentNumber:number,needVolunteers:number):string {
    if (typeof needVolunteers === 'string') {
      return 'unlimited'
    }
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
  constructor(
    private HttpServiceEvents: HttpServiceEvents,
    private HttpServiceUsers: HttpServiceUsers,
    public sanitizer: DomSanitizer,
    public auth: AngularFireAuth,
    private route: ActivatedRoute
    ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
      this.event$ = this.HttpServiceEvents.getEvent(params.get('key')).pipe(
        share()
      )
     }); 
    this.currentUserEmail$ = this.auth.user;
    this.currentUser$ = this.currentUserEmail$.pipe(
      share(),
      mergeMap((character:any) => {
        return this.HttpServiceUsers.getUsers(`orderBy="email"&equalTo="${character.email}"`)
      }
    ));
    // combineLatest(this.currentUser$,this.event$).subscribe(
    //   (results)=>{
    //     console.log(results[0])
    //     console.log(results[1])
        
    //   }
    // )
    this.subs.add(this.event$.subscribe(res => {
      if(!res.members) {
        this.amountOfMembers = this.members(0,res.amountOfVolunteers)
        this.partSircle = this.calcPartOfSircle(0,res.amountOfVolunteers)
      } else {
        this.amountOfMembers = this.members(res.members.length,res.amountOfVolunteers)
        this.partSircle = this.calcPartOfSircle(res.members.length,res.amountOfVolunteers)
      }
    }));
  }  
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
