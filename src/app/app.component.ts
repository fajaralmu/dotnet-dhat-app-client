import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import WebResponse  from './model/web-response';
import { Router } from '@angular/router';
import { AlertService } from './service/alert.service';
import { LoadingService } from './service/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'rent-management'; 
  initialLoading:boolean = false;
  initialLoadingSuccess:boolean|undefined;
  initialLoadingCount:number = 0;
 
  
  headerContent: string = "Welcome";

  constructor(private userService:UserService, public loading:LoadingService, 
    
    public alert:AlertService){

  }
  ngAfterViewInit(): void {
    
  } 
  ngOnInit(): void {
    this.initialLoad();
  }
  initialLoad = ():void => {
    this.initialLoadingSuccess = undefined;
    this.initialLoadingCount = 1;
    this.initialLoading = true;
    const sub:Subscription = this.userService.requestId().subscribe(
      (resp)  => this.initialLoadingOnSuccess(resp, sub),
      (err)   => this.initialLoadingOnFailed(err, sub));
  }

  initialLoadingOnSuccess = (response:WebResponse,sub: Subscription) => {
    this.initialLoading = false;
    this.initialLoadingSuccess = true;
    this.userService.handleInitialLoading(response);
    if (this.userService.profile) {
      this.headerContent = this.userService.profile.name;
    }
    sub.unsubscribe();
     
  }
  initialLoadingOnFailed = (err:any, _sub:Subscription) => {
    
    this.initialLoadingCount++;
    if (this.initialLoadingCount > 3) {
      this.initialLoadingSuccess = false;
      _sub.unsubscribe();
      return;
    }
    const sub:Subscription = this.userService.retryRequestId().subscribe(
      (resp)  => this.initialLoadingOnSuccess(resp, sub),
      (err)   => this.initialLoadingOnFailed(err, sub));
    console.error(err.error);

    _sub.unsubscribe();
  }

  logout = () => {
    this.alert.showConfirm("Logout?")
    .then(ok=> {
      if (!ok) return;
      this.doLogout();
    });
  }

  private doLogout() {
    this.userService.logout().then(success=>{
      if (success) {
        this.userService.validateLoggedUser();
      } else {
        this.alert.showInfo("Error logout");
      }
    });
  }

  loggedUser = () => {
    return this.userService.user;
  }

  
}
