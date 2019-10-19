import { Component, OnInit,Input } from '@angular/core';
import { combineLatest, Observable, from } from 'rxjs';
import { Url } from 'url';

import { Post } from 'src/app/core/models/post.model';
import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { User } from 'src/app/core/models/user.model'

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() email;
  @Input() user$
  @Input() keyOfEvent;
  public currentUser:User;	  	  
  event$:Observable<Event>  	
  public post:Post;	
  public avatar:Url;
  public keyOfUser: string;	
  constructor(private HttpServicePosts:HttpServicePosts) { 
    this.post = {	
      body: '',	
      forEvent: this.keyOfEvent,	
      keyOfOwner: 'anonym',	
      time: (new Date()).toISOString(),	
      user: {	
        avatar: 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ,	
        userName: 'anonym'           	
      }	
    } 
  }	

  send() {	
    if(!this.post.body) {	
      alert('please enter text')	
      return;	
    }	
    if(this.email==='anonym') {
      alert('Please Log In')
      return
    }
    this.HttpServicePosts.pushPost(this.post).subscribe(	
      (result)=> {	
        window.location.reload()		
      }	
    )
  }	
	ngOnInit() {
    this.user$.subscribe(
      (result:Array<any>)=>{	
        if(Object.keys(result).length === 0 && result.constructor === Object) {
          this.post = {	
            body: '',	
            forEvent: this.keyOfEvent,	
            keyOfOwner: this.email,	
            time: (new Date()).toISOString(),	
            user: {	
              avatar: 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ,	
              userName: this.email           	
            }	
          } 
        } else {
          for (const key in result) {	
            if (result.hasOwnProperty(key)) {
              this.keyOfUser = key  	
              this.currentUser = result[key] || 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ;	
            }	
          }	
          this.post = {	
            body: '',	
            forEvent: this.keyOfEvent,	
            keyOfOwner: this.currentUser.email,	
            time: (new Date()).toISOString(),	
            user: {	
              avatar: this.currentUser.avatarUrl || 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ,	
              userName: this.currentUser.name || this.email           	
            }	
          } 
        }
      })
    }
}
