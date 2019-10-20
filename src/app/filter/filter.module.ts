import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FilterComponent } from '../filter/components/filter/filter.component';
import { FilterRoutingModule } from './filter.routing.module';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterRoutingModule
  ]
})
export class FilterModule { }
