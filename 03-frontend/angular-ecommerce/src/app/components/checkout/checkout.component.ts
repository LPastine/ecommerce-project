import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

type CustomerFormGroup = FormGroup<{
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
}>;

type AddressFormGroup = FormGroup<{
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<State | null>;
  country: FormControl<Country | null>;
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

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }) as CustomerFormGroup,
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [null],
        state: [null],
        country: [''],
        zipCode: [''],
      }) as AddressFormGroup,
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [null],
        state: [null],
        country: [''],
        zipCode: [''],
      }) as AddressFormGroup,
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }) as CreditCardFormGroup,
    }) as CheckoutFormGroup;

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // populate credit card years
    this.formService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // populate countries
    this.formService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log('The email address is ', this.checkoutFormGroup.get('customer')?.value.email);
    console.log(
      'The shipping address country is ' + this.checkoutFormGroup.get('shippingAddress')?.value.country?.name
    );
    console.log('The shipping address state is ' + this.checkoutFormGroup.get('shippingAddress')?.value.state?.name);
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if (!event || !event.target) return;

    if ((<HTMLInputElement>event.target).checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.getRawValue()
      );

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const CreditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(CreditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const country: Country = formGroup?.value.country;

    const countryCode = country.code;
    const countryName = country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
