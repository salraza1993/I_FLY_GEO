import { Component, OnInit, signal } from '@angular/core';
import { LoginFormComponent } from "./login-form/login-form.component";
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';
import { FlightWatermarkComponent } from "../components/flight-watermark/flight-watermark.component";
import { ResponsiveClassDirective } from '../../core/directives/responsive-class.directive';

@Component({
  selector: 'login-component',
  imports: [...COMMON_IMPORTS, LoginFormComponent, FlightWatermarkComponent, ResponsiveClassDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../styles/auth-common-styles.css'],
  host: {
    'class': 'auth-page-wrapper login-page'
  }
})
export default class LoginComponent implements OnInit {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Access Your',
    title: 'Dashboard',
    text: 'Sign in to manage your trips, bookings, and travel preferences effortlessly.'
  });

  ngOnInit(): void {
    console.log('Login Page is initialized');
  }
}
