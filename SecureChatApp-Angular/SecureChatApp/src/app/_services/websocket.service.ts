import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { ChatMessageResponse } from '../_models/ChatMessage';
import { ChatMessage } from '../_models/ChatMessage';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = new SockJS('http://localhost:8080/ws');
  private stompClient = Stomp.over(this.socket);
  private subscriptions:Map<string,Stomp.Subscription> =  new Map();


  private event = new Subject<any>;
  public event$: Observable<any>;

  constructor(private storage:StorageService) {
    this.event$ = this.event.asObservable();
   }

  connect(url:string){
    this.stompClient.connect({}, frame =>{
      console.log(`Connected: ${frame}`);
      this.stompClient.subscribe(url,data=>{
        console.log("Recieved Data!");
        //Sends data is a string representation of JSON
        this.event.next(data.body);


      })

      //Send join message to chat
      const user = this.storage.getUser();
      const message:ChatMessage = {
        username:user.username,
        content:'',
        room:"Global"
      }
      this.joinRoom(message);

    },_=>console.log("Connect Error"))


  }

  subscribe(roomName:string){
    const url = `/room/${roomName}`;
    const subToken = this.stompClient.subscribe(url,data=>{
      this.event.next(data.body);
    })

    this.subscriptions.set(roomName,subToken);
  }

  unsubscribe(roomName:string){
    if(this.subscriptions.has(roomName)){
      const sub = this.subscriptions.get(roomName);
      sub?.unsubscribe();
      this.subscriptions.delete(roomName);
    }
  }

  send(message:ChatMessage){
    this.stompClient.send('/chat/send-message',{}, JSON.stringify(message))
  }

  joinRoom(message:ChatMessage){
    this.stompClient.send('/chat/join',{},JSON.stringify(message))
  }

  leaveRoom(message:ChatMessage){
    this.stompClient.send('/chat/leave',{},JSON.stringify(message))
  }

  pingRoom(message:ChatMessage){
    this.stompClient.send('/chat/ping',{},JSON.stringify(message))
  }
}
