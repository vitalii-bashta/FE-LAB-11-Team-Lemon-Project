import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { FileServiceEvents } from "src/app/core/services/file-service/file-service-events";
import { Observable } from 'rxjs';

import { Event } from 'src/app/core/models/event.model'
import { FileService } from 'src/app/core';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit, OnDestroy {
  @Input() event$:Observable<Event>
  @Input() keyOfEvent:string;
  public event;
  public path:string;
  public newPath: string;
  public downloadURL:string;
  
  constructor(
    private fs: FileServiceEvents
  ) { }
  uploadFile(file) {
    this.path = `${this.keyOfEvent}/gallery/`
    let length:number = 0;
    if(this.event.assignedPhotos) {
      length = this.event.assignedPhotos.length;
    }
    this.fs.uploadFileToGallery(file,this.path,length,this.event,this.keyOfEvent)
  }
  ngOnInit() {
    this.event$.subscribe(
      (event) => {
        this.event = event;
      }
    )
  }
  ngOnDestroy() {

  }

}
