import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
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

  constructor(private userService: UserService) { }
  
  public get user() :User|undefined {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.userService.validateLoggedUser();
  }

}
