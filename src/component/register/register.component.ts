import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  rePassword: string;
  invalidLogin = false;
  checkLoginStatus : boolean;
  userPair: string[];

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private flashMessage: FlashMessagesService,
    private userService: UserService
    ) {}

  ngOnInit() {
  }

  checkRegister() {
    if (this.username == null) {
      this.showFlashAlert("The username cannot be empty!");
    }
    else if (this.password == null || this.rePassword == null) {
      this.showFlashAlert("The password cannot be empty!");
    }
    else if (this.password !== this.rePassword) {
      this.showFlashAlert("The password didn't match!");
    }
    else {
      this.userPair = [this.username, this.password];
      this.userService.postRegister(this.userPair).then(async data => {
        // ok
        if (data === 0) {
          await this.loginservice.authenticate(this.username, this.password);
          this.router.navigate(['/'])
          this.showFlashSuccess("Create new account Successfully!");
        }
        // the username already exists
        else if (data === 1) {
          this.showFlashAlert("The username already exists! Try again!");
        }
      });
    }
  }

  showFlashSuccess(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 3000 });
  }

  showFlashAlert(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-danger', timeout: 3000 });
  }

}
