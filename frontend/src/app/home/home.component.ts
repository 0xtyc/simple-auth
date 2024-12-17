import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface UsersResponse {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  isLoggedIn = false;
  users: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.isLoggedIn = this.hasAuthToken();
  }

  hasAuthToken() {
    return localStorage.getItem('authToken') !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
  }

  listUsers() {
    this.http.get<UsersResponse>(`${this.authService.getBackendUrl()}/users`, { headers: { Authorization: `Bearer ${this.authService.getAuthToken()}` } }).subscribe({
      next: (response) => {
        this.users = response.users;
      }
    });
  }
}
