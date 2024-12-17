import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token: string;
  token_type: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})

export class AuthFormComponent {
  @Input() isLogin: boolean = false;

  authForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
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
    if (!this.authForm.controls['email'].value || !this.authForm.controls['password'].value) {
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
    
    const signUpData = {
      name: this.authForm.controls['name'].value,
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value
    };

    this.http.post<AuthResponse>(`${this.authService.getBackendUrl()}/signup`, signUpData).subscribe({
      next: (response) => {
        this.authService.setAuthToken(response.access_token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Sign up failed. Please try again.';
        console.error('Sign up error', error);
      }
    });
  }

  login() {
    const loginData = {
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value
    };

    this.http.post<AuthResponse>(`${this.authService.getBackendUrl()}/login`, loginData).subscribe({
      next: (response) => {
        this.authService.setAuthToken(response.access_token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error', error);
      }
    });
  }

}
