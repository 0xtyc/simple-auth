import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting  } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent.trim()).toBe('Welcome to Simple Auth');
  });

  it('should check if user is logged in on init', () => {
    spyOn(component, 'hasAuthToken').and.returnValue(true);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should render login and signup buttons when not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('p')).nativeElement;
    const loginButton = fixture.debugElement.query(By.css('a[href="/login"]'));
    const signupButton = fixture.debugElement.query(By.css('a[href="/sign-up"]'));
    expect(description.textContent.trim()).toBe('Get started by signing up or logging in.');
    expect(loginButton).toBeTruthy();
    expect(signupButton).toBeTruthy();
  });

  it('should render list users button and logout button when logged in', () => {
    component.isLoggedIn = true; 
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('p')).nativeElement;
    const listUsersButton = fixture.debugElement.query(By.css('button:nth-child(1)')).nativeElement;
    const logoutButton = fixture.debugElement.query(By.css('button:nth-child(2)')).nativeElement;
    expect(description.textContent.trim()).toBe('Now you can see the users list.');
    expect(listUsersButton.textContent.trim()).toBe('List Users');
    expect(logoutButton.textContent.trim()).toBe('Logout'); 
  });


  it('should remove auth token on logout', () => {
    localStorage.setItem('authToken', 'testToken');
    component.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should list users', () => {
    const mockUsersResponse = {
      users: [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
      ]
    };

    spyOn(authService, 'getBackendUrl').and.returnValue('http://localhost');
    spyOn(authService, 'getAuthToken').and.returnValue('testToken');

    component.listUsers();

    const req = httpMock.expectOne('http://localhost/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer testToken');

    req.flush(mockUsersResponse);

    expect(component.users).toEqual(mockUsersResponse.users);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
