import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListComponent } from './transactions-list.component';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRandomColor should return value', () => {
    expect(component.getRandomColor).toMatch('border-left');
    expect(component.getRandomColor.call).toBeTruthy();
  });

  it('should filter the value', () => {
    component.search('1234');
    expect(component.searchCriteria).toBe('1234');

    component.search('');
    expect(component.getTransactions.call).toBeTruthy();
  });
});
