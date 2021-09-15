import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import WebResponse  from './dto/web-response';
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

  constructor(private authService:AuthService, public loading:LoadingService, 
    
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
    const sub:Subscription = this.authService.requestId().subscribe(
      (resp)  => this.initialLoadingOnSuccess(resp, sub),
      (err)   => this.initialLoadingOnFailed(err, sub));
  }

  initialLoadingOnSuccess = (response:WebResponse,sub: Subscription) => {
    this.initialLoading = false;
    this.initialLoadingSuccess = true;
    this.authService.handleInitialLoading(response);
    if (this.authService.profile) {
      this.headerContent = this.authService.profile.name;
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
    const sub:Subscription = this.authService.retryRequestId().subscribe(
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
    this.authService.logout().then(success=>{
      if (success) {
        this.authService.validateLoggedUser();
      } else {
        this.alert.showInfo("Error logout");
      }
    });
  }

  loggedUser = () => {
    return this.authService.user;
  }

  
}
