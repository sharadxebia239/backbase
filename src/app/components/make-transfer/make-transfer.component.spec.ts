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
    let toAccount = component.form.controls['toAccount'];
    expect(toAccount.valid).toBeFalsy();

    // toAccount field is required
    errors = toAccount.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('amount field validation', () => {
    let errors = {};
    let amount = component.form.controls['amount'];
    expect(amount.valid).toBeFalsy();

    // amount field is required
    errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();

    // negative value validation
    amount.setValue('-1');
    errors = amount.errors || {};
    console.log(errors['min']['min']);
    expect(errors['required']).toBeFalsy();
    expect(errors['min']['min']).toBe(1);

    // pattern validation 
    amount.setValue('sddsa');
    errors = amount.errors || {};
    console.log(errors['pattern']['requiredPattern']);
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']['requiredPattern']).toBe("/^[.\\d]+$/");
  });

  it('submitting blank form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['toAccount'].setValue("");
    component.form.controls['amount'].setValue("");

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeTruthy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Amount is required.');
  });

  it('submitting form with negative amount', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['toAccount'].setValue("SBBI12345678");
    component.form.controls['amount'].setValue("-1");

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('Enter the valid amount.');
  });

  it('It should not allow amount below the total balance of -€500', () => {
    expect(component.form.valid).toBeFalsy();
    component.totalBalance = '1000';
    component.form.controls['toAccount'].setValue("SBBI12345678");
    component.form.controls['amount'].setValue("700");

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeTruthy();
    expect(component.amountErrorMessage).toContain('It should not allow amount below the total balance of -€500');
  });

  it('submitting a form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['toAccount'].setValue("SBI123456789");
    component.form.controls['amount'].setValue("100");
    expect(component.form.valid).toBeTruthy();

    // Trigger the submit function
    component.submit();
    expect(component.toAccountError).toBeFalsy();
    expect(component.amountError).toBeFalsy();
    expect(component.amountErrorMessage).toBe('');
    expect(component.open.call).toBeTruthy();
  });

});
