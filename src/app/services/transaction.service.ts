import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: any = new Subject<any>();
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
}
