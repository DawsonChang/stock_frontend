import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUsername: string;
  constructor(private loginService:AuthenticationService) { 
  }

  ngOnInit(){
  }

  checkIsLogin() {
    this.currentUsername = sessionStorage.getItem('username');
    return this.loginService.isUserLoggedIn()
  }

}
