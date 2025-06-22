import { Component, signal, ViewEncapsulation } from '@angular/core';
import { ClientLogoComponent } from '@sharedComponents/client-logo/client-logo.component';
import { FlightWatermarkComponent } from '@auth/_components/flight-watermark/flight-watermark.component';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';

@Component({
  selector: 'app-login-otp, login-otp',
  imports: [COMMON_IMPORTS, FlightWatermarkComponent, ClientLogoComponent],
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.html', '../styles/auth-form-styles.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper reset-password-page'
  }
})
export class LoginOtpComponent {
  public content = signal({
    smallTitle: 'OTP',
    title: 'Verification',
    text: 'OPT has been sent to you registered Email ID'
  });
}
