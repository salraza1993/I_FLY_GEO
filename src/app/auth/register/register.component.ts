import { Component, OnInit, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/helpers/common-imports';
import { RegisterFormComponent } from "./register-form/register-form.component";
import { FlightWatermarkComponent } from "../components/flight-watermark/flight-watermark.component";

@Component({
  selector: 'app-register',
  imports: [...COMMON_IMPORTS, RegisterFormComponent, FlightWatermarkComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../styles/auth-common-styles.css'],
  host: {
    'class': 'auth-page-wrapper register-page'
  }
})
export default class RegisterComponent implements OnInit {
  public clientLogoPath = '/assets/client/';
  public content = signal({
    smallTitle: 'Start Your',
    title: 'Journey',
    text: 'Create an account to unlock seamless travel management and exclusive offers.'
  });

  ngOnInit(): void {
    console.log('Register Page is initialized');
  }
}
