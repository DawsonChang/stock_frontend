import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;
  checkLoginStatus : boolean;

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private flashMessage: FlashMessagesService
    ) {}

  ngOnInit() {
  }

  async checkLogin() {
    if (await this.loginservice.authenticate(this.username, this.password)) {
      // console.log("auth is true");
      this.router.navigate(['/'])
      this.invalidLogin = false
      this.showFlashSuccess("Login Successfully!");
    } 
    else {
      // console.log("auth is false");
      this.invalidLogin = true
      this.showFlashAlert("The username-password matching is wrong! Try again");
    }
  }


  showFlashSuccess(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 3000 });
  }

  showFlashAlert(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-danger', timeout: 3000 });
  }

}