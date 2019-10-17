import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { FileService, HttpServiceEvents } from 'src/app/core';
import { Event } from 'src/app/core/models/event.model'

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit {

  volunteersQty: number = 60;
  volunteersReq: any;
  volunteersOrg: string;
  gmUrl: string;
  time: string = "00:00";
  date: string = new Date().toISOString().substring(0, 10);
  navigation = this.router.getCurrentNavigation();
  state = this.navigation.extras.state;
  urlStatus: boolean = false;

  addEventsForm = this.fb.group({
    eventName: [''],
    eventPhoto: [''],
    eventCategory: [{value: '', disabled: true}],
    phoneContacts: ['',[Validators.required]],
    emailContacts: ['', [Validators.required, Validators.email]],
    eventDate:  [''],
    eventTime: [''],
    eventCity: ['',[Validators.required]],
    eventStreet: ['',[Validators.required]],
    googleMaps: [''],
    googleMapsUrl: [''],
    volunteersQuantity: [''],
    eventDescription: [''],
    eventSchedule: [''],
    eventFromOrganization: [''],
    eventOrganization: [''],
  });

  constructor(
    private fb: FormBuilder,
    private fs: FileService,
    private es: HttpServiceEvents,
    private router: Router
  ) {}

  ngOnInit() {}

  minusVolunteers(){
    this.volunteersQty -= 1;
  }

  plusVolunteers(){
    this.volunteersQty += 1;
  }

  submit(value){
    if (value.volunteersQuantity){
      this.volunteersReq = 'unlimited';
    } else {
      this.volunteersReq = this.volunteersQty;
    };

    if (value.eventFromOrganization){
      this.volunteersOrg = value.eventOrganization;
    };

    if (value.googleMaps){
      this.gmUrl = value. googleMapsUrl;
    }
    
    let evDate = value.eventDate || this.date;
    let evTime = value.eventTime || this.time;

    const event: Event = {
      id: `${new Date().getTime()}`,
      eventName: value.eventName,
      amountOfVolunteers: this.volunteersReq,
      organization: this.volunteersOrg,
      manager: '',
      category: this.state.category,
      location: {
        city: value.eventCity,
        street: value.eventStreet,
        url: this.gmUrl,
      },      
      urlImage: this.fs.downloadURL,
      date: evDate + 'T' + evTime,
      contacts: {
        email: value.emailContacts,
        phone: value.phoneContacts
      },
      aboutEvent: value.eventDescription,
      schedule: value.eventSchedule
    }
    console.log(event)

    this.es.pushEvent(event).subscribe()
    this.router.navigate(['home']);
  }

}
