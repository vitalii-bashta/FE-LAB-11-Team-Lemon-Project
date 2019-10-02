export interface Event {
  id: number;
  name: string;
  members: Array<any>;//instead of any will be type User
  needVolunteers: number;
  organization: any; //instead of any will be type Organization
  manager: string; //user
  category: string;
  location: Address;
  urlImage: string;
  date: startDate;
  time: startTime;
  contacts: Contacts;
  assignedPhotos: Array<string>;
  // howCanIHelp: string,
  // whatDoINeed: string,
}
interface Address {
  place: string;
  url:string;

}
interface startDate {
  year: number;
  month: number;
  day: number;
}
interface startTime {
  hours: number;
  minutes: number;
}
interface Contacts {
  email: string;
  phone: string;
}