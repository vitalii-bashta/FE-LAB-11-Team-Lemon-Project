import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../../core/models/event.model'

@Component({
  selector: 'app-rounded-components',
  templateUrl: './rounded-components.component.html',
  styleUrls: ['./rounded-components.component.scss',]
})
export class RoundedComponent implements OnInit {
  @Input () event:Observable<Event>;
  @Input () content:string;
  constructor() {
  }
  ngOnInit() {  

  }
}
