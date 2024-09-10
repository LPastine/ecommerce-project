import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  // whitespace validation
  static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    // check if string only contains whitespace
    if (control.value != null && control.value.trim().length === 0) {
      // invalid, return error object
      return { notOnlyWhitespace: true };
    } else {
      return null;
    }
  }
}
