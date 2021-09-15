import { Injectable } from '@angular/core';
import ChatMessage from '../model/chat-message';
import WebResponse from '../dto/web-response';
import { getHost } from '../utils/rest';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private ajax:AjaxService) { }
 
  sendChat = (message:ChatMessage) :Promise<WebResponse> => {
    const url = getHost()+"api/chat/direct";
    return this.ajax.commonAuthorizedAjax(url, message);
  }
  loadPartners = () :Promise<WebResponse> => {
    const url = getHost()+"api/chat/partners";
    return this.ajax.commonAuthorizedAjaxGET(url);
  }
  delete = (id:number) :Promise<WebResponse> => {
    const url = getHost()+"api/chat/"+id;
    return this.ajax.commonAuthorizedAjaxDELETE(url);
  }
  loadDirectChat = (fromUserId:number) :Promise<WebResponse> => {
    const url = getHost()+`api/chat/direct/${fromUserId}`;
    return this.ajax.commonAuthorizedAjaxGET(url);
  }

}
