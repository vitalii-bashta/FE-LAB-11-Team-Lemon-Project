import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEventsComponent } from './add-events.component';
import { CategoryPageComponent } from './category-page/category-page.component'

const routes: Routes = [
	{ 
    path: '', component: AddEventsComponent
  },
  { 
    path: 'categories', component: CategoryPageComponent
  }
];

@NgModule({
      imports: [
        RouterModule.forChild(routes),
      ],
      exports: [RouterModule]
})
export class AddEventsRoutingModule { }