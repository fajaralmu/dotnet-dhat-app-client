import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
 
import { LoadingService } from './loading.service';
import { doItLater } from './../utils/events';
import { commonHeaders } from '../utils/rest';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(private http:HttpClient, private loading:LoadingService, private authService:AuthService) { }

  /**
   * 
   * @param url 
   * @param body 
   * @param onSuccessCallback after ajax success
   */
  public  commonAuthorizedAjax = <Type>(url:string, body:any, onSuccessCallback?:(t:Type)=>any, commonLoading:boolean = true): Promise<Type > => {
    return new Promise<Type >((res, rej) => {
      this.startLoading(commonLoading);
      let observable = this.http.post<Type>(url, body, {
        observe: 'response',
        ... commonHeaders(true)
      });
      const sub = observable.subscribe((response:HttpResponse<Type>)=>{
        this.authService.updateToken(response);
        this.stopLoading(commonLoading);

        if (response.body) {
          res(response.body);

          if (onSuccessCallback) {
            onSuccessCallback(response.body);
          }
          sub.unsubscribe();
        } else {
          sub.unsubscribe();
          throw new Error("Response body cannot be read");

        }
        
      }, (error:HttpErrorResponse) => {
        this.stopLoading(commonLoading);
        rej(error.error);
        sub.unsubscribe();

      });//.unsubscribe();
 
    }) 
    
  }

  public  commonAuthorizedAjaxGET = <Type>(
    url:string,
    onSuccessCallback?:(t:Type)=>any, 
    commonLoading:boolean = true
    ): Promise<Type > => {
    return this.commonAuthorizedAjaxGENERAL(url, 'get', onSuccessCallback, commonLoading);
    
  }

  public  commonAuthorizedAjaxDELETE = <Type>(
    url:string, 
    onSuccessCallback?:(t:Type)=>any, 
    commonLoading:boolean = true
    ): Promise<Type > => {
    return this.commonAuthorizedAjaxGENERAL(url, 'delete', onSuccessCallback, commonLoading);
    
  }

  public  commonAuthorizedAjaxGENERAL = <Type>(
    url:string, 
    method: 'get' |'delete',
    onSuccessCallback?:(t:Type)=>any, 
    commonLoading:boolean = true
    ): Promise<Type > => {
    return new Promise<Type >((res, rej) => {
      this.startLoading(commonLoading);
      let observable;

      if (method == 'get') {
        observable = this.http.get<Type>(url, {
          observe: 'response',
          ... commonHeaders(true)
        });
      } else //if (method == 'delete')
       {
        observable = this.http.delete<Type>(url, {
          observe: 'response',
          ... commonHeaders(true)
        });
      }
       
      const sub = observable.subscribe((response:HttpResponse<Type>)=>{
        this.authService.updateToken(response);
        this.stopLoading(commonLoading);

        if (response.body) {
          res(response.body);

          if (onSuccessCallback) {
            onSuccessCallback(response.body);
          }
          sub.unsubscribe();
        } else {
          sub.unsubscribe();
          throw new Error("Response body cannot be read");

        }
        
      }, (error:HttpErrorResponse) => {
        this.stopLoading(commonLoading);
        rej(error.error);
        sub.unsubscribe();

      });//.unsubscribe();
 
    }) 
    
  }

  stopLoading = (yes:boolean) => {
    if (yes) this.loading.stop();
  }
  startLoading = (yes:boolean) => {
    if (yes) this.loading.start();
  }
}
