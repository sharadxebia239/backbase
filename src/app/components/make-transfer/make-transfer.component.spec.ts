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
      declarations: [MakeTransferComponent]
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

  it('should contain a form with 3 controls', () => {
    expect(component.makeTransferForm.contains('fromAccount')).toBe(true);
    expect(component.makeTransferForm.contains('toAccount')).toBe(true);
    expect(component.makeTransferForm.contains('amount')).toBe(true);
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
    const amountName = 'amount';
    const amountControl = component.makeTransferForm.controls[amountName];
    const requiredName = 'required';
    const minName = 'min';
    const patternName = 'pattern';
    const requiredPatternName = 'requiredPattern';

    // It should be mandetory
    expect(amountControl.valid).toBeFalsy();

    errors = amountControl.errors || {};
    expect(errors[requiredName]).toBeTruthy();

    // negative value validation
    amountControl.setValue('-1');
    errors = amountControl.errors || {};
    expect(errors[requiredName]).toBeFalsy();
    expect(errors[minName][minName]).toBe(0.01);

    // pattern validation
    amountControl.setValue('sddsa');
    errors = amountControl.errors || {};
    expect(errors[requiredName]).toBeFalsy();
    expect(errors[patternName][requiredPatternName]).toBe('/^[0-9]+(\\.[0-9]{1,2})?$/');
  });

  it('submitting blank form', () => {
    const toAccountName = 'toAccount';
    const amountName = 'amount';
    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccountName].setValue('');
    component.makeTransferForm.controls[amountName].setValue('');

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeTruthy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Amount is required.');
  });

  it('submitting form with negative amount', () => {
    const toAccountName = 'toAccount';
    const amountName = 'amount';
    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccountName].setValue('SBBI12345678');
    component.makeTransferForm.controls[amountName].setValue('-1');

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Enter the valid amount.');
  });

  it('It should not allow amount below the total balance of -€500', () => {
    const toAccountName = 'toAccount';
    const amountName = 'amount';

    expect(component.makeTransferForm.valid).toBeFalsy();
    component.totalBalance = 1000;
    component.makeTransferForm.controls[toAccountName].setValue('SBBI12345678');
    component.makeTransferForm.controls[amountName].setValue(1600);

    // Trigger the submit function
    component.submit();
    console.log(component.isAmountInvalid);
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeTruthy();
    expect(component.amountErrorMessage).toContain('It should not allow amount below the total balance of -€500');
  });

  it('submitting a form', () => {
    const toAccountName = 'toAccount';
    const amountName = 'amount';

    expect(component.makeTransferForm.valid).toBeFalsy();
    component.makeTransferForm.controls[toAccountName].setValue('SBI123456789');
    component.makeTransferForm.controls[amountName].setValue('100');
    expect(component.makeTransferForm.valid).toBeTruthy();

    // Trigger the submit function
    component.submit();
    expect(component.isAccountInvalid).toBeFalsy();
    expect(component.isAmountInvalid).toBeFalsy();
    expect(component.amountErrorMessage).toBe('');
    expect(component.open.call).toBeTruthy();
  });
});
