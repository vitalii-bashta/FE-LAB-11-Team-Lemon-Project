import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from 'rxjs';

import { FileService, HttpServiceEvents, HttpServiceUsers, AuthenticationService } from 'src/app/core';
import { Event } from 'src/app/core/models/event.model'

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit, OnDestroy {

  volunteersQty: number = 60;
  volunteersReq: any;
  volunteersOrg: string;
  gmUrl: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5440403.888621737!2d26.689469221549352!3d48.25576773141219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2z0KPQutGA0LDRl9C90LA!5e0!3m2!1suk!2sua!4v1571496801357!5m2!1suk!2sua";
  time: string = "00:00";
  date: string = new Date().toISOString().substring(0, 10);
  navigation = this.router.getCurrentNavigation();
  state = this.navigation.extras.state;
  getcategory: boolean;
  urlStatus: boolean = false;
  keyOfEvent: string;
  coverPhoto: Observable<string>;
  addButton: string = "Create";
  title: string = "New Event";
  private eventSubscription: Subscription;
  managerEmail: string;
  managerName: any;
  
  addEventsForm = this.fb.group({
    eventName: [''],
    eventCategory: [{value: '', disabled: true}],
    phoneContacts: ['', [Validators.required]],
    emailContacts: ['', [Validators.required, Validators.email]],
    eventDate:  [''],
    eventTime: [''],
    eventCity: ['', [Validators.required]],
    eventStreet: ['', [Validators.required]],
    googleMaps: [''],
    googleMapsUrl: [''],
    volunteersQuantity: [''],
    eventDescription: [''],
    eventSchedule: [''],
    eventRequirements: [''],
    eventDetails: [''],
    eventFromOrganization: [''],
    eventOrganization: [''],
  });

  constructor(
    private fb: FormBuilder,
    private fs: FileService,
    private as: AuthenticationService,
    private es: HttpServiceEvents,
    private us: HttpServiceUsers,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.keyOfEvent = params.get('key')
     });
     if(this.keyOfEvent !== 'new'){
      this.addButton = 'Edit';
      this.title = 'Edit Event';
      this.eventSubscription =  this.es.getEvent(this.keyOfEvent).subscribe((value) => {
        this.addEventsForm.controls['eventName'].setValue(value.eventName);
        if(value.urlImage){
          this.coverPhoto = value.urlImage
        }
        if(value.category && !this.state){
          this.getcategory = true;
          this.addEventsForm.controls['eventCategory'].setValue(value.category);
        }
        this.addEventsForm.controls['phoneContacts'].setValue(value.contacts.phone);
        this.addEventsForm.controls['emailContacts'].setValue(value.contacts.email);
        this.addEventsForm.controls['eventDate'].setValue(value.date.substring(0, 10));
        this.addEventsForm.controls['eventTime'].setValue(value.date.substring(11));
        this.addEventsForm.controls['eventCity'].setValue(value.location.city);
        this.addEventsForm.controls['eventStreet'].setValue(value.location.street);
        if(value.location.url){
          this.urlStatus = true;
          this.addEventsForm.controls['googleMaps'].setValue('true');
          this.addEventsForm.controls['googleMapsUrl'].setValue(value.location.url);
        }
        if(value.amountOfVolunteers === 'unlimited'){
          this.addEventsForm.controls['volunteersQuantity'].setValue('true');        
        } else {
          this.volunteersQty = value.amountOfVolunteers;
        }
        this.addEventsForm.controls['eventDescription'].setValue(value.aboutEvent);
        this.addEventsForm.controls['eventSchedule'].setValue(value.schedule);
        this.addEventsForm.controls['eventRequirements'].setValue(value.whatDoINeed);
        this.addEventsForm.controls['eventDetails'].setValue(value.howCanIHelp);
        if(value.organization){
          this.addEventsForm.controls['eventFromOrganization'].setValue('true');
          this.addEventsForm.controls['eventOrganization'].setValue(value.organization);
        }
       }  
      )
     }
     this.managerEmail = this.as.getUser().email;
        this.us.getUsers(`orderBy="email"&equalTo="${this.managerEmail}"`).subscribe((name) =>{
         this.managerName = name
        }, error => {
         console.error(error)
         });
  }

  addCover(value){
    this.fs.uploadFile(value).subscribe((url) => {
      this.coverPhoto = url
      }, error => {
        console.error(error)
      });
  }

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
      manager: {
        name: this.managerName,
        email: this.managerEmail,
      },
      category: value.eventCategory,
      location: {
        city: value.eventCity,
        street: value.eventStreet,
        url: this.gmUrl,
      },      
      urlImage: this.coverPhoto,
      date: evDate + 'T' + evTime,
      contacts: {
        email: value.emailContacts,
        phone: value.phoneContacts
      },
      howCanIHelp: value.eventDetails,
      whatDoINeed: value.eventRequirements,
      aboutEvent: value.eventDescription,
      schedule: value.eventSchedule
    }

    if(this.keyOfEvent === 'new'){
      this.es.pushEvent(event).subscribe()
    } else {
      this.es.updateEvent(this.keyOfEvent, event).subscribe()
    }

    this.router.navigate(['home']);
  }
  
  ngOnDestroy() {
    if(this.keyOfEvent !== 'new'){
    this.eventSubscription.unsubscribe()
    }
  }
  
}
