import { Injectable } from '@angular/core';
import { UserModel } from '../_models/User';

const USER_KEY = 'auth-user'
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean():void{
    window.sessionStorage.clear();
  }

  public saveUser(user:any):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  public getUser():UserModel{
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user)
      return JSON.parse(user);
    return {} as UserModel;
  }

  public isLoggedIn():boolean{
    const user= window.sessionStorage.getItem(USER_KEY);
    if(user)
      return true;
    return false;
  }

  public getToken():string{
    return this.getUser().token;
  }
}
