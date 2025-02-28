import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    'class': 'auth-page-wrapper'
  }
})
export class LoginComponent implements OnInit {
  public clientLogoPath = '/assets/client/';

  ngOnInit(): void {
    console.log('Login Page is initialized');
  }
}
