import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from 'src/app/services/transaction.service';
import { formatCurrency } from '@angular/common';
import { Itransaction } from 'src/app/itransaction';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {
  // variable declaration
  @ViewChild('content') content: NgbModal;
  public makeTransferForm: FormGroup;
  public isAccountInvalid = false;
  public isAmountInvalid = false;
  public amountErrorMessage = '';
  public totalBalance = 5824.76;
  public toAccount: string;
  public transactionAmount: number;
  public currency: string = environment.currency;
  public transactionNewObject: Itransaction;

  constructor(private fb: FormBuilder, private confirmationService: NgbModal, private transService: TransactionService) {
  }

  /**
   * @returns void
   */
  ngOnInit(): void {
    // initialize the form
    this.makeTransferForm = this.fb.group({
      fromAccount: [`My Personal Account ${formatCurrency(this.totalBalance, 'en', this.currency)}`],
      toAccount: ['', Validators.required],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/) // Numbers only with decimal two places
      ])]
    });
  }

  /**
   * @returns void
   * @description called when makeTransferForm submit
   */
  submit = (): void => {
    // validation for To Account
    if (this.makeTransferForm.controls.toAccount.status === 'INVALID') {
      this.isAccountInvalid = true;
    } else {
      this.isAccountInvalid = false;
    }

    // validation for amount
    if (this.makeTransferForm.controls.amount.status === 'INVALID') {
      this.isAmountInvalid = true;
      if (this.makeTransferForm.controls.amount.errors.min) {
        this.amountErrorMessage = 'Amount must be greater than 0.';
      }
      if (this.makeTransferForm.controls.amount.errors.required) {
        this.amountErrorMessage = 'Amount is required.';
      }
      if (this.makeTransferForm.controls.amount.errors.pattern) {
        this.amountErrorMessage = 'Enter the valid amount.';
      }
    } else if (this.totalBalance + 500 < this.makeTransferForm.controls.amount.value) {
      this.isAmountInvalid = true;
      this.amountErrorMessage = 'It should not allow amount below the total balance of -€500.';
    } else {
      this.isAmountInvalid = false;
      this.amountErrorMessage = '';
    }

    // when all value valid
    if (this.makeTransferForm.valid && !this.isAmountInvalid) {
      this.toAccount = this.makeTransferForm.controls.toAccount.value;
      this.transactionAmount = this.makeTransferForm.controls.amount.value;

      // open confirmation pop-up
      this.open();
    }
  }

  /**
   * @description open modal
   */
  open = () => {
    this.confirmationService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: string) => {
      // When user click on "Send Transfer" button
      if (result === 'Save') {

        // create new transaction object
        this.transactionNewObject = {
          categoryCode: '#e25a2c',
          dates: {
            valueDate: new Date()
          },
          merchant: {
            accountNumber: this.toAccount,
            name: this.toAccount
          },
          transaction: {
            amountCurrency: {
              amount: this.transactionAmount,
              currencyCode: 'EUR'
            },
            creditDebitIndicator: 'DBIT',
            type: 'Transfer'
          },
        };

        // update transaction list
        this.transService.createTransaction(this.transactionNewObject);

        // deduct the transfer amount from total balance
        this.totalBalance = this.totalBalance - this.transactionAmount;

        // reset the form
        this.makeTransferForm.patchValue({
          fromAccount: `My Personal Account ${formatCurrency(this.totalBalance, 'en', this.currency)}`,
          toAccount: '',
          amount: ''
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
