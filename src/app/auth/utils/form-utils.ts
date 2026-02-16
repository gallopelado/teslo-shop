import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static getTextError(errors: ValidationErrors): string|null {
    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${ errors['minlength'].requiredLength } caracteres`;
        case 'min':
          return `Valor mínimo de ${ errors['min'].min } caracteres`;
        default:
          return `Error de validación no controlado ${key}`;
      }
    }
    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {

    if ( !form.controls[fieldName] ) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);

  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return ( !!form.controls[fieldName].errors && form.controls[fieldName].touched );
  }

  static isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    return ( formGroup: AbstractControl ) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordNotEqual: true };
    };
  }

}
