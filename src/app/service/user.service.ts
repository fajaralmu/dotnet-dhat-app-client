 
import { Injectable } from '@angular/core'; 
import { commonHeaders, getHost, setLoginKeyCookie, setRequestId } from '../utils/rest'; 
import WebResponse from '../model/web-response';
import { AjaxService } from './ajax.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor( 
    private ajax:AjaxService
    ) { }

  

  loadProfile = () :Promise<WebResponse> => {
    const url = getHost()+"api/user/profile";
    return this.ajax.commonAuthorizedAjaxGET(url);
  }
  read = (id:number) :Promise<WebResponse> => {
    const url = getHost()+`api/user/${id}`;
    return this.ajax.commonAuthorizedAjaxGET(url);
  } 
}
