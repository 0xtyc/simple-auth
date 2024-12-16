import { Component } from '@angular/core';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';

@Component({
  selector: 'app-sign-up',
  imports: [AuthFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
