import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user-service.service';
import { Stock } from '../../model/stock';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {

  currentSymbol: string;
  stock: Stock;
  isShow: Boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private flashMessage: FlashMessagesService) {
      // initialize a stock object with current username
      this.stock = new Stock(sessionStorage.getItem('username'));
      this.isShow = true;
     }

  onSubmitQuote() {
    this.userService.searchStock(this.stock).subscribe(data => {
      if (data == null) {
        this.showFlashAlert("The stock does not exist, try again!");
      }
      else {
        this.stock = data;
        this.currentSymbol = this.stock.symbol;
        this.isShow = false;
      }
      this.stock.symbol = "";
    });
  }

  onSubmitBuy() {
    // check whether shares is int and > 0
    if (this.stock.shares !== parseInt(String(this.stock.shares))) {
      this.showFlashAlert("The shares must be integer number!");
    }
    else if (this.stock.shares <= 0) {
      this.showFlashAlert("The shares must be greater than 0!");
    }
    else {
      this.stock.symbol = this.currentSymbol;
      this.userService.buyStock(this.stock).subscribe(async data => {
        // successful
        if (data === 0) {
          await this.gotoUserList();
          this.showFlashSuccess("Bought Successfully!");
        }
        // if cash is not enough
        else if (data === 1) {
          this.showFlashAlert("Cash is not enough!");
        }
      });
      
    }
    
  }

  gotoUserList() {
    this.router.navigate(['/']);
  }

  showFlashSuccess(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 3000 });
  }

  showFlashAlert(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-danger', timeout: 3000 });
  }

}
