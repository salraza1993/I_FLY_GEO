import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { RegisterFormComponent } from "./register-form/register-form.component";
import { FlightWatermarkComponent } from "@auth/_components/flight-watermark/flight-watermark.component";
import { ClientLogoComponent } from '@sharedComponents/client-logo/client-logo.component';

@Component({
  selector: 'app-register, register-component, register',
  imports: [...COMMON_IMPORTS, RegisterFormComponent, FlightWatermarkComponent, ClientLogoComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper register-page'
  }
})
export class RegisterComponent implements OnInit {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Start Your',
    title: 'Journey',
    text: 'Create an account to unlock seamless travel management and exclusive offers.'
  });

  ngOnInit(): void {
    // console.log('Register Page is initialized');
  }
}
