import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exist "getTransactionsFromJSON"', function () {
    expect(service.getTransactionsFromJSON).toBeDefined();
  });

  it('should exist "getTransactions"', function () {
    expect(service.getTransactions).toBeDefined();
  });

  it('should exist "setTransaction"', function () {
    expect(service.setTransaction).toBeDefined();
  });
});
