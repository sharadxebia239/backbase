import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  public transactions: any = [];
  public filteredTransaction: any = [];
  public searchCriteria: any = '';
  constructor(private apiService: ApiService) {
    this.apiService.getTransactionsFromJSON();
    this.getTransactions();
  }

  ngOnInit(): void {
  }

  // get transaction data
  getTransactions = () => {
    this.apiService.getTransactions().subscribe((response: any) => {
      if (response && response.data.length > 0) {
        this.transactions = response.data;
        this.filteredTransaction = this.transactions;

        // filter transactions if search has some value
        if (this.searchCriteria) {
          this.search(this.searchCriteria);
        }
      }
    }, error => {
      console.error(error);
    });
  }

  /**
   * @param  {string} colorCode
   */
   getRandomColor = (colorCode: string) => {
    return { 'border-left': '3px solid ' + colorCode };
  }

  // TODO - value define type
  /**
   * @param  {string} value
   */
  search = (value: string) => {
    this.searchCriteria = value;
    if (!value) {
      this.getTransactions();
    } // when nothing has typed
    this.filteredTransaction = Object.assign([], this.transactions).filter(
      item => item.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
