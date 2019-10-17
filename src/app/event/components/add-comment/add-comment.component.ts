import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { Url } from 'url';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() user$;
  @Input() email;
  public currentUser:User;
  public eventKey:string = 'clean'; 
  event$:Observable<Event>  
  public post:Post;
  public avatar:Url;
  constructor(private HttpServicePosts:HttpServicePosts, private HttpServiceEvents:HttpServiceEvents) { }
  send() {
    if(!this.post.body) {
      alert('please enter text')
      return;
    }
    this.HttpServicePosts.pushPost(this.post).subscribe(
      (result)=> {
        console.log(result)
      }
    )
  }
  ngOnInit() {
    this.post = {
      body: '',
      forEvent: 'clean',
      keyOfOwner: this.email,
      time: (new Date()).toISOString(),
      user: {
        avatar: 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6',
        userName: this.email            
      }
    }    
    this.event$ = this.HttpServiceEvents.getEvent(this.eventKey);
    combineLatest(this.user$,this.event$).subscribe(
      (result:Array<any>)=>{
        for (const key in result[0]) {
          if (result[0].hasOwnProperty(key)) {
            this.currentUser = result[0][key];
          }
        }
        this.post = {
          body: '',
          forEvent: this.eventKey,
          keyOfOwner: this.currentUser.email,
          time: (new Date()).toISOString(),
          user: {
            avatar: this.currentUser.avatarUrl || 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ,
            userName: this.currentUser.name || this.email           
          }
        }        
      }
      
    )
  }
}
