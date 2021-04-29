import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Itransaction } from '../itransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private httpClient: HttpClient) { }

  /**
   * @description get transactions data from json file
   */
  getTransactionsList = () => {
    this.httpClient.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions').subscribe((response: any) => {
      response.data.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
      this.transactions.next(response.data);
    }, apiError => {
      // if above URL is not working properly
      this.httpClient.get('assets/transactions.json').subscribe((response: any) => {
        response.data.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
        this.transactions.next(response.data);
      }, error => {
        console.error(error);
      });
    });
  }

  /**
   * @param object transaction object
   * @description set transaction object
   */
  setTransaction = (object) => {
    object.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
    this.transactions.next(object);
  }

  /**
   * @returns Observable
   * @description get transactions
   */
  getTransactions(): Observable<any> {
    return this.transactions.asObservable();
  }
  
  /**
   * @param newObject for new transaction
   * @description creating new transaction and update the list
   */
  createTransaction = (newObject: Itransaction) => {
    let transactionsList = [...this.transactions.value, newObject];
    transactionsList.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
    this.transactions.next(transactionsList);
  }
}
