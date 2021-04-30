import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { FilterComponent } from './filter/filter.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';

const COMPONENTS = [
  TransactionItemComponent,
  TransactionsListComponent,
  FilterComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TransactionModule { }
