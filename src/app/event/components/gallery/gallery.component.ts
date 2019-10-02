import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/event.model'


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() event:Observable<Event>
  constructor() { }

  ngOnInit() {
    console.log(event)
  }

}
