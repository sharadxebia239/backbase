import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeTransferComponent } from './make-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;
  // TODO - Naming convention 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ MakeTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.makeTransferForm.valid).toBeFalsy();
  });

  it('toAccount field validation', () => {
    let errors = {};
    const toAccountName = 'toAccount';
    const toAccountControl = component.makeTransferForm.controls[toAccountName];
    // It should be mandetory
    expect(toAccountControl.valid).toBeFalsy();

    errors = toAccountControl.errors || {};
    const requiredName = 'required';
    expect(errors[requiredName]).toBeTruthy();
  });

  it('amount field validation', () => {
    let errors = {};
    const amount = 'amount';
    const amountConst = component.makeTransferForm.controls[amount];
    const required = 'required';
    const min = 'min';
    const pattern = 'pattern';
    const requiredPattern = 'requiredPattern';

    // 
    expect(amountConst.valid).toBeFalsy();

    
    errors = amountConst.errors || {};
    expect(errors[required]).toBeTruthy();

    // negative value validation
    amountConst.setValue('-1');
    errors = amountConst.errors || {};
    expect(errors[required]).toBeFalsy();
    expect(errors[min][min]).toBe(1);

    // pattern validation
    amountConst.setValue('sddsa');
    errors = amountConst.errors || {};
    expect(errors[required]).toBeFalsy();
    expect(errors[pattern][requiredPattern]).toBe('/^[0-9]+(\\.[0-9]{1,2})?$/');
  });

  it('submitting blank form', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';
    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccount].setValue('');
    component.makeTransferForm.controls[amount].setValue('');

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeTruthy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Amount is required.');
  });

  it('submitting form with negative amount', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';
    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccount].setValue('SBBI12345678');
    component.makeTransferForm.controls[amount].setValue('-1');

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Enter the valid amount.');
  });

  it('It should not allow amount below the total balance of -€500', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';

    expect(component.makeTransferForm.valid).toBeFalsy();
    component.totalBalance = '1000';
    component.makeTransferForm.controls[toAccount].setValue('SBBI12345678');
    component.makeTransferForm.controls[amount].setValue('1600');

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('It should not allow amount below the total balance of -€500');
  });

  it('submitting a form', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';

    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccount].setValue('SBI123456789');
    component.makeTransferForm.controls[amount].setValue('100');
    expect(component.makeTransferForm.valid).toBeTruthy();

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeFalsy();
    expect(component.amountErrorMessage).toBe('');
    expect(component.open.call).toBeTruthy();
  });

});
