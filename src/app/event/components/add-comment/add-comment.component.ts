import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HttpServicePosts } from 'src/app/core/services/http-posts.service'
import { HttpServiceEvents } from 'src/app/core/services/http-events.service'
import { Post } from 'src/app/core/models/post.model';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() user$;
  @Input() email;
  public eventKey:string = 'save'; 
  event$:Observable<Event>  
  public post:Post = {
    body: '',
    forEvent: '',
    keyOfOwner: '',
    time: '',
    user: {
      avatar: '',
      userName: ''            
    }
  }
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
    this.event$ = this.HttpServiceEvents.getEvent(this.eventKey);
    let date = new Date();
    forkJoin([this.user$,this.event$]).subscribe(
      (result) => {
        this.post = {
          body: '',
          forEvent: this.eventKey,
          keyOfOwner: result[0].email,
          time: date.toISOString(),
          user: {
            avatar: result[0].avatarUrl || 'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6' ,
            userName: result[0].name || this.email           
          }
        }
      }
    )
  }
}
