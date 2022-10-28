import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatMenuComponent } from '../chat-menu/chat-menu.component';
import { MemberListComponent } from '../member-list/member-list.component';
import { ChatMessage, ChatMessageResponse } from '../_models/ChatMessage';
import { StorageService } from '../_services/storage.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild(MemberListComponent) memberListComponent!:MemberListComponent;

  public form: ChatMessage = {
    username: '',
    content: '',
    room: 'Global'
  }
  private chats:Map<string,ChatMessageResponse[]> = new Map([["Global",[]]]);

  currentRoomName:string='Global'
  currentChat:ChatMessageResponse[] = this.chats.get("Global")!;

  constructor(private webSocketService:WebsocketService, private storage:StorageService) { }

  ngOnInit(): void {
    //Subscribe to the websocket service
    this.webSocketService.event$.subscribe({
      next:message => {
        const _message:ChatMessageResponse = JSON.parse(message);

        switch(_message.type){
          case 'Message':
            this.addMessage(_message);
            break;
          case 'Join':
            this.memberListComponent.memberJoin(_message.username);
            break;
          case 'Leave':
            this.memberListComponent.memberLeave(_message.username);
            break;
          case 'Ping':
            this.memberListComponent.memberPing(_message.username);
            break;
        }
      }
    })
    //Get the username from storage
    const user = this.storage.getUser();
    this.form.username = user.username;

    //Connect to global
    this.connectGlobal();


  }

  //Subscribes to global chat message broker
  connectGlobal(){
    this.webSocketService.connect(`/room/Global`);
   // this.webSocketService.subscribe('/room/Global')
  }

  //Subscribes to given room
  connectRoom(roomName:string){
    console.log(roomName)
    this.webSocketService.subscribe(roomName)
  }
  sendMessage(){
    if(this.form.content.length >= 1){
      this.webSocketService.send(this.form);
      console.log(this.form);
      this.form.content=''
    }
  }

  //Adds the message to the chat
  addMessage(message:ChatMessageResponse){
    let chat = this.chats.get(message.room);
    if(chat){
      chat.push(message);
    }
  }

  leaveRoom(roomName:string){
    this.webSocketService.unsubscribe(roomName);
    this.chats.delete(roomName);

    //leave room
    const message:ChatMessage = {
      username:this.form.username,
      content:'',
      room:roomName
    }
    this.webSocketService.joinRoom(message);

  }




  updateRoom($event:string) {
    this.currentRoomName = $event;
    if(this.chats.has($event)){
      this.currentChat=this.chats.get($event)!;
      this.form.room=$event;
    }
  }

  newRoom($event:string){
    this.connectRoom($event);
    this.chats.set($event,[])

    //join room
    const message:ChatMessage = {
      username:this.form.username,
      content:'',
      room:$event
    }
    this.webSocketService.joinRoom(message);
  }
}
