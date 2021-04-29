import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListComponent } from './transactions-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransactionsListComponent]
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

  it('getCategoryColor should return value', () => {
    const randomColor = component.getCategoryColor('#ffffff');
    expect(typeof randomColor).toBe('object');
  });

  it('should filter the value', () => {
    component.search('');
    expect(component.getTransactions.call).toBeTruthy();

    component.search('1234');
    expect(component.searchCriteria).toBe('1234');
  });
});
