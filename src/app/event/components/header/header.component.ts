import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from 'src/app/core/models/event.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Input() event$;
  public sub = new Subscription()
  public status:string;
  public background:Object;
  public DAY_OF_WEEK:Map<number,string> = new Map([
    [0,'Sunday'],
    [1,'Monday'],
    [2,'Tuesday'],
    [3,'Wednesday'],
    [4,'Thursday'],
    [5,'Friday'],
    [6,'Saturday']
    ])
    public NAME_OF_MONTH:Map<number,string> = new Map([
      [0,'Jan'],
      [1,'Feb'],
      [2,'Mar'],
      [3,'Apr'],
      [4,'May'],
      [5,'Jun'],
      [6,'Jul'],
      [7,'Aug'],
      [8,'Sep'],
      [9,'Oct'],
      [10,'Nov'],
      [11,'Dec']
    ])  

  dateFormat(elem):string{
    const date = new Date(elem)
    const currentDate = new Date();
    const minutes = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes();
    if (date<currentDate) {
      return `finished on ${this.DAY_OF_WEEK.get(date.getDay())},${this.NAME_OF_MONTH.get(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`
    } else {
      return ` ${this.DAY_OF_WEEK.get(date.getDay())},${this.NAME_OF_MONTH.get(date.getMonth())} ${date.getDate()} ${date.getFullYear()}
      ${date.getHours()}:${minutes}`
    }
  }

  constructor() { }
  ngOnInit() {
    console.log(this.event$)
    this.sub.add(this.event$.subscribe(
      (event:Event) => {
        this.status = this.dateFormat(event.date)
        this.background = {
          'backgroundImage': `url(${event.urlImage})`
        }
      }
    ))
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
