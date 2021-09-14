import { Injectable } from '@angular/core';
import { doItLater } from './../utils/events';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading:boolean = false;

  constructor() { }

  isLoading = () => {
    return this.loading;
  }

  start = () => {
    // doItLater(()=>{
      this.loading = true;
    //   console.debug("START LOADING");
    // }, 10);
    
  }
  stop = () => {
    // doItLater(()=>{
      this.loading = false;
    //   console.debug("STOP LOADING");
    // }, 10);
  }
}
