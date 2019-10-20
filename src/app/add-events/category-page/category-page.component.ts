import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  private _previousUrl: string;
  private _currentUrl: string;
  categoriesForm = this.fb.group({
    categoryName: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { 
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this._setURLs(event);
    });
   }

  ngOnInit() {
  }

  private _setURLs(event: NavigationEnd): void {
    this._currentUrl = event.urlAfterRedirects;
    this._previousUrl = this._currentUrl.slice(0, -11);
  }

  submit(value) {
    this.router.navigateByUrl(this._previousUrl, { state: { category: value.categoryName } });
  }

}
