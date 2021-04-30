import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Itransaction } from 'src/app/interfaces/itransaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  // variable declaration
  public transactions: Array<Itransaction> = [];
  public filteredTransactions: Array<Itransaction> = [];
  public searchCriteria = '';
  private transactionSubscription: Subscription;
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
    this.transactionSubscription = this.transService.getTransactions().subscribe((response: Array<Itransaction>) => {
      if (response && response.length > 0) {
        this.transactions = response;
        this.filteredTransactions = this.transactions;
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
   * @returns void
   */
  ngOnDestroy(): void {
    // unsubscribe the transaction service
    this.transactionSubscription.unsubscribe();
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
    this.filteredTransactions = Object.assign([], this.transactions).filter(
      item => item.merchant.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
}
