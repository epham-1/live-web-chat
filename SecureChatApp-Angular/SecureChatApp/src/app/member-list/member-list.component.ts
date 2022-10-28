import { Component, OnInit } from '@angular/core';
import { ChatMessageResponse } from '../_models/ChatMessage';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  public memberLists:Map<string,string[]> = new Map([["Global",[]]]);
  public currentMemberList:string[] = [];
  public ini:boolean = false;

  constructor(private webSocketService:WebsocketService) { }

  ngOnInit(): void {
    this.webSocketService.event$.subscribe({
      next:message => {
        const _message:ChatMessageResponse = JSON.parse(message)
      }
    })
  }

  //Updates memberlist when someone joins
  memberJoin(username:string):void{
    this.currentMemberList.push(username)
  }

  //Updates memberlsit when someone leaves
  memberLeave(username:string):void{
    for(let i = 0; i < this.currentMemberList.length; i++){
      if (this.currentMemberList[i] == username){
        this.currentMemberList.splice(i,1);
      }
    }
  }

  //Initializes the memberlist when joining
  memberPing(username:string):void{
    if(!this.ini){
      this.currentMemberList.push(username)
    }
  }

  addRoom(roomName:string):void{
    this.memberLists.set(roomName,[]);
  }

  updateCurrentRoom(roomName:string):void{
    this.currentMemberList =  this.memberLists.get(roomName)!;
  }
}
