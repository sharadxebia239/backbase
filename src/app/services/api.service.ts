import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  transactions: any = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  // get transactions data from json file
  getTransactionsFromJSON = () => {
    this.httpClient.get('assets/transactions.json').subscribe((response: any) => {
      response.data.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
      this.transactions.next(response);
    }, error => {
      console.log(error);
    });
  }

  // set transaction object
  setTransaction = (object) => {
    object.data.sort((a, b) => new Date(b.dates.valueDate).getTime() - new Date(a.dates.valueDate).getTime());
    this.transactions.next(object);
  }

  // get transactions
  getTransactions(): Observable<any> {
    return this.transactions.asObservable();
  }
}
