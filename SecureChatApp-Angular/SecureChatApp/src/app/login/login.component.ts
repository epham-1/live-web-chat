import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { loginModel, registerModel } from '../_models/Authentication';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isLoggedIn = false;
loginErrorMessage = '';
isLoginFailed = false;
loginForm:loginModel = {
  username:"",
  password:""
}
  constructor(private auth:AuthService, private storage:StorageService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.signin(this.loginForm.username,this.loginForm.password).subscribe({
      next: data => {
        this.storage.saveUser(data);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err=> {
        this.isLoggedIn=false;
        this.isLoginFailed=true;
        //this.loginErrorMessage = err.error.message;
      }
    })
  }

  reloadPage():void{
    window.location.reload();
  }
}
