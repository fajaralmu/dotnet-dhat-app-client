import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import User from './../../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menus:Record<string, string>[] = [
    {
      label:'Chat Room',
      link:'/chat-room',
      icon: 'fas fa-comments'
    },
    {
      label:'Direct Message',
      link:'/chat-direct',
      icon: 'fas fa-comment-dots'
    },
     
  ]

  constructor(private authService: AuthService) { }
  
  public get user() :User|undefined {
    return this.authService.user;
  }

  ngOnInit(): void {
    this.authService.validateLoggedUser();
  }

}
