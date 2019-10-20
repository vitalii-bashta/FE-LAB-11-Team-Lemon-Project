import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {  
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event: FileList) {

    const file = event.item(0);
    const path = `events/${new Date().getTime()}_${file.name}`; 
    const storageRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    return from(task).pipe(
      switchMap(() => storageRef.getDownloadURL()),
      tap(url => {
          this.downloadURL = url;
      })
    )
  }
}
