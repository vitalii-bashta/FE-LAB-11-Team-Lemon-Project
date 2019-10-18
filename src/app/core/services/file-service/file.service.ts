import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {  
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event: FileList) {
    const file = event.item(0);
    const filePath = `events/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      // mergeMap((character:any) => {
      //   return fileRef.getDownloadURL()
      // }
    finalize(() => {
      fileRef.getDownloadURL().subscribe(url => {
        this.downloadURL = url;      
      })
    })
  ).subscribe(
    (x) => console.log(x),
    (error) => console.error(error)
    );
  }
}
