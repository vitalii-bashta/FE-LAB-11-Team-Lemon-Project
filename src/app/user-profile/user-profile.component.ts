import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../core/models/user.model';
import { HttpServiceUsers } from '../core/services/http-users.service';
import { map, first, take } from 'rxjs/operators';
import { ModalService } from './modal/modal.service';
import { AuthenticationService } from '../core';
import * as firebase from 'firebase';
import { Subscriber, Subscription } from 'rxjs';
import { delay } from 'q';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isActive = true;


  submitted = false;
  errorMessage = '';

  keyOfUserInDatabase: string;
  key: any;
  public userModel: User = {
    name: "NoName",
    email: this._authenticationService.getUser().providerData[0].uid,
    avatarUrl: "https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/unknown-person-icon-17.jpg?alt=media&token=3ff13b84-1fd7-45f9-958b-b30ef06badb6",
    mobile: "0000000000",
    city: "MiddleOfNowhere",
    age: 0,
    memberOf: "Gang",
    skills: "No skills",
    aboutMe: "Nothing about me",
    organizations: ["No organizations"],
    feedback: ""
  }
  userData: User = {
    // email: this.key
  };
  sub: Subscription;

  fileButton = document.getElementById('fileButton');
  userData1: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private _userService: HttpServiceUsers,
              private modalService: ModalService,
              public _authenticationService: AuthenticationService,
              public storage: AngularFireStorage) {
                // const storageRef = firebase.storage().ref().child('IMG_20190425_202226_1.jpg');
                // storageRef.getDownloadURL().then(url => console.log(url));
              }

  ngOnInit() {
    this.key = this._authenticationService.getUser().providerData[0].uid;
    this.userData.email = this.key;
    this.sub = this._userService.getUsers(`orderBy="email"&equalTo="${this.key}"`)
      .subscribe( users => {
        if (Object.keys(users).length > 0) {
          this.keyOfUserInDatabase = Object.keys(users)[0];
          // console.log(this.keyOfUserInDatabase);
          this.userData = users[this.keyOfUserInDatabase];
          // let dbref = firebase.database().ref("users/" + this.keyOfUserInDatabase);
          // dbref.on('value', snap => {
          //   // this.userData.avatarUrl = snap.val().avatarUrl;
          //   // console.log(snap.val().avatarUrl);
          //   // this.userData1 = snap.val()
          // });
          // console.log(this.userData1);
          // console.log(this.userData);
          // this.userData.name = users[this.keyOfUserInDatabase].name;
          // this.userData.avatarUrl = users[this.keyOfUserInDatabase].avatarUrl;
        } else {
          this.userData = this.userModel;
          // this.userData.name = this.userModel.name;
          // this.userData.avatarUrl = this.userModel.avatarUrl;
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onChange(event) {
    // console.log(event);
    let file = event.target.files[0];
    
    console.log(this.storage.storage.refFromURL(this.userData.avatarUrl).delete())
    // console.log(file);
    let storageRef = firebase.storage().ref('users/' + this.key + '/' + file.name);
    
    // console.log(this.userData.avatarUrl);
    // console.log(storageRef);
    let uploadTask = storageRef.put(file);

    let data = this.userData
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        data.avatarUrl = downloadURL;
        
      });
    });

    // this.userData.avatarUrl = data.avatarUrl;


    // this._userService.getUser(this.key).subscribe( user => console.log(user));
    // setTimeout(() => storageRef.getDownloadURL().then(url => this.userData.avatarUrl = url), 6000)
    // console.log(storageRef.getDownloadURL().then(url => this.userData.avatarUrl = url));
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.key);
    console.log(this.keyOfUserInDatabase)
    if (this.keyOfUserInDatabase) {
      this._userService.updateUser(this.keyOfUserInDatabase, this.userData).subscribe((result)=> console.log(result));
    } else {
      this._userService.pushUser(this.userData).subscribe((result)=> console.log(result));
      location.reload();
    }

    this.closeModal('custom-modal-1');
  }

  // showInformation() {
  //   this.router.navigate(['information'], {relativeTo: this.route});
  //   this.isActive = false;
  // }
  // showOrganization() {
  //   this.router.navigate(['organization'], {relativeTo: this.route});
  //   this.isActive = false;
  // }
  // showFeedback() {
  //   this.router.navigate(['feedback'], {relativeTo: this.route});
  //   this.isActive = false;
  // }

}
