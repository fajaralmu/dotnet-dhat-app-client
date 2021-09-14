import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import ChatMessage from 'src/app/model/chat-message';
import User from 'src/app/model/user';
import WebResponse from 'src/app/model/web-response';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'div[app-chat-partner]',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit, OnChanges {

  @Input()
  partner: User = new User();
  chatMessages: ChatMessage[] = [];
  chatMessage: ChatMessage = new ChatMessage();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private alert: AlertService
  ) { }
  get userId() {
    return this.authService.user?.id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['partner']) {
      this.loadDirectChat();
      this.chatMessage = new ChatMessage();
    }
  }
  delete = (chatMessage: ChatMessage) => {
    this.alert.showConfirm("Delete chat?")
      .then(ok => {
        if (ok) {
          this.chatService.delete(chatMessage.id)
          .then(this.handleSuccessDeleteChat)
        }
      })
  }
  send = () => {
    this.chatMessage.toUserID = this.partner.id;
    this.chatService.sendChat(this.chatMessage)
      .then(this.handleSuccessSendChat).catch((e: WebResponse) => {
        this.alert.showInfo(e.message, "Error");
      });
  }

  handleSuccessDeleteChat = (response: WebResponse) => {
    let id = (response.result as ChatMessage).id;
    for (let i = 0; i < this.chatMessages.length; i++) {
      if (this.chatMessages[i].id == id) {
        this.chatMessages.splice(i, 1);
        break;
      }
    }
  }
  handleSuccessSendChat = (response: WebResponse) => {
    this.chatMessage = new ChatMessage();
    this.chatMessages.push(response.result);
  }

  ngOnInit(): void {
    console.debug("partner: ", this.partner);
  }

  loadDirectChat = () => {
    this.chatService.loadDirectChat(this.partner.id ?? 0)
      .then(this.handleSuccessLoadDirectChat);
  }

  handleSuccessLoadDirectChat = (response: WebResponse) => {
    this.chatMessages = response.result;
  }

}
