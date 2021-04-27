import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {

  // variable declaration
  form: FormGroup;
  toAccountError: boolean = false;
  amountError: boolean = false;
  amountErrorMessage: string = '';
  totalBalance: any = '5824.76';
  closeResult = '';
  toAccountTitle: any = '';
  amountTitle: any = '';
  currency: string = environment.currency;
  transactions: any = [];

  constructor(private fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService) { 
    this.getTransactions();
  }

  ngOnInit(): void {
    // initialize the form
    this.form = this.fb.group({
      fromAccount: [`My Personal Account ${this.currency} ${this.totalBalance}`],
      toAccount: ['', Validators.required],
      amount: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(/^[.\d]+$/)])]
    });
  }

  getTransactions() {
    this.apiService.getTransactions().subscribe((response:any) => {
      if(response && response.data.length > 0) {
        this.transactions = response;
        console.log('response',response);
      }
    }, error => {
      console.log(error);
    })
  }

  // called when form submit
  submit() {
    // validation for To Account
    if(this.form.controls.toAccount.status == 'INVALID') {
      this.toAccountError = true;
    } else {
      this.toAccountError = false;
    }

    // validation for amount
    if(this.form.controls.amount.status == 'INVALID') {
      if(this.form.controls.amount.errors.min) {
        this.amountError = true;
        this.amountErrorMessage = 'Amount must be greater than 0.';
      }
      if(this.form.controls.amount.errors.required) {
        this.amountError = true;
        this.amountErrorMessage = 'Amount is required.';
      }
      if(this.form.controls.amount.errors.pattern) {
        this.amountError = true;
        this.amountErrorMessage = 'Enter the valid amount.';
      }
    } else if(this.totalBalance - this.form.controls.amount.value < 500 ) {
      this.amountError = true;
      this.amountErrorMessage = 'It should not allow amount below the total balance of -€500';
    } else {
      this.amountError = false;
      this.amountErrorMessage = '';
    }

    // when all value valid
    if (this.form.valid) {
      this.toAccountTitle = this.form.controls.toAccount.value;
      this.amountTitle = this.form.controls.amount.value;

      // open confirmation pop-up
      document.getElementById('content').click();
    }
  }

  // open pop function
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // When user click on "Send Transfer" button
      if(result == 'Save') {

        // create new transaction object
        var object = {
          "categoryCode" : "#12a580",
          "dates" : {
            "valueDate" : new Date()
          }, 
          "merchant" : {
            "accountNumber": this.toAccountTitle,
            "name": this.toAccountTitle
          },
          "transaction" : {
            "amountCurrency" : {
              "amount" : this.amountTitle,
              "currencyCode" : "EUR"
            },
            "creditDebitIndicator": "DBIT",
            "type": "Transfer"
          }
        }
        
        //update transaction list
        this.transactions.data.push(object);
        this.apiService.setTransaction(this.transactions);

        //deduct the transfer amount from total balance 
        this.totalBalance = this.totalBalance - this.amountTitle;

        // reset the form 
        this.form.setValue({
          fromAccount: `My Personal Account ${this.currency} ${this.totalBalance}`,
          toAccount: '', 
          amount: ''
        });
      } 
    }, (reason) => {
      console.log(reason);
    });
  }
}
