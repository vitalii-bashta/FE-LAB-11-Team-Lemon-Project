import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  key: string;
  constructor(public _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.key = this._authenticationService.getUser().providerData[0].uid;
  }

}
