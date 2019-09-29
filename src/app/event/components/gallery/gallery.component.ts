import { Component, OnInit, Input,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/event.model'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  imports: [BrowserModule, DragDropModule],
  exports: [DragDropModule],

})

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() event:Observable<Event>
  constructor() { }

  ngOnInit() {
  }

}
