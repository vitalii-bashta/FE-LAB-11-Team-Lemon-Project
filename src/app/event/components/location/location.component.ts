import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{
  @Input() event: Observable<Event>;
  public url:string;
  // public eventObject: Event;
  // public subs = new Subscription()
  constructor(public sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    // this.subs.add(event.subscribe({
    //   next:event=> {this.eventObject = event
    //   console.log(this.eventObject)}
    // }))
  }
  // ngOnDestroy() {
  //   this.subs.unsubscribe()
  // }

}
