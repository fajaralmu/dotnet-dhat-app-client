import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ChatMessage from 'src/app/model/chat-message';
import { ChatService } from 'src/app/service/chat.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { AlertService } from 'src/app/service/alert.service';
import User from 'src/app/model/user';
import WebResponse from 'src/app/dto/web-response';

@Component({
  selector: 'app-chat-direct',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat-direct.component.css']
})
export class ChatDirectComponent implements OnInit {

  chatMessage: ChatMessage = new ChatMessage();
  loading: boolean = false;
  error: boolean = false;
  partners:User[] = [];
  selectedPartner:User | undefined;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private alert: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authService.validateLoggedUser(this.loadPartners);
  }
  loadPartners = () => {
    this.chatService.loadPartners()
              .then(this.handleSuccessLoadPartner)
  }
  
  send = () => {
    this.loading = true;
    this.chatService.sendChat(this.chatMessage)
      .then(this.handleSuccess).catch((e:WebResponse)  => {
        this.loading = false;
        this.alert.showInfo(e.message, "Error");
      });
  }

  selectPartner = (p:User) => this.selectedPartner = p;
 
  handleSuccessLoadPartner = (response: WebResponse) => {
    this.partners = response.result as User[];
  }
  handleSuccess = (response: WebResponse) => {
    this.loading = false;
    if (this.chatMessage.toUser && !this.partnerExist(this.chatMessage.toUserID)) {
      this.partners.push(this.chatMessage.toUser);
    }
    this.chatMessage = new ChatMessage();
  }
  partnerExist = (id:number) :boolean => {
    return this.partners.find(p => p.id == id) != null;
  }

  readUser = () => {
    if (this.chatMessage.toUserID == this.authService.user?.id) {
      this.chatMessage.toUserID = 0;
      return;
    }
    if (!this.chatMessage.toUserID) return;
    this.userService.read(this.chatMessage.toUserID)
      .then(response => {
        this.chatMessage.toUser = response.result as User;
      });
  }

}
