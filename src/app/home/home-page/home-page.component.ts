import { Component, OnInit } from '@angular/core';
import { HttpServiceEvents } from '../../core/services/http-service.events'
import { HttpServiceUsers } from '../../core/services/http-service.users'
import { from } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  ngOnInit() {
    
  }

}
