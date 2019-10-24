import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { FileServiceEvents } from "src/app/core/services/file-service/file-service-events";
import { Observable, Subscription } from 'rxjs';

import { Event } from 'src/app/core/models/event.model'
import { User } from 'src/app/core/models/user.model'

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit, OnDestroy {
  @Input() event$:Observable<Event>
  @Input() keyOfEvent:string;
  @Input() currentUser$:Observable<User>
  public event:Event;
  public currentUser:User;
  public path:string;
  public newPath: string;
  public downloadURL:string;
  public sub = new Subscription()
  constructor(
    private fs: FileServiceEvents
  ) { }
  uploadFile(file) {
    if(this.currentUser) {
      if(this.event.members.emails.includes(this.currentUser[Object.keys(this.currentUser)[0]].email)) {
        this.path = `${this.keyOfEvent}/gallery/`
        let length:number = 0;
        if(this.event.assignedPhotos) {
          length = this.event.assignedPhotos.length;
        }
        this.fs.uploadFileToGallery(file,this.path,length,this.event,this.keyOfEvent)
      } else {
        alert(`You can not add photo because you did not join the event`)
      }
    } else {
      alert('Please Log In')
    }
  }
  ngOnInit() {
    this.sub.add(
      this.event$.subscribe(
        (event) => {
          this.event = event;
        }
      )
    )
    if(this.currentUser$) {
      this.sub.add(
        this.currentUser$.subscribe(
          user => {
            this.currentUser = user;
          }
        )
      )
    } 
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
