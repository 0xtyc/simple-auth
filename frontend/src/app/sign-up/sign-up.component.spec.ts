import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render title", () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent.trim()).toBe('Sign Up');
  });

  it('should render login form', () => {
    const authFormDebugElement = fixture.debugElement.query(By.directive(AuthFormComponent));
    expect(authFormDebugElement).toBeTruthy();

    const authFormComponentInstance = authFormDebugElement.componentInstance as AuthFormComponent;
    expect(authFormComponentInstance.isLogin).toBeFalse();
  });
});

