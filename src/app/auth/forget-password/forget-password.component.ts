import { Component, signal, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { ForgetPasswordFormComponent } from "./forget-password-form/forget-password-form.component";
import { FlightWatermarkComponent } from "@auth/_components/flight-watermark/flight-watermark.component";
import { ClientLogoComponent } from '@sharedComponents/client-logo/client-logo.component';

@Component({
  selector: 'app-forget-password, forget-password',
  imports: [COMMON_IMPORTS, ForgetPasswordFormComponent, FlightWatermarkComponent, ClientLogoComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper forget-password-page'
  }
})
export class ForgetPasswordComponent {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Forgot your',
    title: 'Password?',
    text: 'Enter your Registered Email ID to receive reset link.'
  });


}
