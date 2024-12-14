import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFormComponent } from './shared/auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend';
}
