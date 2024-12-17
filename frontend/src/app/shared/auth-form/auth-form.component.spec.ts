import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthFormComponent } from './auth-form.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../auth.service';  

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message if form is invalid on submit', () => {
    component.onSubmit();
    expect(component.errorMessage).toBe('Please fill in all fields.');
  });

  it('should show error message when email is not valid', () => {
    const emailControl = component.authForm.controls['email'];
    emailControl.markAsTouched();
    emailControl.setValue('invalid-email');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-message').textContent).toContain('Invalid email address.');
  });

  it("should ensure secure password when sign up", () => {
    component.isLogin = false;
    component.authForm.controls['name'].setValue('John Doe');
    component.authForm.controls['email'].setValue('john.doe@example.com');
    component.authForm.controls['password'].setValue('1234567');
    component.authForm.controls['confirmPassword'].setValue('1234567');
  
    component.onSubmit();
    expect(component.errorMessage).toBe('Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter.');
  });

  it("should ensure matched password when sign up", () => {
    component.isLogin = false;
    component.authForm.controls['name'].setValue('John Doe');
    component.authForm.controls['email'].setValue('john.doe@example.com');
    component.authForm.controls['password'].setValue('1234567aB');
    component.authForm.controls['confirmPassword'].setValue('12345678');
    component.onSubmit();
    expect(component.errorMessage).toBe('Passwords do not match.');
  });

  it('should send a POST request on signUp', () => {
    component.isLogin = false;
    component.authForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    });

    component.onSubmit();

    const req = httpTestingController.expectOne(`${authService.getBackendUrl()}/signup`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123'
    });

    req.flush({ access_token: 'fake-token', token_type: 'Bearer' });

    httpTestingController.verify();
  });
  
  it('should send a POST request on login', () => {
    component.isLogin = true;
    component.authForm.setValue({
      name: '',
      email: 'test@example.com',
      password: 'Password123',
      confirmPassword: ''
    });

    component.onSubmit();

    const req = httpTestingController.expectOne(`${authService.getBackendUrl()}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'Password123'
    });

    req.flush({ access_token: 'fake-token', token_type: 'Bearer' });

    httpTestingController.verify();
  });
    
});
