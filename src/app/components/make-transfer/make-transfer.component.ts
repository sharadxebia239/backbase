import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { formatCurrency } from '@angular/common';
import { Itransaction } from 'src/app/itransaction';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {
  // variable declaration
  // TODO - Need remoVe any and specify actual datatype
  // TODO - access modifier
  @ViewChild('content') content: NgbModal;
  public makeTransferForm: FormGroup;
  public isAccountInvalid: Boolean = false;
  public isAmountInvalid: Boolean = false;
  public amountErrorMessage: string = '';
  public totalBalance: number = 5824.76;
  public toAccount: string;
  public transactionAmount: number;
  public currency: string = environment.currency;
  private transactions: any = [];
  private transactionNewObject: Itransaction;

  constructor(private fb: FormBuilder, private confirmationService: NgbModal, private apiService: ApiService) {
    this.getTransactions(); // TODO - remove 
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {
    // initialize the form
    // TODO - currency formater
    this.makeTransferForm = this.fb.group({
      fromAccount: [`My Personal Account ${formatCurrency(this.totalBalance, 'en', this.currency)}`],
      toAccount: ['', Validators.required],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), // Numbers only with decimal two places
        customAmountCheck(this.totalBalance) // custom amount check validation
      ])]
    });
  }

  // TODO - remove it and call directly by a public variable
  getTransactions = () => {
    this.apiService.getTransactions().subscribe((response: any) => {
      if (response && response.data.length > 0) {
        this.transactions = response;
        console.log('response', response);
      }
    }, error => {
      console.error(error); // TODO - error always contain in console.error()
    });
  }

  // called when makeTransactionform submit
  /**
   * @returns void
   */
  submit = (): void => {
    // TODO - Use angular validator and error message - standard way to show error messages
    // validation for To Account
    if (this.makeTransferForm.controls.toAccount.status === 'INVALID') {
      this.isAccountInvalid = true;
    } else {
      this.isAccountInvalid = false;
    }

    // TODO - use 
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
      if (this.makeTransferForm.controls.amount.errors.customAmountCheck) {
        this.amountErrorMessage = 'It should not allow amount below the total balance of -€500.';
      }
    } else {
      this.isAmountInvalid = false;
      this.amountErrorMessage = '';
    }

    // when all value valid
    if (this.makeTransferForm.valid) {
      this.toAccount = this.makeTransferForm.controls.toAccount.value;
      this.transactionAmount = this.makeTransferForm.controls.amount.value;

      // TODO - Use angular modal
      // open confirmation pop-up
      this.open();
    }
  }

  // TODO - define content type
  // open pop function
  /**
   * @param  {} content
   */
  open = () => {
    this.confirmationService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: string) => {
      // When user click on "Send Transfer" button
      if (result === 'Save') {

        // TODO - define transaction class and pass the object
        // TODO - change object naming convention
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
        }
        
        // update transaction list
        this.transactions.data.push(this.transactionNewObject);
        this.apiService.setTransaction(this.transactions);

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

/**
 * @param  {number} totalBalance
 */
function customAmountCheck(totalBalance: number) {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const amount: number = control.value;
    if((totalBalance + 500) < amount) {
      return { 'customAmountCheck': true };
    } else {
      return null;
    }
  }
}