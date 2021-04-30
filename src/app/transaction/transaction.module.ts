import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { FilterComponent } from './filter/filter.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonComponent } from '../components/submit-button/submit-button.component';

const COMPONENTS = [
  TransactionItemComponent,
  TransactionsListComponent,
  FilterComponent,
  MakeTransferComponent,
  SubmitButtonComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TransactionModule { }
