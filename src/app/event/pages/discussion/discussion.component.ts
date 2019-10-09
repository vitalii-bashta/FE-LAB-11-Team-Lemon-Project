import { Component, OnInit } from '@angular/core';
import { Observable, Subscription,from } from 'rxjs'

import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { Post } from 'src/app/core/models/post.model'

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  public posts$:Observable<Post[]>;
  constructor(private HttpServicePosts:HttpServicePosts) { }

  ngOnInit() {
    this.posts$ = this.HttpServicePosts.getPosts()
  }

}
