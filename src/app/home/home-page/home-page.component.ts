import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http-service'

import { Event } from '../../core/models/event.model'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // :Observable<User[]>
  public fakeData ={
    body: "quia et suscipit\nsuscipit recusandae consequunt...",
    id: 50,
    title: "sunt aut facere repellat provident occaecati ex...",
    userId: 1
  }
  constructor(private http: HttpService) { }
  private courses$
  ngOnInit() {
    this.http.getEvents().subscribe({
      next:users => console.log(users)
    })
    this.http.deleteEvents('3').subscribe({
      next:user => console.log(user)
    })
    this.http.getEvent('4').subscribe({
      next:user => console.log(user)
    })

    // this.http.pushUser(this.fakeData).subscribe({
    //   next:user => console.log(user)
    // })
    this.http.updateEvents('3',this.fakeData).subscribe({
      next:user => console.log(user)
    })
  }

}
