import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render title", () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should render login form', () => {
    const authFormDebugElement = fixture.debugElement.query(By.directive(AuthFormComponent));
    expect(authFormDebugElement).toBeTruthy();

    const authFormComponentInstance = authFormDebugElement.componentInstance as AuthFormComponent;
    expect(authFormComponentInstance.isLogin).toBeTrue();
  });
});
