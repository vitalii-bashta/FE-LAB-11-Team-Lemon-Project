import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, from, combineLatest } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth';
import { mergeMap, share } from 'rxjs/operators'

import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { HttpServiceUsers } from 'src/app/core/services/http-users.service'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { Post } from 'src/app/core/models/post.model'
import { Event } from 'src/app/core/models/event.model'
import { User } from 'src/app/core/models/user.model'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit,OnDestroy {
  public posts$:Observable<Post[]>;
  public user$:Observable<User>;
  public event$:Observable<Event>
  public arrayOfFilteredPosts:Array<Post> = [];
  private sub = new Subscription()
  public currentUserEmail$;
  public currentUserEmail:string;
  public currentUser$;
  public keyOfEvent: string;
  public date: string
  constructor(
    private HttpServicePosts:HttpServicePosts,
    private HttpServiceUsers:HttpServiceUsers,
    private HttpServiceEvents:HttpServiceEvents,
    private route: ActivatedRoute,
    public auth: AngularFireAuth    
  ) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      share()
    )
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
     });   
    this.event$ = this.HttpServiceEvents.getEvent(this.keyOfEvent).pipe(
      share()
    )
    this.event$.subscribe (
      (event) => {
        this.date = event.date
      }
    )
    this.posts$ = this.HttpServicePosts.getPosts(`orderBy="forEvent"&equalTo="${this.keyOfEvent}"`);
    this.sub.add(this.posts$.subscribe(
      (elem)=>{
        for (const item in elem) {
          if (Object.prototype.hasOwnProperty.call(elem, item)) {
            this.arrayOfFilteredPosts.push(elem[item]);
          }
        }
        this.arrayOfFilteredPosts.sort((a:Post,b:Post) => {
          if(a.time < b.time) {
            return 1
          } else {
            return -1
          }
        })
      }
    ))
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
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
