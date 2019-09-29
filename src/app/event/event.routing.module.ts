import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router'

import { EventComponent } from './event.component';
import { LocationComponent } from './components/location/location.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RoundProgresBarComponent } from './components/round-progres-bar-component/round-progres-bar.component';
import { InformationComponent } from './pages/information/information.component';
import { DescriptionComponent } from './pages/description/description.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
// import { FooterComponent } from 'src/app/home/components/footer/footer.component';
import { GalleryComponent } from './components/gallery/gallery.component'

import { DragDropModule } from '@angular/cdk/drag-drop'

const routes : Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'information', pathMatch: 'full'},
      { path: 'description', component: DescriptionComponent },
      { path: 'information', component: InformationComponent },
      { path: 'discussion', component: DiscussionComponent } 
		]
  },
]
@NgModule({
  declarations: [
    EventComponent,
    LocationComponent,
    ContactsComponent,
    RoundProgresBarComponent,
    InformationComponent,
    DescriptionComponent,
    DiscussionComponent,
    // FooterComponent,
    GalleryComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    DragDropModule
  ]
})
export class EventRoutingModule { }