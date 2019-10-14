export interface Event {
  id: string;
  eventName: string;
  members?: Array<string>;
  amountOfVolunteers: number;
  organization: string; 
  manager: string; 
  category: string;
  location: Address;
  urlImage: string;
  date: string;
  contacts: Contacts;
  assignedPhotos?: Array<string>;
  howCanIHelp?: string;
  whatDoINeed?: string;
  aboutEvent?: string;
  aboutOrganization?:string;
  schedule: Array<string>
}
interface Address {
  city: string;
  street: string;
  url:string;
}
interface Contacts {
  email: string;
  phone: string;
}