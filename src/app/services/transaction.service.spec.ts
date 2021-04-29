import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exist getTransactionsList', () => {
    expect(service.getTransactionsList).toBeDefined();
  });

  it('should exist getTransactions', () => {
    expect(service.getTransactions).toBeDefined();
  });

  it('should exist setTransaction', () => {
    expect(service.setTransaction).toBeDefined();
  });
});
