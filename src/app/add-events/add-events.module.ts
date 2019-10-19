import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEventsComponent } from './add-events.component';
import { AddEventsRoutingModule } from './add-events.routing.module';
import { CategoryPageComponent } from './category-page/category-page.component'

@NgModule({
  declarations: [
    AddEventsComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddEventsRoutingModule,
  ]
})
export class AddEventsModule { }