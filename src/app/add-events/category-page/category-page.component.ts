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
  navigation = this.router.getCurrentNavigation();
  state = this.navigation.extras.state;
  volQty: number = this.state.volunteers;
  button: string = this.state.buttonName;
  evTitle: string = this.state.title;

  categoriesForm = this.fb.group({
    categoryName: [this.state.value.eventCategory]
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

  submit(category) {
    let value = this.state.value;
    value.eventCategory = category.categoryName;
    this.router.navigateByUrl(this._previousUrl, { state: { value, volunteers: this.volQty, buttonName: this.button, title : this.evTitle } }); 
  }

  return(){
    let value = this.state.value;
    let volQty = this.state.volunteers;
    this.router.navigateByUrl(this._previousUrl, { state: { value, volunteers: volQty } }); 
  }

}
