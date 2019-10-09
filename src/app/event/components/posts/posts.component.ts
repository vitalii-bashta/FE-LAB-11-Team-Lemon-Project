import { Component, OnInit } from '@angular/core';

// import { Post } from 'src/app/core/models/post.model'

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostComponent implements OnInit {
  public fakePost= {
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    id:2,
    title:"title 2",
    userName: "Roman",
    date: {
      month: 'dec',
      day: '1',
    },
    time: {
      hours: 20,
      minutes: 30
    }
  }
  constructor() { }

  ngOnInit() {
  }
}