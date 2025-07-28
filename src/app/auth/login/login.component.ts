import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { LoginFormComponent } from "./login-form/login-form.component";
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { FlightWatermarkComponent } from "@auth/_components/flight-watermark/flight-watermark.component";
import { ResponsiveClassDirective } from '@directives/responsive-class.directive';
import { TranslateService } from '@ngx-translate/core';
import { ClientLogoComponent } from '@sharedComponents/client-logo/client-logo.component';

interface LoginTranslations {
  smallTitle: string;
  title: string;
  text: string;
}
@Component({
  selector: 'login-component, app-login-component',
  imports: [...COMMON_IMPORTS, LoginFormComponent, FlightWatermarkComponent, ResponsiveClassDirective, ClientLogoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../styles/auth-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'auth-page-wrapper login-page'
  }
})
export class LoginComponent implements OnInit {
  private translate = inject(TranslateService);
  protected registerPageUrl = 'https://www.iflygeo.com/register';
  public clientLogoPath = '/assets/client/';
  constructor() {
    this.loadTranslatedData();
    this.translate.onLangChange.subscribe(() => this.loadTranslatedData());
  }
  public content = signal<LoginTranslations>({ smallTitle: '', title: '', text: ''});

  private loadTranslatedData(): void {
    this.translate.get([
      'LOGIN.SMALL_TITLE',
      'LOGIN.TITLE',
      'LOGIN.SHORT_INFO'
    ]).subscribe(translations => {
      this.content.set({
        smallTitle: translations['LOGIN.SMALL_TITLE'],
        title: translations['LOGIN.TITLE'],
        text: translations['LOGIN.SHORT_INFO']
      });
    });
  }

  ngOnInit(): void {
    // console.log('Login Page is initialized');
  }
}
