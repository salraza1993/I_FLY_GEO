import { Component, signal, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';
import { ForgetPasswordFormComponent } from "./forget-password-form/forget-password-form.component";
import { FlightWatermarkComponent } from "../components/flight-watermark/flight-watermark.component";
import { ClientLogoComponent } from '../../shared/components/common/client-logo/client-logo.component';

@Component({
  selector: 'app-forget-password',
  imports: [COMMON_IMPORTS, ForgetPasswordFormComponent, FlightWatermarkComponent, ClientLogoComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper login-page'
  }
})
export default class ForgetPasswordComponent {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Forgot your',
    title: 'Password?',
    text: 'Enter your Registered Email ID to receive reset link.'
  });


}
