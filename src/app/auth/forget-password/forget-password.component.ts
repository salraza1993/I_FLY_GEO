import { Component, OnInit, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';
import { ForgetPasswordFormComponent } from "./forget-password-form/forget-password-form.component";
import { FlightWatermarkComponent } from "../components/flight-watermark/flight-watermark.component";

@Component({
  selector: 'app-forget-password',
  imports: [...COMMON_IMPORTS, ForgetPasswordFormComponent, FlightWatermarkComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../styles/auth-common-styles.css'],
  host: {
    'class': 'auth-page-wrapper login-page'
  }
})
export class ForgetPasswordComponent implements OnInit {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Forgot your',
    title: 'Password?',
    text: 'Enter your Registered Email ID to receive reset link.'
  });

  ngOnInit(): void {
    console.log('Login Page is initialized');
  }
}
