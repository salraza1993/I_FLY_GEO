import { Component, signal, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { ForgetPasswordFormComponent } from '../forget-password/forget-password-form/forget-password-form.component';
import { FlightWatermarkComponent } from '@auth/_components/flight-watermark/flight-watermark.component';
import { ClientLogoComponent } from '@sharedComponents/client-logo/client-logo.component';

@Component({
  selector: 'app-reset-password',
  imports: [COMMON_IMPORTS, ForgetPasswordFormComponent, FlightWatermarkComponent, ClientLogoComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper reset-password-page'
  }
})
export class ResetPasswordComponent {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Reset your',
    title: 'Password',
    text: 'Enter your Registered Email ID to receive OTP.'
  });
}
