import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
 const url = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signin(username:string,password:string):Observable<any>{
    return this.http.post(`${url}signin`,{username,password});
  }
  signup(username:string,password:string):Observable<any>{
    return this.http.post(`${url}signup`,{username,password});
  }
}
