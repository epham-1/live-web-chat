import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { RoomService } from '../_services/room.service';
import { RoomModel } from '../_models/RoomModel';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit {

  @Output() updateRoomEmitter = new EventEmitter<string>();
  @Output() newRoomEmitter = new EventEmitter<string>();
  chatRooms:string[]=["Global"];
  currentRoom:string = 'Global'
  popup = false;
  constructor(private roomService:RoomService,private storage:StorageService) { }

  ngOnInit(): void {
  }

  createRoom(roomName:string){
    this.roomService.createRoom(roomName).subscribe({
      next:data=>{
        this.newRoom(data);
      },
      error:err=>{
        console.log("There is a create room error",err);
      }

    })
  }

  getRoom(roomName:String){
    this.roomService.getRoom(roomName).subscribe({
      next:data=>{
        this.newRoom(data);
      },
      error:err=>{
        console.log("There is a get room error",err);
      }
    })
  }

  leaveRoom(roomName:string){
    console.log(`ROOMNAME: ${roomName}`)
    for(let i = 0; i<this.chatRooms.length;i++){
      if(this.chatRooms[i]==roomName){
        this.chatRooms.splice(i,1);
        this.updateRoom('Global');
        return;
      }
    }

  }
  newRoom(room:RoomModel){
    this.chatRooms.push(room.roomName);
    this.newRoomEmitter.emit(room.roomName);
  }

  updateRoom(room:string){
    this.currentRoom=room;
    this.updateRoomEmitter.emit(room);

  }
}
