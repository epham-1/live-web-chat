/*
<div *ngFor="let string of greetings">
  <div class="container">
   <p>{{string}}</p>
  </div>
 </div>
 <form #loginForm=ngForm>
  <div>
   <br>
   <textarea autocomplete="off" placeholder="Type Your Message..." name="newmessage" [(ngModel)]="newmessage" required></textarea>
   <button class="btn btn-primary" (click)="sendMessage()" [disabled]="!loginForm.valid">Send</button>
  </div>
 </form>

*/

import { Component } from '@angular/core';
import { WebsocketService } from './_services/websocket.service';
import { StorageService } from './_services/storage.service';
import { UserModel } from './_models/User';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles:String[]=[];
  isLoggedIn:Boolean = false;
  username:String = 'Guest';


  constructor(private storageService:StorageService){}

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user = this.storageService.getUser() as UserModel;
      this.roles = user.roles;
      this.username=user.username;
    }
  }


}
