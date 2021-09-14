import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert: boolean = false;
  alertBody: string = "alert";
  alertTitle:string = "Information";
  alertYesCallback: Function  = () => { };
  alertNoCallback: Function  = () => { };
  confirmAlert: boolean= false;


  constructor() { }

  get body() {
    return this.alertBody;
  }

  showInfo(msg: string, title:string = "Information"): Promise<any> {
    this.alertTitle = title;
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
    this.alertTitle = "Information";
  }
  showConfirm(msg: string, title="Confirmation"): Promise<any> {
    this.alertBody = msg;
    this.showAlert = true;
    this.confirmAlert = true;
    this.alertTitle = title;
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
