import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Itransaction } from '../itransaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private httpClient: HttpClient) { }

  /**
   * @description get transactions data from json file
   */
  getTransactionsList = () => {
    this.httpClient.get(environment.transactionAPI).subscribe((response: any) => {
      response.data.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
      this.transactions.next(response.data);
    }, apiError => {
      console.debug('picking up data from local file');
      // picking the data from transction.json file if the above API is not responding
      this.httpClient.get(environment.transactionLocalFile).subscribe((response: any) => {
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
    const transactionsList = [...this.transactions.value, newObject];
    transactionsList.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
    this.transactions.next(transactionsList);
  }
}
