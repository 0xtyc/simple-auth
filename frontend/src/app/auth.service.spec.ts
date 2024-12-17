// frontend/src/app/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the backend URL', () => {
    expect(service.getBackendUrl()).toBe('http://127.0.0.1:8000');
  });

  it('should store and retrieve the auth token', () => {
    const token = 'test-token';
    service.setAuthToken(token);
    expect(service.getAuthToken()).toBe(token);
  });

  it('should remove the auth token', () => {
    const token = 'test-token';
    service.setAuthToken(token);
    service.removeAuthToken();
    expect(service.getAuthToken()).toBeNull();
  });
});