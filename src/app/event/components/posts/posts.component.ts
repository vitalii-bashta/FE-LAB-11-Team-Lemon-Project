import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/core/models/post.model'

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:Post;
  @Input() user:string;
  public postDate:string;
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
    const minutes = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes(); 
    return `${this.DAY_OF_WEEK.get(date.getDay())},${this.NAME_OF_MONTH.get(date.getMonth())} ${date.getDate()} ${date.getFullYear()}
    ${date.getHours()}:${minutes}`
  }
  constructor() { }

  ngOnInit() {
    this.postDate = this.dateFormat(this.post.time)
  }
}