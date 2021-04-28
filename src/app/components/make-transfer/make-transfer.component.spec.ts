import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeTransferComponent } from './make-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

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
    expect(component.form.valid).toBeFalsy();
  });

  it('toAccount field validation', () => {
    let errors = {};
    const toAccount = 'toAccount';
    const toAccountConst = component.form.controls[toAccount];
    expect(toAccountConst.valid).toBeFalsy();

    // toAccount field is required
    errors = toAccountConst.errors || {};
    const required = 'required';
    expect(errors[required]).toBeTruthy();
  });

  it('amount field validation', () => {
    let errors = {};
    const amount = 'amount';
    const amountConst = component.form.controls[amount];
    const required = 'required';
    const min = 'min';
    const pattern = 'pattern';
    const requiredPattern = 'requiredPattern';

    expect(amountConst.valid).toBeFalsy();

    // amount field is required
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
    expect(component.form.valid).toBeFalsy();
    component.form.controls[toAccount].setValue('');
    component.form.controls[amount].setValue('');

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeTruthy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Amount is required.');
  });

  it('submitting form with negative amount', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';
    expect(component.form.valid).toBeFalsy();
    component.form.controls[toAccount].setValue('SBBI12345678');
    component.form.controls[amount].setValue('-1');

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Enter the valid amount.');
  });

  it('It should not allow amount below the total balance of -€500', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';

    expect(component.form.valid).toBeFalsy();
    component.totalBalance = '1000';
    component.form.controls[toAccount].setValue('SBBI12345678');
    component.form.controls[amount].setValue('1600');

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('It should not allow amount below the total balance of -€500');
  });

  it('submitting a form', () => {
    const toAccount = 'toAccount';
    const amount = 'amount';

    expect(component.form.valid).toBeFalsy();
    component.form.controls[toAccount].setValue('SBI123456789');
    component.form.controls[amount].setValue('100');
    expect(component.form.valid).toBeTruthy();

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeFalsy();
    expect(component.amountErrorMessage).toBe('');
    expect(component.open.call).toBeTruthy();
  });

});
