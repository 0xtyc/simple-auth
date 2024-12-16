import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})



export class AuthFormComponent {
  @Input() isLogin: boolean = false;

  authForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      name: ['', !this.isLogin ? Validators.required : []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', !this.isLogin ? Validators.required : []]
    });
  }

  passwordValidator(password: string) {
    return password.length >= 8 && /[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password);
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.authForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      if (this.authForm.controls['email'].hasError('email')) {
        this.errorMessage += ' Please enter a valid email address.';
      }
      
      return;
    }
    if (!this.isLogin) {
      this.signUp();
    } else {
      this.login();
    }
  }

  signUp() {
    if (!this.authForm.controls['name'].value || !this.authForm.controls['confirmPassword'].value) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (!this.passwordValidator(this.authForm.controls['password'].value)) {
      this.errorMessage = 'Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter.';
      return;
    }
    if (this.authForm.controls['password'].value !== this.authForm.controls['confirmPassword'].value) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    console.log('Sign up');
  }

  login() {
    console.log('Login');
  }

}
