import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../model/stock';
import { UserService } from '../../service/user-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  stocks: Stock[];
  selectedStock: Stock;
  currentShares: number;
  sharesToBeSold: number;
  isLoading: Boolean;
  isShow: Boolean;

  constructor(private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService) { 
    // initialize a stock object with current username
    this.selectedStock = new Stock(sessionStorage.getItem('username'));
    this.isLoading = true;
    this.isShow = true;
  }

  ngOnInit() {
    this.userService.getStockList(sessionStorage.getItem('username')).then(data => {
      this.stocks = data;
      this.isLoading = false;
      error => console.log(error);
      });
  }

  onSelectStock() {
    this.isShow = false;
    this.currentShares = this.selectedStock.shares;
    // console.log(this.currentShares);
  }

  onChangeShares() {
    // console.log(this.sharesToBeSold);
  }

  onSubmitSell() {
    if (this.sharesToBeSold !== parseInt(String(this.sharesToBeSold))) {
      this.showFlashAlert("The shares must be integer number!");
    }

    else if (this.sharesToBeSold <= 0) {
      this.showFlashAlert("The shares must be greater than 0!");
    }

    else if (this.selectedStock.shares < this.sharesToBeSold) {
      this.showFlashAlert("You don't have enough shares!");
    }

    else {
      this.selectedStock.shares = this.sharesToBeSold;
      this.userService.sellStock(this.selectedStock).subscribe(result => {
        this.gotoUserList();
        this.showFlashSuccess("Sold Successfully!");
      });
      
    }
  }

  showFlashSuccess(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 3000 });
  }

  showFlashAlert(message: string) {
    this.flashMessage.show(message, { cssClass: 'alert-danger', timeout: 3000 });
  }

  gotoUserList() {
    this.router.navigate(['/']);
  }

}
