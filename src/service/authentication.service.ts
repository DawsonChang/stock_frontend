import { Injectable } from '@angular/core';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userPair: string[];
  returnStatus: boolean;

  constructor(private userService: UserService) {
    
   }

  async authenticate(username: string, password: string) {
    this.userPair = [username, password];
    return await this.userService.postLogin(this.userPair).then(data => {
      if (data) {
        // console.log(data);
        sessionStorage.setItem('username', username);
        return true;
      }
      else {
        return false;
      }
    });
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
