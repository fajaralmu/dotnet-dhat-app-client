import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import ChatMessage from 'src/app/model/chat-message';
import User from 'src/app/model/user';
import WebResponse from 'src/app/dto/web-response';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { getHost, getRequestId } from 'src/app/utils/rest';
import WebSocketMessage from 'src/app/dto/websocket-message';
import { doItLater } from 'src/app/utils/events';

@Component({
  selector: 'div[app-chat-partner]',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit, OnChanges, OnDestroy {


  @Input()
  partner: User = new User();
  chatMessages: ChatMessage[] = [];
  chatMessage: ChatMessage = new ChatMessage();
  socket: WebSocket | undefined;

  @ViewChild('chatScroll')
  chatScrollRef: ElementRef<HTMLDivElement> | undefined;// = new ElementRef<HTMLDivElement>();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private alert: AlertService
  ) { }
  ngOnInit(): void {
    console.debug("partner: ", this.partner);
    this.initWebsocket();
  }
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
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
    this.scrollBottomChat();
  }



  initWebsocket = () => {
    try {
      const topics = [`chat/${this.userId}`];
      this.socket = new WebSocket(`ws://localhost:5000/ws?topics=${topics.join(',')}&requestid=${getRequestId()}`);
      this.socket.onopen = (event) => {
        if (!this.socket) return;
        this.socket.send("websocket has been initialized");
        // this.socket.send(JSON.stringify(
        // {
        //   "command": "subscribe",
        //   "identifier":`{"channels":["chat/${this.userId}"]}`
        // })) 
      }
      this.socket.onerror = (e) => { console.error("WS error: ", e); }
      this.socket.onclose = (e) => { console.log("WS close: ", e); }
      this.socket.onmessage = (event: MessageEvent) => {
        try {
          let json = JSON.parse(event.data);
          this.handleWebsocketMessage(Object.assign(new WebSocketMessage(), json));
        } catch (error) { console.log('Message from server ', (event.data)); }
      }

    } catch (e) {
      console.debug("Error ws: ", e);
    }
  }

  loadDirectChat = () => {
    this.chatService.loadDirectChat(this.partner.id ?? 0)
      .then(this.handleSuccessLoadDirectChat);
  }

  handleSuccessLoadDirectChat = (response: WebResponse) => {
    this.chatMessages = response.result;
    this.scrollBottomChat();
  }

  scrollBottomChat = () => {
    doItLater(() => {
      if (this.chatScrollRef) {
        let el: HTMLDivElement = this.chatScrollRef.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
  }

  handleWebsocketMessage(response: WebSocketMessage) {
    switch (response.topic) {
      case `chat/${this.userId}`:
        this.chatMessages.push(Object.assign(new ChatMessage(), response.data));
        this.scrollBottomChat();
        break;

      default:
        break;
    }
  }

}
