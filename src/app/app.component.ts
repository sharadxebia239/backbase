import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // variable declaration
  transactions: any = [];
  filterTransaction: any = [];
  searchVal: any = '';

  constructor(private apiService: ApiService) {
    this.apiService.getTransactionsFromJSON();
    this.getTransactions();
  }

  // get transaction data
  getTransactions = () => {
    this.apiService.getTransactions().subscribe((response: any) => {
      if (response && response.data.length > 0) {
        this.transactions = response.data;
        this.filterTransaction = this.transactions;

        // filter transactions if search has some value
        if (this.searchVal) {
          this.search(this.searchVal);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  // generate random color
  getRandomColor = () => {
    return { 'border-left': '3px solid #' + Math.floor(Math.random() * 16777215).toString(16) };
  }

  // search function
  search = (value) => {
    this.searchVal = value;
    if (!value) {
      this.getTransactions();
    } // when nothing has typed
    this.filterTransaction = Object.assign([], this.transactions).filter(
      item => item.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}

