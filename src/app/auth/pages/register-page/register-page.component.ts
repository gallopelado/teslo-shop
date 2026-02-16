import { AuthService } from '@/auth/services/auth.service';
import { FormUtils } from '@/auth/utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  authService = inject(AuthService);

  fb = inject(FormBuilder);
  formUtils = FormUtils;
  router = inject(Router);
  hasError = signal(false);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      this.formUtils.isFieldOneEqualFieldTwo('password', 'repeatPassword'),
    ]
  });

  onSubmit() {

    if(this.registerForm.invalid) {
      this.hasError.set(true);
      console.log(this.registerForm.value);
      this.registerForm.markAllAsTouched();
      return;
    }

    this.hasError.set(true);

    const { fullName, email, password } = this.registerForm.value;
    // TODO: Guardado
    this.authService.createUser(fullName!, email!, password!).subscribe(hasCreated => {
      if(hasCreated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
    })

  }

}
