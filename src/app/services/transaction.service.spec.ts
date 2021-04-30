import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Itransaction } from '../interfaces/itransaction';

describe('ApiService', () => {
  let service: TransactionService;
  let transactionObject: Itransaction;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransactionService);
    transactionObject = {
      categoryCode: '#e25a2c',
      dates: {
        valueDate: new Date()
      },
      merchant: {
        accountNumber: 'DUMMYACCOUNT',
        name: 'DUMMYACCOUNT'
      },
      transaction: {
        amountCurrency: {
          amount: 100,
          currencyCode: 'EUR'
        },
        creditDebitIndicator: 'DBIT',
        type: 'Transfer'
      },
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('makes expected calls of getTransactionsList', () => {
    spyOn(service, 'getTransactionsList').and.callThrough();
    service.getTransactionsList();
    expect(service.getTransactionsList).toHaveBeenCalled();
  });

  it('makes expected calls of getTransactions', () => {
    spyOn(service, 'getTransactions').and.callThrough();
    service.getTransactions();
    expect(service.getTransactions).toHaveBeenCalled();
  });

  it('makes expected calls of setTransaction', () => {
    const setTransactionSpy = spyOn(service, 'setTransaction').and.callThrough();
    const data = [];
    data.push(transactionObject);
    service.setTransaction(data);
    expect(setTransactionSpy).toHaveBeenCalled();
  });

  it('makes expected calls of createTransaction', () => {
    spyOn(service, 'createTransaction').and.callThrough();
    service.createTransaction(transactionObject);
    expect(service.createTransaction).toHaveBeenCalled();
  });
});
