import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type CustomerFormGroup = FormGroup<{
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
}>;

type AddressFormGroup = FormGroup<{
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  country: FormControl<string | null>;
  zipCode: FormControl<string | null>;
}>;

type CreditCardFormGroup = FormGroup<{
  cardType: FormControl<string | null>;
  nameOnCard: FormControl<string | null>;
  cardNumber: FormControl<string | null>;
  securityCode: FormControl<string | null>;
  expirationMonth: FormControl<string | null>;
  expirationYear: FormControl<string | null>;
}>;

type CheckoutFormGroup = FormGroup<{
  customer: CustomerFormGroup;
  shippingAddress: AddressFormGroup;
  billingAddress: AddressFormGroup;
  creditCard: CreditCardFormGroup;
}>;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: CheckoutFormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log('The email address is ' + this.checkoutFormGroup.get('customer')?.value.email);
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if (!event || !event.target) return;

    if ((<HTMLInputElement>event.target).checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.getRawValue()
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
}
