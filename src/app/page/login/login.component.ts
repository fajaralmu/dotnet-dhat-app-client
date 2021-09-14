import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { doItLater } from './../../utils/events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";
  loginSuccess:boolean | undefined;
  loading:boolean = false;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.checkSession();
  }
  private checkSession = () => {
    if (this.userService.validateLoggedUser()) {
      this.router.navigateByUrl("/dashboard");
    }
  }

  login = (): void => {
    this.loading = true;
    this.loginSuccess = undefined;
    this.userService.login(this.email, this.password)
      .then(this.handleResponse);
  }
  handleResponse = (success:boolean) => {
    if (success) {
      this.loginSuccess = true;
      doItLater(this.checkSession, 200);
    } else {
      this.loginSuccess = false;
    }
    this.loading = false;
  }

}
