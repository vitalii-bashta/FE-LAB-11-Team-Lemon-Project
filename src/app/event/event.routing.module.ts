import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router'

import { EventComponent } from './event.component';
import { LocationComponent } from './components/location/location.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RoundProgresBarComponent } from './components/round-progres-bar-component/round-progres-bar.component';


const routes : Routes = [
  {
    path: '',
    component: EventComponent
  },
]
@NgModule({
  declarations: [
    EventComponent,
    LocationComponent,
    ContactsComponent,
    RoundProgresBarComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EventRoutingModule { }