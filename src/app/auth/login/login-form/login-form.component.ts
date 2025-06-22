import { Component, inject, signal, WritableSignal } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { showPasswordToggler } from '@auth/helpers/HelperFunctions';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'login-form',
  imports: [...COMMON_IMPORTS, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../../styles/auth-form-styles.css']
})
export class LoginFormComponent {
  private router = inject(Router)
  public showPassword: WritableSignal<boolean> = signal(false);
  public showPasswordHandler(): void {
    showPasswordToggler(this.showPassword, this.showPassword());
  }
  public goToOtpValidation():void {
    this.router.navigate(['/login-otp-validation'])
  }
}

// reference to create custom reuseable input
// https://www.youtube.com/watch?v=nV7hnUAOS2Q&ab_channel=BabatundeLamidi
// Angular 18
// https://www.youtube.com/watch?v=FDIj5Vklnlc&list=PL7JmcZV0UQtUxsHS8dF3EINHdoIvRS6Ft&ab_channel=LEARNINGPARTNER