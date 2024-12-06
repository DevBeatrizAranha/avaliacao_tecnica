import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGreaterThanTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();
    const dateOfBirth = new Date(control.value);

    return dateOfBirth > today ? { 'dateGreaterThanToday': true } : null;
  };
}

export function emailValidator(): ValidatorFn {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !emailRegex.test(control.value)) {
        return { 'invalidEmail': { value: control.value } };
      }
      return null;
    };
  }