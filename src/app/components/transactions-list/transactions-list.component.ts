import { Component, OnInit } from '@angular/core';
import { Itransaction } from 'src/app/itransaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  public transactions: Array<Itransaction> = [];
  public filteredTransaction: Array<Itransaction> = [];
  public searchCriteria = '';
  constructor(private transService: TransactionService) { }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.transService.getTransactionsList();
    this.getTransactions();
  }

  /**
   * @description get transaction data
   */
  getTransactions = () => {
    this.transService.getTransactions().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.transactions = response;
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
   * @param colorCode colorCode provide in transaction list
   * @description get category color style
   */
   getCategoryColor = (colorCode: string) => {
    return { 'border-left': '3px solid ' + colorCode };
  }

  /**
   * @param value search text
   * @description filter transaction list on the basis of marchant name
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
