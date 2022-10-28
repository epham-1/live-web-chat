import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { RoomModel } from '../_models/RoomModel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}
const url='http://localhost:8080/room'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }

  createRoom(roomName:String):Observable<RoomModel>{
    return this.http.post<RoomModel>(`${url}/create`,roomName,httpOptions);
  }

  getRoom(roomName:String):Observable<RoomModel>{
    return this.http.get<RoomModel>(`${url}/find/${roomName}`);
  }
}
