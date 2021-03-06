import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { doItLater } from 'src/app/utils/events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string = "";
  email:string = "";
  password:string = "";
  registerSuccess:boolean | undefined;
  loading:boolean = false;

  constructor(
    private authService:AuthService, 
    private router:Router
    ) { }

  ngOnInit(): void {
    this.checkSession();
  }
  private checkSession = () => {
     
  }
  register = (): void => {
    this.loading = true;
    this.registerSuccess = undefined;
    this.authService.register(this.name, this.email, this.password)
      .then(this.handleResponse);
  }
  handleResponse = (success:boolean) => {
    this.registerSuccess = success;
    this.loading = false;
    if (!success) return;

    doItLater(()=>{
      this.router.navigateByUrl("/login");
    }, 2000);
  }

}
