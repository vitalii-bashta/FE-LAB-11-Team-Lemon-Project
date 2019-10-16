import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, from, combineLatest } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth';
import { mergeMap } from 'rxjs/operators'

import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { HttpServiceUsers } from 'src/app/core/services/http-users.service'
import { Post } from 'src/app/core/models/post.model'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit,OnDestroy {
  public posts$:Observable<Post[]>;
  public user$:Observable<any>;
  public arrayOfFilteredPosts:Array<Post> = [];
  private sub = new Subscription()
  public currentUserEmail$;
  public currentUserEmail:string;
  public currentUser$;
  public keyOfEvent: string;
  constructor(
    private HttpServicePosts:HttpServicePosts,
    private HttpServiceUsers:HttpServiceUsers,
    private route: ActivatedRoute,
    public auth: AngularFireAuth    
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
     });   
    // this.user$ = this.HttpServiceUsers.getUser('mockUser')
    this.posts$ = this.HttpServicePosts.getPosts(`orderBy="forEvent"&equalTo="save"`);

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
      mergeMap((character:any) => {
        this.currentUserEmail = character.email;
        return this.HttpServiceUsers.getUsers(`orderBy="email"&equalTo="${character.email}"`)
    }));
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
