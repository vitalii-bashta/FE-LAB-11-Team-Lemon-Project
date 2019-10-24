import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { HttpServiceEvents } from './../http-events.service'

import { Event } from './../../models/event.model'

@Injectable({
  providedIn: 'root'
})
export class FileServiceEvents {  
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private HttpServiceEvents:HttpServiceEvents) { }

  uploadFileToGallery(
      event: FileList,
      path:string,
      length:number,
      firebaseEvent:Event,
      keyOfEvent:string) {
    const file = event.item(0);
    const format:string = event.item(0).name.slice(event.item(0).name.lastIndexOf('.'))
    const filePath = `events/${path}/${length}${format}`;
    const fileRef = this.storage.ref(filePath);
    let urlNew:string;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe(url => {
        this.downloadURL = url;
        if(firebaseEvent.assignedPhotos) {
          firebaseEvent.assignedPhotos.push(url)
        } else {
          firebaseEvent.assignedPhotos = [url]
        }
        this.HttpServiceEvents.updateEvent(keyOfEvent,firebaseEvent).subscribe()
      })
    })
  ).subscribe(
    );
  }
}
