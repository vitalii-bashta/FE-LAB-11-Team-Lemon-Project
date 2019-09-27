import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public fullName = "Robin Smith";

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  showInformation() {
    this.router.navigate(['information'], {relativeTo: this.route});
  }
  showOrganization() {
    this.router.navigate(['organization'], {relativeTo: this.route});
  }
  showFeedback() {
    this.router.navigate(['feedback'], {relativeTo: this.route});
  }

}
