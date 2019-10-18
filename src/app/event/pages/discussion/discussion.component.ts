import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription,from } from 'rxjs'

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
  public keyOfEvent: string;
  constructor(
    private HttpServicePosts:HttpServicePosts,
    private HttpServiceUsers:HttpServiceUsers,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
     });     
    this.user$ = this.HttpServiceUsers.getUser('mockUser')
    this.posts$ = this.HttpServicePosts.getPosts(`orderBy="keyOfOwner"&startAt="romasaldan@gmail.com"`)
    this.sub.add(this.posts$.subscribe(
      (elem)=>{
        for (const item in elem) {
          if (Object.prototype.hasOwnProperty.call(elem, item)) {
            this.arrayOfFilteredPosts.push(elem[item]);
          }
        }
      }
    ))
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
