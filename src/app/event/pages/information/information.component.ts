import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription,from } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core';
import { share } from 'rxjs/operators'


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
  public event$:Observable<Event>;
  public amountOfMembers: String;
  public partSircle: Object;
  public subs: Subscription = new Subscription();
  public currentUser:Observable<any>; 
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
  constructor(
    private HttpServiceEvents: HttpServiceEvents,
    public sanitizer: DomSanitizer,
    public auth: AuthenticationService,
    // private HttpServiceUsers:HttpServiceUsers
    ) {}
  ngOnInit() {
    this.currentUser = this.auth.afAuth.user.pipe(
      share()
    )
    this.event$ = this.HttpServiceEvents.getEvent('clean').pipe(
      share()
    )
    // this.HttpServiceUsers.pushUser({
    //   body: "quia et suscipit\nsuscipit recusandae consequunt...",
    //   id: 50,
    //   title: "sunt aut facere repellat provident occaecati ex...",
    //   userId: 1
    // }
    // ).subscribe({
    //   next:user => console.log(user)
    // })
    this.subs.add(this.event$.subscribe(res => {
      console.log(res)
      this.amountOfMembers = this.members(res.members.length,res.needVolunteers)
      this.partSircle = this.calcPartOfSircle(res.members.length,res.needVolunteers)
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
