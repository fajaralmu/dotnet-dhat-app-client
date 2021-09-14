import { Component, OnInit } from '@angular/core';
import User from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  user:User|undefined;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile = ()=>{
    if (this.user != undefined) return;
    this.userService.loadProfile()
                    .then(response=>{
                        this.user = response.result as User;
                    });
  }

}
