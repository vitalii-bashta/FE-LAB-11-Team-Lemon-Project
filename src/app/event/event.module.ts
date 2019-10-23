import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AddCommentComponent } from './components/add-comment/add-comment.component'
import { 
  MatExpansionModule, 
  MatButtonModule 
} from '@angular/material';
import { SlideshowModule } from 'ng-simple-slideshow';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventComponent } from './event.component';
import { LocationComponent } from './components/location/location.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RoundProgresBarComponent } from './components/round-progres-bar-component/round-progres-bar.component';
import { InformationComponent } from './pages/information/information.component';
import { DescriptionComponent } from './pages/description/description.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/posts/posts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { JoinComponent } from './components/join/join.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { FooterEventComponent } from './components/footer-event/footer-event.component'


const routes : Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'information'},
      { path: 'description/:key', component: DescriptionComponent },
      { path: 'information/:key', component: InformationComponent },
      { path: 'discussion/:key', component: DiscussionComponent } 
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
    GalleryComponent,
    HeaderComponent,
    PostComponent,
    AddCommentComponent,
    AccordionComponent,
    TopNavigationComponent,
    JoinComponent,
    AddPhotoComponent,
    DeleteButtonComponent,
    FooterEventComponent,
  ],
  imports: [
    DragDropModule,
    CommonModule,
    SlideshowModule,
    MatExpansionModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    DragDropModule
  ],
  bootstrap: [EventComponent]
})
export class EventModule { }