import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert: boolean = false;
  alertBody: string = "alert";
  alertYesCallback: Function  = () => { };
  alertNoCallback: Function  = () => { };
  confirmAlert: boolean= false;


  constructor() { }

  get body() {
    return this.alertBody;
  }

  showInfo(msg: string): Promise<any> {
    this.alertBody = msg;
    this.showAlert = true;
    return new Promise((res, rej) => {
      this.alertYesCallback = function (e: any) {
        res(true);
        this.stopAlert();
      }
    });
  }
  stopAlert():void {
    this.showAlert = false;
    this.confirmAlert = false;
    this.alertYesCallback = () => { };
    this.alertNoCallback = () => { };
  }
  showConfirm(msg: string): Promise<any> {
    this.alertBody = msg;
    this.showAlert = true;
    this.confirmAlert = true;
    return new Promise((res, rej) => {
      this.alertYesCallback = function (e: any) {
        res(true);
        this.stopAlert();
      }
      this.alertNoCallback = function (e: any) {
        res(false);
        this.stopAlert();
      }
    });
  }
}
