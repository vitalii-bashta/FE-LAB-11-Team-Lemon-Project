import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../../core/models/event.model'

@Component({
  selector: 'app-round-progress-bar',
  templateUrl: './round-progres-bar.component.html',
  styleUrls: ['./round-progres-bar.component.scss',]
})
export class RoundProgresBarComponent implements OnInit {
  @Input () event:Observable<Event>;
  @Input () content:string;
  constructor() {
  }
  ngOnInit() {  

  }
}
