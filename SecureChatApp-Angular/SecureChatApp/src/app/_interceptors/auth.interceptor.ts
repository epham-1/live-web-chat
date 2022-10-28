import { HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../_services/storage.service";
import { HttpRequest,HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
  constructor(private storage:StorageService){}
  intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    })
    return next.handle(req);
  }
}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass:HttpRequestInterceptor,multi:true}
]
