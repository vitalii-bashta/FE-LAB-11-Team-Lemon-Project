import { Component, OnInit } from '@angular/core';
import { HttpServiceEvents } from '../../services/http-service.events'
import { HttpServiceUsers } from '../../services/http-service.users'
import { from } from 'rxjs';


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
  // constructor(private httpEvents: HttpServiceEvents,private httpUsers: HttpServiceUsers) { }
  ngOnInit() {
    // this.httpEvents.getEvents().subscribe({
    //   next:users => console.log(users)
    // })
    // this.httpUsers.deleteUser('6').subscribe({
    //   next:user => console.log(user)
    // })
    // this.httpUsers.getUser('5').subscribe({
    //   next:user => console.log(user)
    // })
    
    // this.http.pushUser(this.fakeData).subscribe({
    //   next:user => console.log(user)
    // })
    // this.http.updateEvents('3',this.fakeData).subscribe({
    //   next:user => console.log(user)
    // })
  }

}
