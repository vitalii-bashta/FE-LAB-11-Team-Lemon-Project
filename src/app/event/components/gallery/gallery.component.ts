import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/event.model'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  public position:string = 'center center';
  public repeat:string = 'no-repeat';
  imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/Screenshot_55.png?alt=media&token=45661b0b-6de1-4370-9066-67e215392fcc',
    'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/Screenshot_55.png?alt=media&token=45661b0b-6de1-4370-9066-67e215392fcc',
    'https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/Screenshot_55.png?alt=media&token=45661b0b-6de1-4370-9066-67e215392fcc',  
  ];
  @Input() event$:Observable<Event>
  constructor() {}
  ngOnInit() {
  }
}
