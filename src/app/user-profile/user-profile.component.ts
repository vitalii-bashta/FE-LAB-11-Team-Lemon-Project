import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isActive = true;
  public fullName = "Robin Smith";
  userData : User;
  

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  showInformation() {
    this.router.navigate(['information'], {relativeTo: this.route});
    this.isActive = false;
  }
  showOrganization() {
    this.router.navigate(['organization'], {relativeTo: this.route});
    this.isActive = false;
  }
  showFeedback() {
    this.router.navigate(['feedback'], {relativeTo: this.route});
    this.isActive = false;
  }

}
